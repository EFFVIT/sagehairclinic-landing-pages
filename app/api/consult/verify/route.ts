import { NextRequest, NextResponse } from 'next/server'
import {
  newCode, signChallenge, checkChallenge, upsertContact, sendSms,
  resolveOffice, MULTI_OFFICE,
} from '@/lib/consult'

export const dynamic = 'force-dynamic'

/* Best-effort per-instance throttle. This is NOT a real rate limit: Coolify can
   run more than one container and the map dies on deploy, so it stops a stuck
   client, not an attacker. A real control needs a shared store. Named honestly
   rather than left to look like protection it does not provide. */
const lastSend = new Map<string, number>()
const SEND_GAP_MS = 25_000

function digits(v: unknown) {
  return String(v || '').replace(/\D/g, '')
}

export async function POST(req: NextRequest) {
  let payload: Record<string, string | undefined>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 })
  }

  const phone = digits(payload.phone)
  if (phone.length !== 10) {
    return NextResponse.json({ error: 'phone must be 10 digits' }, { status: 400 })
  }

  /* ------------------------------------------------------------ send --- */
  if (payload.action === 'send') {
    /* The office decides WHICH sub-account creates the contact and WHOSE number
       the text comes from. Resolve before anything is written, so a bad office
       is a 400 rather than a lead filed into the wrong practice's CRM. */
    let office
    try {
      office = resolveOffice(payload.office)
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 })
    }

    /* Keyed by office as well as number: the same person legitimately
       verifying at the other practice is not a retry. */
    const throttleKey = `${office.key}:${phone}`
    const prev = lastSend.get(throttleKey) || 0
    if (Date.now() - prev < SEND_GAP_MS) {
      return NextResponse.json(
        { error: 'too soon', retryAfterMs: SEND_GAP_MS - (Date.now() - prev) },
        { status: 429 }
      )
    }

    const code = newCode()
    const challenge = signChallenge(phone, code)
    const officeArg = MULTI_OFFICE ? office.key : null

    try {
      /* LC sends to a contact, so the contact has to exist before the text can
         go out. That is why the record is created here rather than at booking:
         the lead is captured even if verification is abandoned. It stays
         unverified until /book re-checks the challenge, and nothing downstream
         should treat an unverified contact as a booking. */
      const contactId = await upsertContact({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: `+1${phone}`,
        zip: payload.zip,
        format: payload.format,
      }, officeArg)
      await sendSms(
        contactId,
        `${code} is your ${payload.practice || 'consultation'} verification code. It expires in 5 minutes.`,
        officeArg
      )
      lastSend.set(throttleKey, Date.now())
      return NextResponse.json({ sent: true, challenge, contactId, office: office.key })
    } catch (err) {
      const e = err as Error & { status?: number; body?: unknown }
      console.error('[consult/verify send]', office.key, e?.status, e?.message, e?.body)
      return NextResponse.json(
        { error: 'could not send the code', detail: e?.status || null },
        { status: 502 }
      )
    }
  }

  /* ----------------------------------------------------------- check --- */
  if (payload.action === 'check') {
    const code = digits(payload.code)
    if (code.length !== 4) return NextResponse.json({ verified: false, message: 'Enter all four digits.' })
    const result = checkChallenge(phone, code, String(payload.challenge || ''))
    return NextResponse.json(result, { status: 200 })
  }

  return NextResponse.json({ error: 'action must be send or check' }, { status: 400 })
}
