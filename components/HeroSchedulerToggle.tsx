'use client'
import { useState } from 'react'
import HeroScheduler from './HeroScheduler'

/* The "Prefer to schedule now?" affordance plus the scheduler it reveals.
 *
 * Exists so a SERVER component can offer booking in its hero without becoming a
 * client component itself. SageHairLP is already 'use client' and carries this
 * same pattern inline; the Meta LPs (NeografMetaLP / ArtasMetaLP) are server
 * components, and converting 450 lines of each to client just to hold one
 * boolean is the wrong trade. This is the client boundary, and it is the only
 * thing that crosses it.
 *
 * The form stays the primary ask. Booking is one click behind it, never the
 * first thing a cold paid visitor is asked to commit to — the hero-calendar
 * layout it replaces took 166 paid clicks in October and returned no counted
 * leads. The calendar is not removed, it is demoted.
 *
 * `office` is explicit per page rather than inferred: NeoGraft is the Moorestown
 * page (856 pool) and ARTAS is the Metuchen page (732 pool), and
 * resolveOffice throws on an unknown office rather than defaulting to the first
 * one, so a wrong value fails loudly instead of showing one practice's
 * availability under the other's name.
 */
export default function HeroSchedulerToggle({
  office,
  label,
  phoneHref,
  phoneDisplay,
  linkColor = '#ffffff',
}: {
  office: 'moorestown' | 'metuchen'
  label: string
  phoneHref: string
  phoneDisplay: string
  linkColor?: string
}) {
  const [showScheduler, setShowScheduler] = useState(false)

  if (!showScheduler) {
    return (
      <button
        type="button"
        onClick={() => setShowScheduler(true)}
        style={{
          display: 'block', width: '100%', marginTop: 14, marginBottom: 12,
          background: 'transparent', border: 'none', color: linkColor,
          fontSize: 15, fontWeight: 600, textDecoration: 'underline',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        Prefer to schedule now?
      </button>
    )
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 12 }}>
      <HeroScheduler
        office={office}
        label={label}
        phoneHref={phoneHref}
        phoneDisplay={phoneDisplay}
      />
    </div>
  )
}
