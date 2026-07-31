import type { Metadata } from 'next'
import NeografConsultLP from '@/components/NeografConsultLP'

export const metadata: Metadata = {
  title: 'NeoGraft Automated FUE Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function NeografConsultPage() {
  return (
    <NeografConsultLP
      // TODO: replace with a real RootLogic form ID dedicated to the NeoGraft campaign
      heroFormId="TODO_NEOGRAFT_C_HERO_FORM_ID"
      bottomFormId="TODO_NEOGRAFT_C_FOOTER_FORM_ID"
    />
  )
}
