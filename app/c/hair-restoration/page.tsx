import type { Metadata } from 'next'
import Script from 'next/script'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  openGraph: { images: [{ url: "https://more.sagehairclinic.com/og/c-hair-restoration.webp", width: 1200, height: 630, alt: "Hair restoration consultation at Sage Hair Clinic in Metuchen, NJ" }] },
  twitter: { card: "summary_large_image", images: ["https://more.sagehairclinic.com/og/c-hair-restoration.webp"] },
  title: 'Hair Restoration Consultation in Metuchen, NJ | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function HairRestorationPage() {
  return (
    <>
      {/* Real Metuchen-hosted forms; the 9 gclid/UTM hidden fields were added
          and browser-verified 2026-08-18 (ClickUp 86bbgbdtv). */}
      {/* EFFVIT DNI only (dni_pools 'sage-metuchen', LIVE since 2026-08-18).
          Never add GHL's number_pool.js / user_session.js here: the two
          swappers race on the same text nodes, and the same six 848 CTNs are
          registered in both ledgers, so each system corrupts the other's
          call→click mapping. ClickUp 86bb9qbn0: EFFVIT pool only — it is the
          one that feeds control.effvit.com and the gclid-keyed OCI upload. */}
      <SageHairLP
        heroFormId="o2iad3Vpe364PZ9hreA8"
        bottomFormId="PzLR3XAN4fIL42nBWf0W"
        phoneHref="+17322051790"
        phoneDisplay="(732) 205-1790"
        hideMoorestown
        dniClient="sage-metuchen"
      />
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a32555f0e84ef9ef970d86e"
        strategy="afterInteractive"
      />
    </>
  )
}
