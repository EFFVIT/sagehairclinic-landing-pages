import type { Metadata } from 'next'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  openGraph: { images: [{ url: "https://more.sagehairclinic.com/og/c-hair-restoration.webp", width: 1200, height: 630, alt: "Hair restoration consultation at Sage Hair Clinic" }] },
  twitter: { card: "summary_large_image", images: ["https://more.sagehairclinic.com/og/c-hair-restoration.webp"] },
  title: 'Hair Restoration Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function HairRestorationPage() {
  return (
    <SageHairLP
      heroFormId="JRQUSXBB48Nt2DcTGCpM"
      bottomFormId="gC3pfj36b8I5Xf5LnsJM"
    />
  )
}
