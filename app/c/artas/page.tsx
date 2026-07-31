import type { Metadata } from 'next'
import ArtasConsultLP from '@/components/ArtasConsultLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasConsultPage() {
  return (
    <ArtasConsultLP
      heroFormId="JRQUSXBB48Nt2DcTGCpM"
      bottomFormId="gC3pfj36b8I5Xf5LnsJM"
    />
  )
}
