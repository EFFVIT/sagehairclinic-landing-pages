import type { Metadata } from 'next'
import ArtasConsultLP from '@/components/ArtasConsultLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasConsultPage() {
  return (
    <ArtasConsultLP
      // TODO: replace with a real RootLogic form ID dedicated to the ARTAS campaign
      heroFormId="TODO_ARTAS_C_HERO_FORM_ID"
      bottomFormId="TODO_ARTAS_C_FOOTER_FORM_ID"
    />
  )
}
