/* ============================================================================
   CONSULT FUNNEL — CLIENT CONFIG: Sage Hair Clinic

   THIS IS THE ONLY FILE IN THE CONSULT SURFACE THAT DIFFERS PER CLIENT.
   lib/consult.ts, the three API routes, ConsultFunnel, Wordmark, GaTag,
   BookingSummary, both pages and consult.css are byte-identical across every
   repo on the fleet. If you are about to edit one of those for this client,
   the value belongs here instead.

   Every fact below was read from a live system on 2026-09-25, not typed from a
   document. Provenance is on each line. HARD, paid for on RHRLI: a GHL location
   record can be WRONG — its address said Jericho when the practice is in
   Woodbury — so where the practice's own schema.org markup disagrees with GHL,
   schema.org wins.

   NOTE FOR THIS CLIENT — FIRST TWO-OFFICE CONFIG ON THE FLEET.
   Sage runs Moorestown and Metuchen as two SEPARATE GoHighLevel sub-accounts,
   each with its own token, its own calendars, its own custom fields and its own
   phone number. Nothing crosses between them. The patient picks the office as
   step one of the funnel and that choice selects the sub-account for every
   subsequent call. See the MULTI-OFFICE block in lib/consult.ts for why an
   unknown office throws instead of defaulting to the first one.

   The two consult calendars in each sub-account already existed; nothing was
   created. What WAS changed on 2026-09-25, at Joe's direction: the internal
   "(Synced)" suffix was removed from all four titles, engineering copy shown to
   patients was replaced, Nicole Solis (departed) was removed from the Metuchen
   round-robin, and the four legacy "Consultation:" calendars were closed —
   they had been quietly offering Saturday slots at Moorestown and Sunday slots
   at Metuchen while both practices were shut.
   ========================================================================== */

export const CONSULT = {
  clientId: 'sage',
  practice: 'Sage Hair Clinic',

  /* Fleet-wide default. Both sub-accounts resolve to the same zone; the GHL
     records disagree on the SPELLING ('US/Eastern' on Moorestown,
     'America/New_York' on Metuchen), which is the same offset under a legacy
     alias. The IANA name is used for both rather than the alias, because
     Intl.DateTimeFormat is the consumer and the alias is not guaranteed. */
  timezone: 'America/New_York',

  /* ---------------------------------------------------------- offices ---
     Read live from each sub-account's /calendars/ on 2026-09-25 and confirmed
     returning free slots: Moorestown 159 over 11 business days, Metuchen 179.

     Each container MUST carry BOTH tokens — GHL_PIT_In7QtzS6f6h8Znf5DRAZ and
     GHL_PIT_8XaXhOsG3DTrVhyaRPbr — or bookings for that office 500 while the
     page still renders perfectly. */
  offices: {
    moorestown: {
      label: 'Moorestown',
      locationId: 'In7QtzS6f6h8Znf5DRAZ',
      timezone: 'America/New_York',
      calendars: {
        'in-person': 'GxzztSaXwwKpWzM7GRtp',
        virtual: 'y9Tux4qsNAsNMvtwXOuu',
      },
      /* GHL location record, read 2026-09-25. */
      address: '704 E Main Street, Suite A',
      city: 'Moorestown, NJ 08057',
      officeShort: 'Moorestown',
      inPersonWhere: 'At the Moorestown office, 704 E Main Street, Suite A.',
      phoneDisplay: '(856) 360-7159',
      phoneRaw: '+18563607159',
      /* Round-robin holds one team member: Jeffrey Stachowski. A single-member
         round robin has no redundancy — if his connected calendar drops, this
         office offers zero slots and the page correctly says so rather than
         inventing availability. */
      staffCount: 1,
    },
    metuchen: {
      label: 'Metuchen',
      locationId: '8XaXhOsG3DTrVhyaRPbr',
      timezone: 'America/New_York',
      calendars: {
        'in-person': 'hmrFhWiXnIp5Mc11PT2l',
        virtual: 'CINLyulLNx2ucsTOiN2d',
      },
      address: '171 Amboy Ave',
      city: 'Metuchen, NJ 08840',
      officeShort: 'Metuchen',
      inPersonWhere: 'At the Metuchen office, 171 Amboy Ave.',
      phoneDisplay: '(732) 205-1790',
      phoneRaw: '+17322051790',
      /* Also one, after Nicole Solis was removed on 2026-09-25 having left the
         practice. Available slots fell 199 to 179, which is her availability
         leaving rather than a fault. */
      staffCount: 1,
    },
  },

  /* Read from each calendar's own slotDuration on 2026-09-25 — never asserted.
     Saying "one hour" over a calendar that books 30 minutes is a promise the
     system of record does not keep. All four read 30 minutes. */
  durationMinutes: 30,
  durationLabel: '30 minutes',

  /* DNI pool default. DniSwap rewrites ONLY the digits it owns, so this must be
     the app's DEFAULT_DIGITS. Moorestown's line is the default because it is
     the office the GHL account record names first and the one the existing
     Sage landing pages lead with; once an office is chosen the funnel shows
     that office's own number instead. */
  phoneDisplay: '(856) 360-7159',
  phoneRaw: '+18563607159',
  phonePlaceholder: '(856) 555-0142',

  siteUrl: 'https://sagehairclinic.com',
  /* These two are routes in THIS app, not on the WordPress site: verified
     2026-09-25 that sagehairclinic.com/privacy-policy and /cookie-policy both
     return 404, while app/privacy-policy and app/cookie-policy exist here. */
  privacyUrl: '/privacy-policy',
  cookieUrl: '/cookie-policy',
  /* null means NO REACHABLE TERMS PAGE for this practice — /terms-of-service
     404s on the live site, checked 2026-09-25. The consent notice omits the
     Terms clause rather than linking to a 404, and the footer omits the link. */
  termsUrl: null as string | null,
  /* Verified HTTP 200 on 2026-09-25. */
  postsApi: 'https://sagehairclinic.com/wp-json/wp/v2/posts?per_page=3&_fields=id,link,date,title',

  /* Rendered verbatim on the page. Deliberately not a hardcoded day range:
     both offices publish Monday to Friday today, but the calendar is the system
     of record and a sentence that outlives a schedule change is a lie with a
     long half-life. */
  openDays: 'Times shown are each office’s published availability',
  hoursLine: 'Only times the practice has actually published are shown.',

  headline: 'Book your consultation.',
  subhead: '30 minutes with Sage Hair Clinic, in person in Moorestown or Metuchen, or by video. Choose your office and a time below, and it is confirmed on the practice calendar straight away.',
  metaDescription: 'Book a 30 minute consultation with Sage Hair Clinic in Moorestown or Metuchen, New Jersey, in person or by video.',

  /* EMPTY BY DESIGN, awaiting the practice's own photographs.
     No before/after and no identifiable patient — before/after imagery is a
     Meta Account Quality suspension risk across this whole fleet. A stock photo
     of a clinic that is not theirs is a misrepresentation, and a sibling
     client's photo is worse. An empty array renders no photo block at all.
     Add as: ['file-basename', 'alt text'] with the file at public/consult/. */
  photos: [] as [string, string][],

  /* No logo asset exists in this repo — checked public/ on 2026-09-25. The text
     wordmark is the fleet's specified treatment when no logo file exists, not a
     placeholder awaiting one. Rendering a sibling client's mark would be a
     misrepresentation of the practice. */
  wordmarkSrc: null as string | null,
  wordmarkText: 'Sage Hair Clinic' as string | null,

  /* NO browser analytics or advertising tag on this page. This is not a
     preference: the page collects a Norwood/Ludwig selection and prior-procedure
     answer, which is health-intent input in a form, and H-26 / §6 failure mode 7
     make a tag here non-waivable at the skill layer. Server-side delivery does
     not launder it (H-32). Set this ONLY on Joe's explicit, recorded direction
     for this specific client — RHRLI's is the only such override on the fleet. */
  ga4Id: null as string | null,

  consentVersion: '2026-09-25-v1',
} as const

/* Attribution write-through to the CRM, KEYED BY OFFICE.

   HARD (H-41): match on fieldKey, never on the display name. Names drift per
   sub-account while fieldKey stays byte-identical; matching on names is what
   made 11 of 28 custom values unreachable across the whole fleet.

   A custom field is a property of the SUB-ACCOUNT. The two Sage offices do not
   share one, so there are two maps and neither may be copied onto the other —
   a PUT with an unresolvable fieldKey returns 200 and silently discards the
   value, which reads as working.

   METUCHEN: seeded from the live API on 2026-09-25 after reading all 65 fields
   on that sub-account and matching by fieldKey.

   MOORESTOWN: seeded from the live API on 2026-09-25, from all 73 fields on that
   sub-account, matched by fieldKey. The sub-account's original PIT lacked
   locations/customFields.readonly and returned 401 — every one of the 64 env
   stores on this machine held that same dead token, so it was a genuine scope
   gap rather than drift. A replacement integration ("Consult LP - Moorestown")
   was created in the RootLogic UI on 2026-09-25 with exactly the seven scopes
   this funnel calls, and the map below was regenerated from THAT sub-account's
   own API rather than copied from Metuchen's.

   The two maps happen to be identical today. That is an observation about the
   current state of two sub-accounts, not a rule: keep them as two maps, and
   regenerate each from its own API when either changes. */
export const CONSULT_FIELD_MAP: Record<string, Record<string, string>> = {
  moorestown: {
    gclid: 'contact.gclidof',
    fbclid: 'contact.fbclidof',
    gbraid: 'contact.gbraid',
    wbraid: 'contact.wbraid',
    utm_source: 'contact.utm_source',
    utm_medium: 'contact.utm_medium',
    utm_campaign: 'contact.utm_campaign',
    utm_term: 'contact.utm_term',
    utm_content: 'contact.utm_content',

    /* NOT MAPPED: msclkid, keyword, matchtype, campaignid, adgroupid — no field
       with those keys exists on this sub-account. Captured on the page and
       dropped at the CRM boundary rather than written to a guessed key. */
  },

  metuchen: {
    gclid: 'contact.gclidof',
    fbclid: 'contact.fbclidof',
    gbraid: 'contact.gbraid',
    wbraid: 'contact.wbraid',
    utm_source: 'contact.utm_source',
    utm_medium: 'contact.utm_medium',
    utm_campaign: 'contact.utm_campaign',
    utm_term: 'contact.utm_term',
    utm_content: 'contact.utm_content',

    /* NOT MAPPED, because no field with these keys exists on this sub-account:
       msclkid, keyword, matchtype, campaignid, adgroupid. Captured on the page
       and dropped at the CRM boundary rather than written to a guessed key.

       ALSO NOT MAPPED, on purpose: contact.hair_loss_stage and contact.consent
       both EXIST here and both look like an obvious home for the funnel's
       pattern answer and SMS consent. Neither was mapped because what the
       practice already puts in them is unknown, and a field whose meaning is
       assumed is a field that will be overwritten with the wrong thing. Ask
       the practice, then map. */
  },
}
