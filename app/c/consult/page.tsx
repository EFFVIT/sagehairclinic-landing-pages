import type { Metadata } from 'next'
import ConsultFunnel from '@/components/consult/ConsultFunnel'
import Wordmark from '@/components/consult/Wordmark'
import GaTag from '@/components/consult/GaTag'
import { CONSULT } from '@/lib/consult.config'
import './consult.css'
import './theme.css'

/* ============================================================================
   CONSULT BOOKING PAGE — SHARED ENGINE

   IDENTICAL IN EVERY LP-FLEET REPO. Every practice fact comes from
   `lib/consult.config.ts`, which records where each one was verified.

   HARD, paid for on RHRLI 2026-08-14: template demo copy is fiction. Three
   invented service claims reached a live medical page in one session — an
   "instrument reading" the practice does not offer, a "nothing is quoted or
   sold" promise nobody made, and an implied promise about who conducts the
   consult. Anything describing what happens AT the consult must come from the
   practice in writing. Until it does, this page states only what a system of
   record holds: the duration, the formats, the location and the open hours,
   all read from that client's own GHL calendars and location record.

   Never write "nothing is quoted or sold" anywhere, ever (Joe, 2026-08-14).
   ========================================================================== */


/* Offices are optional fleet-wide. [] for the nine single-office repos, which
   is what keeps their rendering byte-identical to before. */
const OFFICES = Object.entries(
  ((CONSULT as unknown as { offices?: Record<string, {
    label: string; officeShort: string; address: string; city: string
    phoneDisplay: string; phoneRaw: string
  }> }).offices) || {}
).map(([key, o]) => ({ key, ...o }))
const MULTI = OFFICES.length > 0

/* The single-office fields are genuinely absent from a multi-office config, so
   they are typed optional and read through here. Every use below sits in a
   branch that only runs when MULTI is false; this keeps the compiler able to
   prove that rather than being told to look away. */
const SINGLE = CONSULT as unknown as {
  address?: string; city?: string; officeShort?: string; inPersonWhere?: string
}


export const metadata: Metadata = {
  title: `Book a consultation | ${CONSULT.practice}`,
  description: CONSULT.metaDescription,
  robots: { index: false, follow: false },
  openGraph: {},
  twitter: {},
}

export default function ConsultPage() {
  return (
    <div id="consult">
      <GaTag />
      <a className="skip" href="#consult-book">Skip to the booking form</a>

      <header className="masthead">
        <a className="mark" href={CONSULT.siteUrl} aria-label={CONSULT.practice}>
          <Wordmark className="wordmark" />
        </a>
        <div className={MULTI ? 'mast-meta mast-meta-multi' : 'mast-meta'}>
          {/* DniSwap is mounted in the root layout and rewrites this number and
              its tel: href when a gclid session is present. The number below is
              the app's DEFAULT_DIGITS: DniSwap only rewrites digits it owns, so
              putting the practice's static GHL line here instead would mean the
              swap never fires and every call arrives unattributed. */}
          {MULTI ? OFFICES.map((o) => (
            <a key={o.key} className="tel" href={`tel:${o.phoneRaw}`}>
              {o.officeShort} {o.phoneDisplay}
            </a>
          )) : (
            <a className="tel" href={`tel:${CONSULT.phoneRaw}`}>{CONSULT.phoneDisplay}</a>
          )}
        </div>
      </header>

      <main className="shell">
        <section className="pitch">
          <h1 className="statement" style={{ marginTop: 0 }}>
            {CONSULT.headline}
          </h1>
          <p className="saystill">{CONSULT.subhead}</p>

          {/* Practice photographs. No before/after and no identifiable patient:
              before/after imagery is a Meta Account Quality suspension risk
              across this whole fleet. The array is empty until the practice
              supplies its own images — a stock or borrowed photo of a clinic
              that is not theirs is a misrepresentation, and a sibling client's
              photo is worse. An empty array renders nothing at all. */}
          {CONSULT.photos.length > 0 && (
            <div className={`photos ${CONSULT.photos.length === 3 ? 'three' : ''}`}>
              {CONSULT.photos.map(([file, alt]) => (
                <figure className="photo" key={file}>
                  {/* Alt text is copy. A wrong address once survived here after
                      the visible copy was corrected, because nobody greps alt. */}
                  <img src={`/consult/${file}.webp`} alt={alt} width={900} height={675}
                       loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          )}

          <dl className="visit">
            <div>
              <dt><svg className="vicon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 18s6-5.2 6-9.4A6 6 0 0 0 4 8.6C4 12.8 10 18 10 18Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="10" cy="8.4" r="2.2" stroke="currentColor" strokeWidth="1.6"/></svg>Where</dt>
              {/* Every office, never one standing in for the practice. A
                   visitor choosing between two locations needs both on screen
                   before they reach the office step. */}
              <dd>{MULTI ? (
                OFFICES.map((o) => (
                  <span key={o.key} className="visit-office">
                    <b>{o.officeShort}</b> {o.address}<small>{o.city}</small>
                  </span>
                ))
              ) : (
                <>{SINGLE.address}<small>{SINGLE.city}</small></>
              )}</dd>
            </div>
            <div>
              <dt><svg className="vicon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.6"/><path d="M10 5.8V10l3 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>When</dt>
              <dd>{CONSULT.openDays}
                <small>{CONSULT.durationLabel}, in person or by video.</small>
              </dd>
            </div>
          </dl>

          <div className="callnote">
            <p>Would you rather talk to a person?</p>
            {(MULTI ? OFFICES : [{
              key: 'default', officeShort: '', phoneRaw: CONSULT.phoneRaw, phoneDisplay: CONSULT.phoneDisplay,
            }]).map((o) => (
              <a key={o.key} href={`tel:${o.phoneRaw}`}>
                <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M5.2 2.6 7 6l-1.7 1.6a10 10 0 0 0 5.1 5.1L12 11l3.4 1.8v3a1.6 1.6 0 0 1-1.8 1.6C7.3 16.9 1.1 10.7.6 4.4A1.6 1.6 0 0 1 2.2 2.6h3Z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                {o.officeShort ? `${o.officeShort} ${o.phoneDisplay}` : o.phoneDisplay}
              </a>
            ))}
          </div>
        </section>

        <section className="formwrap" id="consult-book">
          <ConsultFunnel />
        </section>
      </main>

      <footer className="consult-footer">
        <p className="cf-name">{CONSULT.practice}</p>
        <p className="cf-line">
          {MULTI ? OFFICES.map((o, i) => (
            <span key={o.key}>
              {i > 0 && <> &nbsp;·&nbsp; </>}
              {o.address}, {o.city} &nbsp;·&nbsp; <a href={`tel:${o.phoneRaw}`}>{o.phoneDisplay}</a>
            </span>
          )) : (
            <>{SINGLE.address}, {SINGLE.city} &nbsp;·&nbsp; <a href={`tel:${CONSULT.phoneRaw}`}>{CONSULT.phoneDisplay}</a></>
          )}
        </p>
        <p className="cf-disc">
          Individual results vary. This content is for educational purposes only and is not medical
          advice. Consult a qualified physician before pursuing any medical procedure.
        </p>
        <nav className="cf-links">
          <span>© {new Date().getFullYear()} {CONSULT.practice}</span>
          <a href={CONSULT.privacyUrl}>Privacy Policy</a>
          <a href={CONSULT.cookieUrl}>Cookie Policy</a>
          {/* Omitted, not rendered dead, when the practice has no reachable
              terms page. An off-host or broken policy link is a Google Ads
              destination problem, not just a cosmetic one. */}
          {CONSULT.termsUrl && <a href={CONSULT.termsUrl}>Terms of Service</a>}
        </nav>
      </footer>
    </div>
  )
}
