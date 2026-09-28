'use client'
import { useEffect, useState } from 'react'

/**
 * Hero scheduling card. Renders this office's REAL next open times, read live
 * from /api/consult/slots on this same origin, and deep links each one into
 * /c/consult.
 *
 * HARD, and the reason this component exists rather than a hardcoded button:
 *
 * - It NEVER renders an empty grid. A failed fetch, a slow fetch and a genuinely
 *   empty calendar are three different facts and none of them is "no times".
 *   All three fall back to the plain Schedule button, which always works, so the
 *   page degrades to comp B rather than to a dead end (H-39).
 *
 * - It FORWARDS THE QUERY STRING. The consult funnel reads gclid/utm off ITS OWN
 *   document, never the referrer. A link to a bare /c/consult books the patient
 *   and attributes to nothing, with no error anywhere — the same two-sided embed
 *   contract that cost the VMMG booking widget its attribution.
 *
 * - It adds NO tracking of its own. /c/consult carries no analytics or ad tag by
 *   design: the funnel collects a Norwood/Ludwig selection and a prior-procedure
 *   answer, which is health-intent input in a form (H-26 / §6 failure mode 7,
 *   non-waivable). A CTA that reaches it must not introduce one.
 */

type Slot = { iso: string; day: string; time: string }
type Office = 'metuchen' | 'moorestown'

const GREEN = '#507a60'
const GOLD = '#deb573'
const TEXT = '#2c2e2b'

const OTHER: Record<Office, { key: Office; label: string }> = {
  metuchen: { key: 'moorestown', label: 'Moorestown' },
  moorestown: { key: 'metuchen', label: 'Metuchen' },
}

function consultHref(office: Office, iso?: string) {
  const qs = typeof window === 'undefined' ? '' : window.location.search.replace(/^\?/, '')
  const p = new URLSearchParams(qs)
  p.set('office', office)
  if (iso) p.set('at', iso)
  return `/c/consult?${p.toString()}`
}

export default function HeroSlots({
  office,
  label,
  phoneHref,
  phoneDisplay,
}: {
  office: Office
  label: string
  phoneHref: string
  phoneDisplay: string
}) {
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let live = true
    fetch(`/api/consult/slots?office=${office}&format=in-person`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((d) => {
        if (!live) return
        const s: Slot[] = Array.isArray(d?.slots) ? d.slots : []
        setSlots(s)
      })
      .catch(() => {
        if (live) setFailed(true)
      })
    return () => {
      live = false
    }
  }, [office])

  const next = (slots || []).slice(0, 6)
  const showGrid = !failed && next.length > 0
  const firstDay = next[0]?.day?.split(',')[0] || ''

  const card: React.CSSProperties = {
    background: '#fff',
    borderRadius: 14,
    padding: '18px 18px 16px',
    boxShadow: '0 10px 30px rgba(28,34,28,.18)',
    maxWidth: 440,
  }

  const scheduleBtn = (
    <a
      href={consultHref(office)}
      style={{
        display: 'block',
        textAlign: 'center',
        background: GOLD,
        color: '#000',
        fontWeight: 700,
        fontSize: 16,
        textTransform: 'uppercase',
        borderRadius: 62,
        padding: '15px 22px',
        textDecoration: 'none',
      }}
    >
      Schedule My Consultation
    </a>
  )

  return (
    <div style={{ ...card, fontFamily: "'DM Sans', sans-serif", color: TEXT }}>
      {showGrid ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <strong style={{ fontSize: 15, fontWeight: 700 }}>Pick a time. Confirmed straight away.</strong>
            <span style={{ fontSize: 12, fontWeight: 700, color: GREEN, whiteSpace: 'nowrap' }}>{firstDay}</span>
          </div>
          <div className="shc-slot-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
            {next.map((s) => (
              <a
                key={s.iso}
                href={consultHref(office, s.iso)}
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '11px 2px',
                  borderRadius: 8,
                  border: `1px solid #cfe0d4`,
                  background: '#f6faf7',
                  color: '#2f5340',
                  textDecoration: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.time}
              </a>
            ))}
          </div>
          <a
            href={consultHref(office)}
            style={{ display: 'inline-block', marginTop: 12, fontSize: 13.5, fontWeight: 700, color: GREEN, textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            See all times at {label}
          </a>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#6b7268' }}>
            Only times the practice has actually published are shown.
            <br />
            <a href={consultHref(OTHER[office].key)} style={{ color: '#6b7268' }}>
              Booking at {OTHER[office].label} instead
            </a>
          </p>
        </>
      ) : (
        <>
          {scheduleBtn}
          <p style={{ margin: '10px 0 0', fontSize: 12.5, color: '#6b7268', textAlign: 'center' }}>
            Choose your office and time on the next screen.
          </p>
        </>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 13, paddingTop: 13, borderTop: '1px solid #e6efe8', fontSize: 13.5 }}>
        <a href={phoneHref} style={{ color: '#3b5c48', fontWeight: 700, textDecoration: 'none' }}>
          Call {phoneDisplay}
        </a>
        <span aria-hidden="true" style={{ width: 1, height: 13, background: '#d9e5db' }} />
        <a href="#form" style={{ color: '#3b5c48', fontWeight: 500 }}>
          Or have us call you
        </a>
      </div>
    </div>
  )
}
