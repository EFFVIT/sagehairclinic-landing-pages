'use client'
import { useState } from 'react'

const GOLD = '#b8975a'
const SAGE_MID = '#7a9e87'
const INK = '#1a1f1b'

interface Testimonial {
  quote: string
  name: string
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 20 }}>
        {[0, 1, 2, 3, 4].map(i => <span key={i} style={{ fontSize: 22, color: GOLD }}>&#9733;</span>)}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, lineHeight: 1.6, color: INK, marginBottom: 20, fontStyle: 'italic' }}>
        &ldquo;{current.quote}&rdquo;
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: '#4f7a5e', marginBottom: 28 }}>
        {current.name}
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            style={{
              width: 12, height: 12, borderRadius: '50%', border: `1.5px solid ${SAGE_MID}`,
              background: i === active ? SAGE_MID : 'transparent', padding: 0, cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  )
}
