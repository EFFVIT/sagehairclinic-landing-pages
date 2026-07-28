import type { Metadata } from 'next'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  openGraph: { images: [{ url: "https://more.sagehairclinic.com/og/c-hair-transplant.webp", width: 1200, height: 630, alt: "Hair transplant consultation at Sage Hair Clinic" }] },
  twitter: { card: "summary_large_image", images: ["https://more.sagehairclinic.com/og/c-hair-transplant.webp"] },
  title: 'Hair Transplant Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function HairTransplantPage() {
  return (
    <SageHairLP
      heroFormId="JRQUSXBB48Nt2DcTGCpM"
      bottomFormId="gC3pfj36b8I5Xf5LnsJM"
    />
  )
}
