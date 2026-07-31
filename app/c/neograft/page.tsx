import type { Metadata } from 'next'
import NeografConsultLP from '@/components/NeografConsultLP'

export const metadata: Metadata = {
  title: 'NeoGraft Automated FUE Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function NeografConsultPage() {
  return (
    <NeografConsultLP
      heroFormId="Bz6dQVf0S97nyijuLRID"
      bottomFormId="RBDRZo6rfbZzUa5jV5ed"
    />
  )
}
