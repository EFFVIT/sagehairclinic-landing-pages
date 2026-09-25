'use client'

/* Reads the booking the funnel stashed just before navigating here. Renders
   nothing at all if there is no stash — someone landing on this URL directly
   should see the page, not an empty receipt with blank rows. */
import { useEffect, useState } from 'react'

type Booking = {
  name?: string; email?: string; format?: string; slot?: string; pattern?: string
  office?: string; office_label?: string
}

type OfficeAddr = { address: string; city: string; officeShort?: string }

/* `offices` is undefined on the nine single-office repos, where `address` and
   `city` are the whole answer. Where it is supplied, the office the patient
   actually chose wins — falling back to the props would print the other
   practice's address under the right practice's name, which is the failure
   this argument exists to prevent. */
export default function BookingSummary({
  address, city, offices,
}: { address?: string; city?: string; offices?: Record<string, OfficeAddr> }) {
  const [b, setB] = useState<Booking | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('consult_booking')
      if (raw) setB(JSON.parse(raw))
    } catch { /* private mode or cleared storage: fall through to the generic copy */ }
  }, [])

  if (!b) {
    return (
      <p className="thanks-sub">
        Your consultation is confirmed. A confirmation email is on its way, and a text reminder
        lands the day before.
      </p>
    )
  }

  const virtual = b.format === 'virtual'
  const chosen = offices && b.office ? offices[b.office] : null
  const whereAddress = chosen?.address ?? address
  const whereCity = chosen?.city ?? city
  /* Says nothing rather than saying the wrong thing: a multi-office booking
     whose office did not survive the stash has no address we can honestly
     print, and a blank row is better than a confident wrong one. */
  const canShowWhere = Boolean(whereAddress && whereCity) && (!offices || Boolean(chosen))
  return (
    <>
      <p className="thanks-sub">
        {b.name ? `Thanks, ${b.name}. ` : ''}A confirmation is on its way
        {b.email ? <> to <b>{b.email}</b></> : null}, and a text reminder lands the day before.
      </p>
      <dl className="receipt">
        {b.slot && <div><span>When</span><b>{b.slot}</b></div>}
        <div><span>Format</span><b>{virtual ? 'Virtual, by video' : 'In person'}</b></div>
        {b.office_label && <div><span>Office</span><b>{b.office_label}</b></div>}
        {!virtual && canShowWhere && (
          <div><span>Where</span><b>{whereAddress}, {whereCity}</b></div>
        )}
      </dl>
    </>
  )
}
