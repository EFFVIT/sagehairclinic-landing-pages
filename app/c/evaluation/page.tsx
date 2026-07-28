import type { Metadata } from 'next'
import Script from 'next/script'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  openGraph: { images: [{ url: "https://more.sagehairclinic.com/og/c-evaluation.webp", width: 1200, height: 630, alt: "Complimentary hair evaluation at Sage Hair Clinic" }] },
  twitter: { card: "summary_large_image", images: ["https://more.sagehairclinic.com/og/c-evaluation.webp"] },
  title: 'Free Hair Loss Evaluation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function EvaluationPage() {
  return (
    <>
      <SageHairLP
        heroFormId="JRQUSXBB48Nt2DcTGCpM"
        bottomFormId="gC3pfj36b8I5Xf5LnsJM"
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
