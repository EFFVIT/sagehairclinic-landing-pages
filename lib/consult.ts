/* ============================================================================
   CONSULT FUNNEL — server layer (SHARED ENGINE)

   Owns every call into GoHighLevel for the /c/consult booking page, plus the
   phone-verification codec.

   THIS FILE IS IDENTICAL IN EVERY LP-FLEET REPO. Everything client-specific
   lives in `lib/consult.config.ts` beside it. Do not fork this file per client:
   the fleet already learned that lesson on GhlForm.tsx, where per-client copies
   drifted and shipped two opposite outages.

   Why verification is stateless: these apps run on Coolify with no database and
   no Redis. An in-memory Map dies on every deploy and, worse, reads as working
   from inside the process while silently losing every code in flight. Instead
   the server signs {phone, codeHash, exp, nonce} with HMAC-SHA256 and hands the
   client an opaque token; the client returns it with the typed code. Nothing to
   store, nothing to drift, correct across container restarts and replicas.

   ---------------------------------------------------------------------------
   MULTI-OFFICE (added 2026-09-25 for Sage Hair Clinic, the fleet's first
   client with two GoHighLevel sub-accounts)

   Until now a client meant exactly one sub-account, so `locationId` was a bare
   string and a hardcoded calendar pair was correct. That is a cardinality
   assumption nothing could disagree with while N was 1, and the second office
   is the first test it ever got.

   A config MAY now declare `offices`. When it does, every call resolves the
   sub-account, the calendar pair and the token from the office the patient
   picked. When it does not, behaviour is byte-for-byte what it was — the nine
   single-office repos are unaffected by this file changing under them.

   FAILS CLOSED ON PURPOSE. A multi-office config with a missing or unknown
   office throws rather than falling back to the first one. Silently adopting
   an office would book a patient into the wrong practice, write them into the
   wrong CRM and text them the wrong address, and every screen would look
   correct. An error the caller must handle is the cheap outcome here.
   ========================================================================== */
import crypto from 'crypto'
import { CONSULT, CONSULT_FIELD_MAP } from './consult.config'

const GHL = 'https://services.leadconnectorhq.com'
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/* ------------------------------------------------------------- offices --- */
export type Office = {
  key: string
  label: string
  locationId: string
  timezone: string
  calendars: Record<string, string>
}

type OfficeConfig = {
  label: string
  locationId: string
  timezone?: string
  calendars: Record<string, string>
}

const OFFICE_CONFIG = (CONSULT as unknown as { offices?: Record<string, OfficeConfig> }).offices
export const MULTI_OFFICE = !!OFFICE_CONFIG && Object.keys(OFFICE_CONFIG).length > 0
export const OFFICE_KEYS: string[] = OFFICE_CONFIG ? Object.keys(OFFICE_CONFIG) : []

/* Single-office exports kept for the nine repos that import them directly.
   On a multi-office config they are deliberately absent rather than set to
   whichever office happens to be first: a question about the CLIENT answered
   with one INSTANCE's data is the defect this whole section exists to avoid. */
export const LOCATION_ID: string = MULTI_OFFICE ? '' : (CONSULT as unknown as { locationId: string }).locationId
export const TIMEZONE: string = CONSULT.timezone
export const CALENDARS: Record<string, string> = MULTI_OFFICE
  ? {}
  : (CONSULT as unknown as { calendars: Record<string, string> }).calendars

export function resolveOffice(office?: string | null): Office {
  if (!MULTI_OFFICE) {
    return {
      key: 'default',
      label: CONSULT.practice,
      locationId: (CONSULT as unknown as { locationId: string }).locationId,
      timezone: CONSULT.timezone,
      calendars: (CONSULT as unknown as { calendars: Record<string, string> }).calendars,
    }
  }
  const key = String(office || '')
  const cfg = OFFICE_CONFIG![key]
  if (!cfg) {
    /* Names what was actually received. A refusal that does not say what it
       detected is indistinguishable from a malfunction to whoever hits it. */
    const err = new Error(
      `office is required and must be one of ${OFFICE_KEYS.join(', ')} (received ${JSON.stringify(office)})`
    )
    ;(err as { status?: number }).status = 400
    throw err
  }
  return {
    key,
    label: cfg.label,
    locationId: cfg.locationId,
    timezone: cfg.timezone || CONSULT.timezone,
    calendars: cfg.calendars,
  }
}

export type ConsultFormat = string

/* A format is only valid against the office that will serve it. Validating
   against a fleet-wide list would pass a format the chosen office cannot book. */
export function isFormat(office: Office, format: string): boolean {
  return Object.prototype.hasOwnProperty.call(office.calendars, format)
}

function token(locationId: string): string {
  const t = process.env[`GHL_PIT_${locationId}`]
  if (!t) throw new Error(`GHL_PIT_${locationId} is not set on this container`)
  return t
}

/* Cloudflare in front of the GHL API returns error 1010 to clients whose TLS
   fingerprint it does not like, and a bare fetch from Node is one of them. The
   User-Agent is not cosmetic; without it every call 403s with a body that reads
   like an auth failure and is not one. */
async function ghl(locationId: string, path: string, init: RequestInit = {}, version = '2021-07-28') {
  const res = await fetch(GHL + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token(locationId)}`,
      Version: version,
      Accept: 'application/json',
      'User-Agent': UA,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })
  const text = await res.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }
  if (!res.ok) {
    const err = new Error(`GHL ${res.status} on ${path}`) as Error & { status?: number; body?: unknown }
    err.status = res.status
    err.body = body
    throw err
  }
  return body as Record<string, unknown> & Record<string, never>
}

/* ---------------------------------------------------------------- slots --- */
export type Slot = { iso: string; day: string; time: string }

export async function getSlots(format: ConsultFormat, office?: string | null, days = 14): Promise<Slot[]> {
  const o = resolveOffice(office)
  const calendarId = o.calendars[format]
  if (!calendarId) throw Object.assign(new Error(`unknown format ${format} for office ${o.key}`), { status: 400 })
  const now = Date.now()
  const end = now + days * 86_400_000
  const body = (await ghl(
    o.locationId,
    `/calendars/${calendarId}/free-slots?startDate=${now}&endDate=${end}&timezone=${encodeURIComponent(o.timezone)}`,
    {},
    '2021-04-15'
  )) as unknown as Record<string, { slots?: string[] }>

  /* The response is keyed by date, each with a slots array of ISO strings. Any
     non-date key (traceId and friends) is skipped rather than assumed absent. */
  const out: Slot[] = []
  for (const key of Object.keys(body || {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue
    for (const iso of body[key]?.slots || []) {
      const d = new Date(iso)
      out.push({
        iso,
        day: d.toLocaleDateString('en-US', {
          weekday: 'long', day: 'numeric', month: 'short', timeZone: o.timezone,
        }),
        time: d.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', timeZone: o.timezone,
        }),
      })
    }
  }
  return out.sort((a, b) => a.iso.localeCompare(b.iso))
}

/* ------------------------------------------------------------- contacts --- */
export type Lead = Record<string, string | boolean | undefined>

export async function upsertContact(lead: Lead, office?: string | null): Promise<string> {
  const o = resolveOffice(office)
  /* The office tag is the only way a sub-account's staff can tell a self-booked
     lead's origin apart once both offices feed the same reporting. */
  const tags = ['consult-lp', `format-${lead.format || 'unset'}`]
  if (MULTI_OFFICE) tags.push(`office-${o.key}`)
  const res = (await ghl(o.locationId, '/contacts/upsert', {
    method: 'POST',
    body: JSON.stringify({
      locationId: o.locationId,
      firstName: lead.first_name,
      lastName: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      postalCode: lead.zip,
      source: 'Consult LP',
      tags,
    }),
  })) as unknown as { contact?: { id?: string }; id?: string }
  const id = res?.contact?.id || res?.id
  if (!id) throw new Error('contact upsert returned no id')
  return id
}

export async function writeCustomFields(contactId: string, lead: Lead, office?: string | null) {
  const o = resolveOffice(office)
  /* A per-office map is read when the config supplies one, because custom
     field keys are a property of the SUB-ACCOUNT and do not travel between
     them. Copying one office's map onto the other would PUT unresolvable
     keys, which returns 200 and silently discards every value (H-41). */
  const byOffice = CONSULT_FIELD_MAP as unknown as Record<string, unknown>
  const nested = byOffice[o.key]
  const map: Record<string, string> =
    nested && typeof nested === 'object'
      ? (nested as Record<string, string>)
      : (CONSULT_FIELD_MAP as unknown as Record<string, string>)

  const wanted = Object.entries(map)
    .filter(([payloadKey]) => lead[payloadKey] !== undefined && lead[payloadKey] !== '')
    .map(([payloadKey, fieldKey]) => ({ fieldKey, value: String(lead[payloadKey]) }))

  /* RESOLVE fieldKey -> field ID BEFORE WRITING. Paid for on 2026-09-25 with a
     live booking that produced a contact, an appointment, and zero attribution.

     PUT /contacts/{id} with {key: "contact.gclidof", field_value} returns
     200 OK and DISCARDS THE VALUE. The same PUT with {id: "<fieldId>",
     field_value} persists it. Both were run against the same contact, the
     same token and the same field, one after the other — the only difference
     is the addressing. This is H-41 exactly, and the comment in every
     consult.config.ts already warned that "a PUT with an unresolvable
     fieldKey returns 200 and silently discards the value, which reads as
     working". The code was doing the thing the comment warned about.

     The map stays keyed on fieldKey, because fieldKey is the stable identifier
     across sub-accounts; field IDs are per sub-account and must never be
     hardcoded into a config. So we translate at request time. */
  const entries: Array<{ id: string; field_value: string }> = []
  const unresolved: string[] = []
  if (wanted.length) {
    let catalog: Array<{ id?: string; fieldKey?: string }> = []
    try {
      const res = (await ghl(o.locationId, `/locations/${o.locationId}/customFields`)) as unknown as {
        customFields?: Array<{ id?: string; fieldKey?: string }>
      }
      catalog = res?.customFields || []
    } catch (err) {
      /* A failed read is not an empty catalog (H-39). Say which happened. */
      const e = err as Error & { status?: number }
      return {
        written: 0,
        office: o.key,
        reason: `could not read this sub-account's custom fields (HTTP ${e?.status ?? '?'}); the PIT likely lacks locations/customFields.readonly, so nothing was written rather than written blind`,
      }
    }
    const byKey = new Map(catalog.filter((f) => f.fieldKey && f.id).map((f) => [f.fieldKey as string, f.id as string]))
    for (const w of wanted) {
      const id = byKey.get(w.fieldKey)
      if (id) entries.push({ id, field_value: w.value })
      else unresolved.push(w.fieldKey)
    }
  }

  if (!entries.length) {
    /* Says which, rather than reporting silence as success. An empty map is a
       real state on this fleet: most sub-account PITs still lack the
       customFields read scope, so the map could not be seeded from the live
       API and was deliberately left empty rather than guessed (H-41). */
    return {
      written: 0,
      office: o.key,
      reason: `CONSULT_FIELD_MAP for office "${o.key}" is empty; that sub-account's PIT lacks customFields read scope`,
    }
  }
  await ghl(o.locationId, `/contacts/${contactId}`, {
    method: 'PUT',
    body: JSON.stringify({ customFields: entries }),
  })
  /* Report the misses by name. A key present in the map but absent from the
     sub-account is a config drift worth seeing, not a silent partial write. */
  return unresolved.length
    ? { written: entries.length, office: o.key, unresolved }
    : { written: entries.length, office: o.key }
}

/* ---------------------------------------------------------- appointment --- */
export async function createAppointment(opts: {
  contactId: string
  format: ConsultFormat
  startIso: string
  office?: string | null
}) {
  const o = resolveOffice(opts.office)
  const calendarId = o.calendars[opts.format]
  if (!calendarId) throw Object.assign(new Error(`unknown format ${opts.format} for office ${o.key}`), { status: 400 })
  return ghl(o.locationId, '/calendars/events/appointments', {
    method: 'POST',
    body: JSON.stringify({
      calendarId,
      locationId: o.locationId,
      contactId: opts.contactId,
      startTime: opts.startIso,
      selectedTimezone: o.timezone,
      /* Confirmed, not pending: the slot came from free-slots and the phone is
         verified by the time this runs. */
      appointmentStatus: 'confirmed',
      ignoreFreeSlotValidation: false,
    }),
  })
}

/* ------------------------------------------------------------------ SMS --- */
export async function sendSms(contactId: string, message: string, office?: string | null) {
  const o = resolveOffice(office)
  return ghl(o.locationId, '/conversations/messages', {
    method: 'POST',
    body: JSON.stringify({ type: 'SMS', contactId, message }),
  })
}

/* --------------------------------------------------------- verification --- */
function secret(): string {
  const s = process.env.CONSULT_SIGNING_SECRET
  if (!s) throw new Error('CONSULT_SIGNING_SECRET is not set on this container')
  return s
}

const b64 = (b: Buffer) => b.toString('base64url')
const hmac = (data: string) => b64(crypto.createHmac('sha256', secret()).update(data).digest())

export function newCode(): string {
  /* Uniform over 0000-9999. Modulo on a byte would bias the low digits. */
  return String(crypto.randomInt(0, 10_000)).padStart(4, '0')
}

export function signChallenge(phone: string, code: string, ttlMs = 5 * 60_000): string {
  const payload = {
    p: phone.replace(/\D/g, ''),
    c: hmac(`code:${phone.replace(/\D/g, '')}:${code}`),
    e: Date.now() + ttlMs,
    n: b64(crypto.randomBytes(9)),
  }
  const body = b64(Buffer.from(JSON.stringify(payload)))
  return `${body}.${hmac(body)}`
}

export type CheckResult = { verified: boolean; message?: string }

export function checkChallenge(phone: string, code: string, challenge: string): CheckResult {
  const [body, sig] = String(challenge || '').split('.')
  if (!body || !sig) return { verified: false, message: 'That session expired. Send a new code.' }

  /* Timing-safe: a plain === leaks how much of the signature matched. */
  const expected = hmac(body)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { verified: false, message: 'That session expired. Send a new code.' }
  }

  let payload: { p: string; c: string; e: number }
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString())
  } catch {
    return { verified: false, message: 'That session expired. Send a new code.' }
  }

  if (Date.now() > payload.e) return { verified: false, message: 'That code expired. Send a new one.' }
  if (payload.p !== phone.replace(/\D/g, '')) {
    return { verified: false, message: 'That code was sent to a different number.' }
  }

  const want = Buffer.from(payload.c)
  const got = Buffer.from(hmac(`code:${payload.p}:${code}`))
  if (want.length !== got.length || !crypto.timingSafeEqual(want, got)) {
    return { verified: false, message: 'That code did not match. Check the text and try again.' }
  }
  return { verified: true }
}
