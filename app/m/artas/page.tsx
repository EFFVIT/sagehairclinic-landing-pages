import type { Metadata } from 'next'
import ArtasMetaLP from '@/components/ArtasMetaLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasMetaPage() {
  return (
    <ArtasMetaLP
      // TODO: replace with a real RootLogic form ID dedicated to the ARTAS campaign
      heroFormId="TODO_ARTAS_HERO_FORM_ID"
      bottomFormId="TODO_ARTAS_FOOTER_FORM_ID"
    />
  )
}
