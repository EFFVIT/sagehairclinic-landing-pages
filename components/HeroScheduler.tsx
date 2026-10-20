'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Hero booking panel. Replaces the GoHighLevel request form that used to sit in
 * the hero: the visitor picks a format, a DAY and a time against this office's
 * real calendar, and carries all three into /c/consult.
 *
 * HARD, and why each one is here:
 *
 * - It NEVER renders an empty calendar. A failed fetch, a slow fetch and a
 *   genuinely empty day are three different facts and none of them is "no times
 *   available". A failure says so and offers the phone; loading says loading
 *   (H-39).
 *
 * - It FORWARDS THE QUERY STRING. The consult funnel reads gclid and utm off
 *   ITS OWN document, never the referrer, so a bare /c/consult link books the
 *   patient and attributes to nothing with no error anywhere.
 *
 * - The seeded slot is a REQUEST, not a booking. ConsultFunnel re-checks the
 *   exact slot against the live calendar before selecting it, so a time that
 *   goes while this page sits open is simply not selected.
 *
 * - The phone number rendered here is the STATIC line on purpose. DniSwap
 *   rewrites the digits it owns wherever they appear in the document, so the
 *   tracking number substitutes into this panel along with the rest of the
 *   page. Hardcoding a pool number here would break that.
 *
 * - NO analytics or advertising tag, here or on the funnel. The consult flow
 *   collects a Norwood/Ludwig selection and a prior-procedure answer, which is
 *   health-intent input in a form (H-26 / §6 failure mode 7, non-waivable).
 */

type Slot = { iso: string; day: string; time: string }
type Office = 'metuchen' | 'moorestown'
type Format = 'in-person' | 'virtual'

const GREEN = '#507a60'
const GOLD = '#deb573'
const TEXT = '#2c2e2b'
const LINE = '#dce8e5'

const OTHER: Record<Office, { key: Office; label: string }> = {
  metuchen: { key: 'moorestown', label: 'Moorestown' },
  moorestown: { key: 'metuchen', label: 'Metuchen' },
}

function consultHref(office: Office, format: Format, iso?: string) {
  const qs = typeof window === 'undefined' ? '' : window.location.search.replace(/^\?/, '')
  const p = new URLSearchParams(qs)
  p.set('office', office)
  p.set('format', format)
  if (iso) p.set('at', iso)
  return `/c/consult?${p.toString()}`
}

/** "2026-09-29" -> {dow:"Tue", dom:"30 Sep"} in the practice's own zone. */
function dayParts(iso: string) {
  const d = new Date(iso)
  return {
    dow: d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'America/New_York' }),
    dom: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' }),
  }
}

export default function HeroScheduler({
  office,
  label,
  phoneHref,
  phoneDisplay,
  formAnchor = '#form',
}: {
  office: Office
  label: string
  phoneHref: string
  phoneDisplay: string
  formAnchor?: string
}) {
  /* Tell the root-layout FAB to stand down while this panel is on screen. It
     mounts onto document.body from the layout, so it knows nothing about what
     is rendered beneath it; at 390px its greeting panel measures 298x108 over
     the time grid and covers five time buttons. Same call the codebase already
     made for /c/consult, which a route list cannot express here because this
     panel is revealed by a click rather than by a navigation. */
  useEffect(() => {
    const fire = (open: boolean) => {
      window.dispatchEvent(new CustomEvent('shc:scheduler', { detail: { open } }))
    }
    fire(true)
    return () => { fire(false) }
  }, [])

  const [format, setFormat] = useState<Format>('in-person')
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [dayKey, setDayKey] = useState<string>('')
  const [picked, setPicked] = useState<Slot | null>(null)
  const strip = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let live = true
    setSlots(null); setFailed(false); setPicked(null)
    fetch(`/api/consult/slots?office=${office}&format=${format}`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
      .then((d) => { if (live) setSlots(Array.isArray(d?.slots) ? d.slots : []) })
      .catch(() => { if (live) setFailed(true) })
    return () => { live = false }
  }, [office, format])

  /* Days, in calendar order, each with its own times. */
  const days = useMemo(() => {
    const m = new Map<string, Slot[]>()
    for (const s of slots || []) {
      const k = s.iso.slice(0, 10)
      if (!m.has(k)) m.set(k, [])
      m.get(k)!.push(s)
    }
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [slots])

  useEffect(() => {
    if (days.length && !days.some(([k]) => k === dayKey)) setDayKey(days[0][0])
  }, [days, dayKey])

  const times = days.find(([k]) => k === dayKey)?.[1] || []

  const scrollStrip = (dir: -1 | 1) =>
    strip.current?.scrollBy({ left: dir * 180, behavior: 'smooth' })

  const panel: React.CSSProperties = {
    background: '#fff', borderRadius: 16, padding: '22px 22px 20px',
    boxShadow: '0 18px 48px rgba(24,30,24,.22)', fontFamily: "'DM Sans', sans-serif", color: TEXT,
  }
  const tab = (on: boolean): React.CSSProperties => ({
    flex: 1, padding: '9px 6px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
    borderRadius: 8, border: `1px solid ${on ? GREEN : LINE}`,
    background: on ? '#eaf3ec' : '#fff', color: on ? '#2f5340' : '#5c6459',
  })

  return (
    <div style={panel}>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 25, margin: '0 0 4px', lineHeight: 1.15 }}>
        Book your consultation
      </h2>
      <p style={{ margin: '0 0 14px', fontSize: 13.5, color: '#5c6459' }}>
        30 minutes at {label}. Pick any day and time below.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button type="button" style={tab(format === 'in-person')} aria-pressed={format === 'in-person'} onClick={() => setFormat('in-person')}>In person</button>
        <button type="button" style={tab(format === 'virtual')} aria-pressed={format === 'virtual'} onClick={() => setFormat('virtual')}>By video</button>
      </div>

      {failed ? (
        <p style={{ margin: '4px 0 14px', fontSize: 14, color: '#8a4b20', background: '#fdf3ec', border: '1px solid #f0d9c6', borderRadius: 8, padding: '10px 12px' }}>
          We could not load times just now. Call {phoneDisplay} and we will book it for you.
        </p>
      ) : slots === null ? (
        <p style={{ margin: '4px 0 14px', fontSize: 14, color: '#5c6459' }}>Loading this week&rsquo;s availability&hellip;</p>
      ) : days.length === 0 ? (
        <p style={{ margin: '4px 0 14px', fontSize: 14, color: '#5c6459' }}>
          No published times at {label} right now. Call {phoneDisplay} and we will find one.
        </p>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, minWidth: 0 }}>
            <button type="button" aria-label="Earlier days" onClick={() => scrollStrip(-1)}
              style={{ flex: 'none', width: 28, height: 34, borderRadius: 7, border: `1px solid ${LINE}`, background: '#fff', color: GREEN, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>‹</button>
            <div ref={strip} className="shc-day-strip" style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', flex: '1 1 0', minWidth: 0 }}>
              {days.map(([k, list]) => {
                const { dow, dom } = dayParts(list[0].iso)
                const on = k === dayKey
                return (
                  <button key={k} type="button" aria-pressed={on} onClick={() => { setDayKey(k); setPicked(null) }}
                    style={{
                      flex: 'none', minWidth: 58, padding: '7px 7px', borderRadius: 8, cursor: 'pointer',
                      border: `1px solid ${on ? GREEN : LINE}`, background: on ? GREEN : '#fff',
                      color: on ? '#fff' : TEXT, lineHeight: 1.15,
                    }}>
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 600, opacity: .85 }}>{dow}</span>
                    <span style={{ display: 'block', fontSize: 13.5, fontWeight: 700 }}>{dom}</span>
                  </button>
                )
              })}
            </div>
            <button type="button" aria-label="Later days" onClick={() => scrollStrip(1)}
              style={{ flex: 'none', width: 28, height: 34, borderRadius: 7, border: `1px solid ${LINE}`, background: '#fff', color: GREEN, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>›</button>
          </div>

          <div className="shc-time-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(74px, 1fr))', gap: 6, maxHeight: 150, overflowY: 'auto' }}>
            {times.map((s) => {
              const on = picked?.iso === s.iso
              return (
                <button key={s.iso} type="button" aria-pressed={on} onClick={() => setPicked(s)}
                  style={{
                    padding: '10px 2px', borderRadius: 7, cursor: 'pointer', fontSize: 13.5, fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    border: `1px solid ${on ? GREEN : '#cfe0d4'}`, background: on ? GREEN : '#f6faf7',
                    color: on ? '#fff' : '#2f5340',
                  }}>
                  {s.time}
                </button>
              )
            })}
          </div>

          <a href={consultHref(office, format, picked?.iso)}
            style={{
              display: 'block', textAlign: 'center', marginTop: 14, background: GOLD, color: '#000',
              fontWeight: 700, fontSize: 16, textTransform: 'uppercase', borderRadius: 62,
              padding: '15px 22px', textDecoration: 'none',
            }}>
            {picked ? `Continue — ${picked.time}` : 'Continue'}
          </a>
          <p style={{ margin: '9px 0 0', fontSize: 11.5, color: '#6b7268', textAlign: 'center' }}>
            {picked
              ? `${picked.day} at ${picked.time}. We confirm it on the next screen.`
              : 'Pick a time, or continue and choose one at the end.'}
          </p>
        </>
      )}

      <div style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid #e6efe8`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
        <a href={phoneHref} style={{ color: '#3b5c48', fontWeight: 700, textDecoration: 'none' }}>Call {phoneDisplay}</a>
        <span aria-hidden="true" style={{ width: 1, height: 13, background: LINE }} />
        <a href={formAnchor} style={{ color: '#3b5c48', fontWeight: 500 }}>Or have us call you</a>
      </div>
      <p style={{ margin: '8px 0 0', fontSize: 11.5, color: '#6b7268' }}>
        Only times the practice has actually published are shown.{' '}
        <a href={consultHref(OTHER[office].key, format)} style={{ color: '#6b7268' }}>Booking at {OTHER[office].label} instead</a>
      </p>
    </div>
  )
}
