import { Suspense } from 'react'
import GhlForm from './GhlForm'
import GclidCapture from './GclidCapture'
import TestimonialCarousel from './TestimonialCarousel'

// ── DESIGN TOKENS ──
// Sage Brand Guidelines v1 exact values (slightly more saturated than the
// GREEN/GOLD approximations used on the earlier /m/hair-transplant pages -
// this page uses the finalized brand hex values instead).
const FOREST  = '#4f7a5e'
const SAGE_MID = '#7a9e87'
const SAGE_LIGHT = '#a8c5b0'
const WHISPER = '#ebf1ec'
const GOLD    = '#b8975a'
const INK     = '#1a1f1b'
const WHITE   = '#ffffff'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke={FOREST} strokeWidth="1.6" />
      <path d="M8 12.2L10.8 15L16 9" stroke={FOREST} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2V14M2 8H14" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// Real, already-vetted patient reviews (see components/SageHairLP.tsx) - not
// procedure-specific, so both used here (rather than one per page) now that
// this is a real 2-slide carousel matching the design's 3-dot indicator intent.
const TESTIMONIALS = [
  { quote: 'Dr Patel and his staff were amazing! Very thorough and professional and cared about my concerns.', name: 'F.Q' },
  { quote: 'My experience at Dr. Patel’s office was spectacular. The office staff is very courteous & attentive. It was like a piece of cake. Thanks Doc.', name: 'J.V' },
]

const WHY_CHOOSE_ITEMS = [
  {
    n: '01',
    title: 'AI-Guided Precision',
    text: "The ARTAS® system uses advanced algorithms to map your scalp, identify optimal donor follicles, and execute with surgical precision that human hands cannot match.",
  },
  {
    n: '02',
    title: 'No Linear Scarring',
    text: 'Traditional strip methods leave a visible scar across the back of your head. ARTAS® extracts individual follicles, leaving no linear scar - just tiny dots that heal.',
  },
  {
    n: '03',
    title: 'Faster Recovery Time',
    text: 'Most patients return to work within 3-5 days. No stitches to remove. No major downtime.',
  },
]

const BENEFITS = [
  { title: 'Permanent, Natural Results', text: 'Transplanted hair grows naturally for life. No wigs, no maintenance treatments.' },
  { title: 'Minimally Invasive', text: 'No scalpel, no stitches, no linear scar. The robotic system works with pinpoint precision.' },
  { title: 'AI-Powered Precision', text: 'ARTAS® analyzes thousands of follicles per second to select only the healthiest for transplant.' },
  { title: 'Fast Recovery', text: 'Most patients return to work in 3-5 days. Resume normal activity almost immediately.' },
  { title: 'No Visible Scarring', text: 'Individual follicle extraction leaves only tiny dots that heal quickly and discreetly.' },
  { title: 'Customized Hairline Design', text: 'Every hairline is artistically designed by Dr. Patel to match your natural growth pattern.' },
]

const FAQ_ITEMS = [
  { q: 'Are hair transplant procedures painful?', a: 'During the hair transplant procedure, local anesthesia ensures your complete comfort -- you won\'t feel a thing. Afterwards, most patients experience only minimal discomfort. Over-the-counter pain relievers are usually sufficient if there\'s any discomfort at all.' },
  { q: 'How long is recovery?', a: 'Recovery time varies, but most patients resume light activities within a day or two and return to normal activities within a week. For best results, follow all post-procedure instructions, follow-up visits, and recommendations from Dr. Rajesh Patel.' },
  { q: 'Are the results permanent?', a: 'Yes -- because your own natural hair follicles are being transplanted, the results are generally permanent, assuming you follow the post-procedure instructions. Hair will begin to grow in the transplant area within 3-6 months, with full results visible by 12-18 months.' },
  { q: 'Am I a good candidate for ARTAS® Robotic FUE?', a: 'Most men and women experiencing hair thinning or hair loss are candidates for ARTAS®. The best way to find out is through a free consultation with Dr. Rajesh Patel at Sage Hair Clinic in Moorestown and Metuchen, NJ, who will assess your scalp, donor area, and goals to create a personalized plan.' },
  { q: 'How much does a hair transplant cost?', a: 'Most patients invest between $4,000 and $15,000+, depending on the extent of hair loss and the numbers of grafts required. During your free consultation, you\'ll receive a personalized quote with completely transparent pricing: no hidden fees, no surprises. We also offer flexible financing options with low monthly payments, so cost never has to stand between you and your confidence.' },
]

// Real before/after pairs - approved via Figma, verified pair-by-pair against
// the exact node IDs in the design file (not bulk-scraped) so before/after
// photos are never crossed between different patients.
const BEFORE_AFTER = [
  { name: 'keith', label: 'Patient - ARTAS® Robotic FUE' },
  { name: 'edy', label: 'Patient - ARTAS® Robotic FUE' },
  { name: 'ma', label: 'Patient - ARTAS® Robotic FUE' },
  { name: 'st', label: 'Patient - ARTAS® Robotic FUE' },
]

interface Props {
  heroFormId?: string
  bottomFormId?: string
}

export default function ArtasMetaLP({
  // TODO: replace with a real RootLogic form ID dedicated to the ARTAS campaign
  heroFormId = 'TODO_ARTAS_HERO_FORM_ID',
  bottomFormId = 'TODO_ARTAS_FOOTER_FORM_ID',
}: Props) {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", color: INK }}>
      <Suspense fallback={null}><GclidCapture /></Suspense>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="shc-proc-hero" id="form" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="/artas-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(26,31,27,0.72) 0%, rgba(26,31,27,0.45) 60%, rgba(26,31,27,0.25) 100%)',
        }} />

        <div className="shc-proc-hero-topbar" style={{
          position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '32px 48px 0', flexWrap: 'wrap' as const, gap: 16,
        }}>
          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 28, color: WHITE, margin: 0 }}>
            Sage Hair Clinic
          </p>
          <div className="shc-proc-hero-nav-btns" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' as const }}>
            <a href="#form" style={{ background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 62, padding: '13px 20px', textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
              Book a Free Consultation
            </a>
            <a href="tel:+18483087293" style={{ color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' as const, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
              Call Us +1 848-308-7293
            </a>
          </div>
        </div>

        <div className="shc-proc-hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 1500, margin: '0 auto', padding: 'clamp(28px, 4vh, 56px) 48px' }}>
          <div className="shc-proc-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center' }}>
            <div className="shc-proc-hero-left" style={{ marginTop: 120 }}>
              <h1 style={{
                fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 52px)', color: WHITE, lineHeight: 1.15, marginBottom: 20, maxWidth: 700,
              }}>
                Stop Losing Hair. Start Getting It Back.
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.9)', marginBottom: 0, lineHeight: 1.5, maxWidth: 520 }}>
                At Sage Hair Clinic, our specialists use the ARTAS® Robotic System - a minimally invasive, no-linear-scar hair transplant procedure - to deliver permanent results tailored to your unique hair pattern.
              </p>
            </div>

            <div className="shc-proc-hero-right">
              <div style={{
                background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 16, padding: '24px 24px 12px', boxShadow: '10px 10px 24px rgba(0,0,0,0.4)',
              }}>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 24, color: WHITE, marginBottom: 8, textAlign: 'center' }}>
                  See If You&apos;re a Candidate
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 16 }}>
                  Free consultation - no obligation, no pressure, no hard sell. Just honest answers from Dr. Rajesh Patel.
                </p>
                <GhlForm formId={heroFormId} height={480} formName="ARTAS Hero Form" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL PATIENTS. REAL RESULTS. ────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: 1.5, textAlign: 'center', marginBottom: 16 }}>
            Real Results
          </p>
          <h2 className="shc-h2-xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 40, color: INK, textAlign: 'center', marginBottom: 16 }}>
            Real Patients. Real Results.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: '#4a5565', textAlign: 'center', maxWidth: 700, margin: '0 auto 48px' }}>
            Every patient has a unique hair loss pattern. Our ARTAS® robotic technology creates a custom hairline that looks completely natural - because it is.
          </p>

          {/* Featured pair */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 900, margin: '0 auto 40px' }}>
            <figure style={{ margin: 0, position: 'relative' }}>
              <img src="/artas-ba-keith-before.jpg" alt="Patient before ARTAS Robotic FUE" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 6, display: 'block' }} />
              <span style={{ position: 'absolute', left: 12, top: 12, background: 'rgba(26,31,27,0.7)', color: WHITE, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 4 }}>Before</span>
            </figure>
            <figure style={{ margin: 0, position: 'relative' }}>
              <img src="/artas-ba-keith-after.jpg" alt="Patient after ARTAS Robotic FUE" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 6, display: 'block' }} />
              <span style={{ position: 'absolute', left: 12, top: 12, background: 'rgba(184,151,90,0.85)', color: INK, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 4 }}>After</span>
            </figure>
          </div>

          {/* Filmstrip */}
          <div className="shc-proc-ba-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {BEFORE_AFTER.slice(1).map((p) => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <figure style={{ margin: 0, position: 'relative' }}>
                  <img src={`/artas-ba-${p.name}-before.jpg`} alt="Patient before ARTAS Robotic FUE" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                  <span style={{ position: 'absolute', left: 8, top: 8, background: 'rgba(26,31,27,0.7)', color: WHITE, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' as const, padding: '2px 7px', borderRadius: 4 }}>Before</span>
                </figure>
                <figure style={{ margin: 0, position: 'relative' }}>
                  <img src={`/artas-ba-${p.name}-after.jpg`} alt="Patient after ARTAS Robotic FUE" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                  <span style={{ position: 'absolute', left: 8, top: 8, background: 'rgba(184,151,90,0.85)', color: INK, fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' as const, padding: '2px 7px', borderRadius: 4 }}>After</span>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 16 }}>
            Patient Stories
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 36, color: INK, marginBottom: 32 }}>
            What Our Patients Are Saying
          </h2>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ background: '#d7dfd8', borderRadius: 20, padding: 32, aspectRatio: '1 / 1', overflow: 'hidden' }}>
              <img src="/artas-device.png" alt="ARTAS Robotic FUE System" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: '#5a6259', letterSpacing: 1, textTransform: 'uppercase' as const, textAlign: 'center', marginTop: 16 }}>
              ARTAS® Robotic FUE System
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 16 }}>
              The Technology
            </p>
            <h2 className="shc-h2-xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 38, color: INK, marginBottom: 24, lineHeight: 1.2 }}>
              Your Solution to a Permanent Hair Transplant
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: INK, marginBottom: 24, borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              The ARTAS® Robotic FUE System represents the most advanced hair restoration technology available today. Using AI-powered precision, it identifies and harvests the healthiest hair follicles with unmatched accuracy - minimizing scarring and maximizing natural-looking results.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: INK, borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              Unlike traditional strip methods that leave linear scars, ARTAS® uses robotic assistance to extract individual follicles. This means faster recovery, no visible scarring, and a hairline that looks and feels completely natural. You&apos;ll be back to your routine in days, not weeks.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY PATIENTS CHOOSE US ───────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: SAGE_LIGHT, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 16 }}>
              Why Sage Hair Clinic
            </p>
            <h2 className="shc-h2-xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 38, color: WHITE, marginBottom: 32 }}>
              Why Patients Choose Us
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div key={item.n} style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: -20, top: -10, fontFamily: "'DM Serif Display', Georgia, serif",
                    fontStyle: 'italic', fontWeight: 400, fontSize: 64, color: '#67786d', lineHeight: 1, zIndex: 0,
                  }}>{item.n}</span>
                  <div style={{ position: 'relative', zIndex: 1, paddingTop: 8 }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 20, color: WHITE, margin: '0 0 8px' }}>{item.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0, maxWidth: 480 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/neograft-why-choose-portrait.png" alt="Confident Sage Hair Clinic patient" style={{ width: '100%', borderRadius: 16, display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── MEET DR. PATEL ───────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ background: '#272727', border: '1px solid #d9e3da', borderRadius: 16, padding: 32 }}>
            <img src="/dr-patel-headshot.png" alt="Dr. Rajesh Patel, D.O." style={{ width: '100%', borderRadius: 4, display: 'block' }} />
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 16 }}>
              Your Metuchen, NJ Hair Restoration Expert
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 38, color: INK, marginBottom: 24 }}>
              Meet Dr. Rajesh Patel, D.O.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: INK, marginBottom: 16 }}>
              Dr. Rajesh Patel, D.O. is a Board Certified Family Medicine physician and Director of Medical Aesthetics at Sage Hair Clinic in Moorestown and Metuchen, NJ. He trained directly under Dr. Miguel Canales, former Medical Director of Restoration Robotics and a pioneer of the ARTAS Robotic System, and holds certifications in hair restoration (Arizona Aesthetics), Alma TED (Alma), and injectable hair restoration technique (Empire Medical Training).
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: INK, marginBottom: 28 }}>
              At Sage Hair Clinic, every evaluation begins with a certified trichologist. Patients identified as strong candidates are then evaluated personally by Dr. Patel, who reviews each case and determines the right treatment plan before any procedure is recommended.
            </p>
            <a href="#form" style={{ display: 'inline-block', background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '15px 32px', textDecoration: 'none' }}>
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ── ARTAS ADVANTAGE ──────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD, textTransform: 'uppercase' as const, letterSpacing: 1.5, marginBottom: 16 }}>
              The ARTAS® Advantage
            </p>
            <h2 className="shc-h2-xl" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 38, color: WHITE, marginBottom: 32 }}>
              Why Choose ARTAS® Robotic FUE?
            </h2>
            <div className="shc-proc-benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 32px', marginBottom: 32 }}>
              {BENEFITS.map((b) => (
                <div key={b.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></div>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: WHITE, margin: '0 0 6px' }}>{b.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#form" style={{ display: 'block', textAlign: 'center', background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '17px 32px', textDecoration: 'none' }}>
              Book a Free Consultation
            </a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="/artas-device.png" alt="ARTAS Robotic FUE System" style={{ maxWidth: '100%', maxHeight: 500 }} />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: 40, color: WHITE, marginBottom: 20 }}>
            Reserve Your Spot Now
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>
            Rediscover what it feels like to look in the mirror with confidence.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: 32, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.75)' }}>
            <span>Free consultation</span><span>&bull;</span><span>No obligation</span><span>&bull;</span><span>No hard sell</span>
          </div>
          <a href="#form" style={{ display: 'inline-block', background: GOLD, color: INK, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '17px 36px', textDecoration: 'none' }}>
            Claim Your Spot Now
          </a>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {/* NOTE: Sage has not provided real FAQ answer content yet - questions are
          the real, approved Figma copy; answers are an explicit TODO, not
          fabricated medical/cost/recovery claims. */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 38, color: INK, textAlign: 'center', marginBottom: 40 }}>
            Common Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} style={{ background: WHITE, borderRadius: 12, padding: '18px 24px', border: `1px solid ${SAGE_MID}44` }}>
                <summary style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: INK, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                  {item.q}
                  <PlusIcon />
                </summary>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#888', fontStyle: 'italic', marginTop: 12 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER FORM + CONTACT ────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ background: WHISPER, borderRadius: 22, padding: '28px 28px 16px' }}>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: INK, textAlign: 'center', marginBottom: 16 }}>
              Book My Free Consultation Today
            </h3>
            <GhlForm formId={bottomFormId} height={520} formName="ARTAS Footer Form" />
          </div>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 32, color: INK, marginBottom: 20 }}>
              Find Out If ARTAS® Is Right For Your Hair Loss Pattern
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#4a5565', marginBottom: 24, lineHeight: 1.5 }}>
              Start with a physician consultation to understand your hair loss and potential treatment options.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: INK }}>171 Amboy Ave., Metuchen, NJ 08840</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '56px 48px 32px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div className="shc-proc-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 32, marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: WHITE, marginBottom: 12 }}>Sage Hair Clinic</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Advanced robotic hair restoration using the ARTAS® system. Permanent, natural results with minimal downtime.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: WHITE, marginBottom: 12 }}>Contact Us</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                171 Amboy Ave.<br />Metuchen, NJ 08840
              </p>
              {/*
                Email intentionally omitted: per a prior audit of this client's
                live site, Sage does not have a confirmed working public email
                address. Add a real one once the client confirms it rather than
                inventing one (see components/SageHairLP.tsx for the same note).
              */}
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: WHITE, marginBottom: 12 }}>Office Hours</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday: Closed
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 12 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>&copy; 2026 Sage Hair Clinic. All rights reserved.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              <a href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy Policy</a>
              {' '}&bull;{' '}
              <a href="/cookie-policy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Cookie Policy</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
