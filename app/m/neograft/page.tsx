import type { Metadata } from 'next'
import NeografMetaLP from '@/components/NeografMetaLP'

export const metadata: Metadata = {
  title: 'NeoGraft Automated FUE | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function NeografMetaPage() {
  return (
    <NeografMetaLP
      // TODO: replace with a real RootLogic form ID dedicated to the NeoGraft campaign
      heroFormId="TODO_NEOGRAFT_HERO_FORM_ID"
      bottomFormId="TODO_NEOGRAFT_FOOTER_FORM_ID"
    />
  )
}
