import type { Metadata } from 'next'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
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
