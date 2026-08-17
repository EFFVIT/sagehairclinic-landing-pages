import type { Metadata } from 'next'
import Script from 'next/script'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  openGraph: { images: [{ url: "https://more.sagehairclinic.com/og/c-evaluation-moorestown.webp", width: 1200, height: 630, alt: "Complimentary hair evaluation at Sage Hair Clinic in Moorestown, NJ" }] },
  twitter: { card: "summary_large_image", images: ["https://more.sagehairclinic.com/og/c-evaluation-moorestown.webp"] },
  title: 'Free Hair Loss Evaluation in Moorestown, NJ | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function EvaluationMoorestownPage() {
  return (
    <>
      <SageHairLP
        heroFormId="Bz6dQVf0S97nyijuLRID"
        bottomFormId="RBDRZo6rfbZzUa5jV5ed"
        phoneHref="+18563607159"
        phoneDisplay="(856) 360-7159"
        hideMetuchen
        dniClient="sage"
      />
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a68cb2bf2ad8308216b2048"
        strategy="afterInteractive"
      />
    </>
  )
}
