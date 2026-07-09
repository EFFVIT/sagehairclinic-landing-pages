import type { Metadata } from 'next'
import SageHairLP from '@/components/SageHairLP'

export const metadata: Metadata = {
  title: 'Hair Loss Evaluation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function HairLossEvaluationPage() {
  return (
    <SageHairLP
      heroFormId="REPLACE_WITH_HERO_FORM_ID"
      bottomFormId="REPLACE_WITH_FOOTER_FORM_ID"
    />
  )
}
