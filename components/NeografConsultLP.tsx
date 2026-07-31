import { Suspense } from 'react'
import GhlForm from './GhlForm'
import GclidCapture from './GclidCapture'

// ── DESIGN TOKENS ── (see components/ArtasMetaLP.tsx for notes)
const FOREST  = '#4f7a5e'
const SAGE_MID = '#7a9e87'
const WHISPER = '#ebf1ec'
const GOLD    = '#b8975a'
const INK     = '#1a1f1b'
const WHITE   = '#ffffff'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke={GOLD} strokeWidth="1.6" />
      <path d="M6.5 10.2L9 12.7L13.5 7.5" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 2.5H14L18 6.5V21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21V3.5C6 2.94772 6.44772 2.5 7 2.5Z" stroke={FOREST} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 2.5V6.5H18" stroke={FOREST} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 14.5H14.5" stroke={FOREST} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 17.5H14.5" stroke={FOREST} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke={FOREST} strokeWidth="1.5" />
      <path d="M15.5 15.5L20 20" stroke={FOREST} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={FOREST} strokeWidth="1.5" />
      <path d="M3 9.5H21" stroke={FOREST} strokeWidth="1.5" />
      <path d="M7.5 2.5V6.5M16.5 2.5V6.5" stroke={FOREST} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4.5H20V16.5H9L4 20.5V4.5Z" stroke={FOREST} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

const CANDIDACY_CHECKLIST = [
  'Whether your hair loss pattern is consistent with androgenic alopecia',
  'The condition of your donor hair',
  'Follicular density and distribution',
  'Whether automated hair restoration technologies like NeoGraft® may be appropriate',
]

const TECH_HELPS = [
  'Analyze follicular patterns',
  'Identify suitable donor hair',
  'Support precision planning for hair restoration procedures',
]

const CONSULT_STEPS = [
  { icon: <DocumentIcon />, title: 'Hair Loss History', text: 'The physician reviews your medical history and hair loss progression.' },
  { icon: <SearchIcon />, title: 'Scalp & Follicle Examination', text: 'Hair density, follicle health, and scalp condition are examined.' },
  { icon: <CalendarIcon />, title: 'Pattern Analysis', text: 'Your hair loss pattern is evaluated for androgenic alopecia.' },
  { icon: <ChatIcon />, title: 'Technology Discussion', text: 'The physician explains potential treatment paths and whether NeoGraft® automated FUE technology may be suitable for your case.' },
]

const EVAL_DETERMINE = [
  'The cause of hair loss',
  'How advanced the pattern is',
  'What options may be appropriate',
]

interface Props {
  heroFormId?: string
  bottomFormId?: string
}

export default function NeografConsultLP({
  // TODO: replace with a real RootLogic form ID dedicated to the NeoGraft campaign
  heroFormId = 'TODO_NEOGRAFT_C_HERO_FORM_ID',
  bottomFormId = 'TODO_NEOGRAFT_C_FOOTER_FORM_ID',
}: Props) {
  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", color: INK }}>
      <Suspense fallback={null}><GclidCapture /></Suspense>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="shc-proc-hero-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', flexWrap: 'wrap' as const, gap: 16 }}>
        <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 24, color: INK, margin: 0 }}>Sage Hair Clinic</p>
        <a href="tel:+18482001644" style={{ background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 62, padding: '13px 22px', textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
          (848) 200-1644
        </a>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="shc-proc-hero" id="form" style={{ background: INK, padding: '48px 48px 80px' }}>
        <div className="shc-proc-hero-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 'clamp(30px, 3.4vw, 46px)', lineHeight: 1.2, color: WHITE, marginBottom: 16 }}>
              <em style={{ fontStyle: 'italic' }}>Considering NeoGraft® Automated FUE?</em><br />
              Start With a Physician Evaluation.
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
              Before choosing any hair restoration option, it&apos;s important to understand your hair loss pattern and follicle health. Our physician performs advanced hair loss evaluations for patients with androgenic alopecia, including assessment of whether NeoGraft® automated FUE technology may be appropriate for your hair loss pattern.
            </p>
          </div>
          <div style={{ background: WHITE, borderRadius: 16, padding: '24px 24px 12px' }}>
            <GhlForm formId={heroFormId} height={420} formName="NeoGraft Consult Hero Form" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#888', textAlign: 'center', marginTop: 8 }}>
              Your information is 100% private. No spam, ever. This consultation is for evaluation purposes only. Individual results vary. A physician will determine candidacy.
            </p>
          </div>
        </div>
      </section>

      {/* ── IF YOU'RE RESEARCHING NEOGRAFT, START HERE ───────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 34, color: INK, marginBottom: 24 }}>
              If You&apos;re Researching NeoGraft®, Start Here
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: INK, marginBottom: 12 }}>
              Many patients researching NeoGraft® automated hair restoration already know they want a modern, technology-assisted approach to hair restoration.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: INK, marginBottom: 20 }}>
              But not every hair loss pattern is the same.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: INK, marginBottom: 16 }}>
              A physician evaluation helps determine:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {CANDIDACY_CHECKLIST.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: INK, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#form" style={{ display: 'inline-block', background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '15px 32px', textDecoration: 'none' }}>
              Book Your Consultation
            </a>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img src="/consult-doctor-patient.jpg" alt="Physician consulting with a patient about hair restoration" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── NEOGRAFT TECHNOLOGY ──────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="/neograft-device.png" alt="NeoGraft Automated FUE System" style={{ maxWidth: '100%', maxHeight: 500 }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 34, color: WHITE, marginBottom: 20 }}>
              NeoGraft® Automated FUE Technology
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
              NeoGraft® is an FDA-cleared automated system used in modern hair restoration to assist physicians in harvesting and placing individual hair follicles.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: WHITE, marginBottom: 12 }}>The technology helps physicians:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {TECH_HELPS.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>
              During your consultation, the physician will evaluate your hair pattern and discuss whether NeoGraft® technology may be appropriate for your specific case.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${SAGE_MID}55`, borderRadius: 10, padding: '16px 20px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                <strong>Important:</strong> The consultation focuses on evaluation and treatment planning, not procedure booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS DURING YOUR CONSULTATION ───────────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 34, color: INK, textAlign: 'center', marginBottom: 48 }}>
            What Happens During Your Consultation
          </h2>
          <div className="shc-proc-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
            {CONSULT_STEPS.map((step) => (
              <div key={step.title} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16, color: INK, margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#4a5565', lineHeight: 1.5, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="#form" style={{ display: 'inline-block', background: FOREST, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '15px 32px', textDecoration: 'none' }}>
              Schedule Your Evaluation
            </a>
          </div>
        </div>
      </section>

      {/* ── PHYSICIAN-GUIDED HAIR LOSS EVALUATION ────────────────────────── */}
      <section className="shc-pad" style={{ background: WHITE, padding: '80px 48px' }}>
        <div className="shc-proc-split-grid" style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 34, color: INK, marginBottom: 12 }}>
              Physician-Guided Hair Loss Evaluation
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 17, color: INK, marginBottom: 20 }}>
              Hair restoration decisions should begin with a medical evaluation.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#4a5565', marginBottom: 16 }}>
              Our physician evaluates each patient individually to determine:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {EVAL_DETERMINE.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: INK }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#4a5565', lineHeight: 1.6 }}>
              This consultation helps patients understand their condition before making treatment decisions.
            </p>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img src="/consult-doctor-patient.jpg" alt="Physician reviewing a hair loss evaluation with a patient" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: INK, padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 34, color: WHITE, marginBottom: 16 }}>
            Find Out If NeoGraft® Is Right For Your Hair Loss Pattern
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>
            Start with a physician consultation to understand your hair loss and potential treatment options.
          </p>
          <a href="#form" style={{ display: 'inline-block', background: GOLD, color: INK, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, borderRadius: 62, padding: '17px 36px', textDecoration: 'none' }}>
            Book Your Hair Loss Consultation
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <section className="shc-pad" style={{ background: WHISPER, padding: '48px 48px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="shc-proc-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 20, color: INK, marginBottom: 8 }}>Sage Hair Clinic</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#4a5565' }}>Professional physician-guided hair loss evaluation and treatment planning.</p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: INK, marginBottom: 8 }}>Contact</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#4a5565', lineHeight: 1.6 }}>
                704 E Main St A, Moorestown, NJ 08057<br />
                <a href="tel:+18482001644" style={{ color: FOREST, textDecoration: 'none' }}>(848) 200-1644</a>
              </p>
              {/*
                Email intentionally omitted: per a prior audit of this client's
                live site, Sage does not have a confirmed working public email
                address. Add a real one once the client confirms it.
              */}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${SAGE_MID}44`, paddingTop: 20, textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4a5565' }}>&copy; 2026 Sage Hair Clinic. All rights reserved.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4a5565', marginTop: 8 }}>
              <a href="/privacy-policy" style={{ color: '#4a5565', textDecoration: 'none' }}>Privacy Policy</a>
              {' '}&bull;{' '}
              <a href="/cookie-policy" style={{ color: '#4a5565', textDecoration: 'none' }}>Cookie Policy</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
