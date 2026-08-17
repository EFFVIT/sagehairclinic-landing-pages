import type { Metadata } from 'next'
import NeografConsultLP from '@/components/NeografConsultLP'

export const metadata: Metadata = {
  title: 'NeoGraft Automated FUE Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function NeografConsultPage() {
  return (
    <>
      <NeografConsultLP
        heroFormId="Bz6dQVf0S97nyijuLRID"
        bottomFormId="RBDRZo6rfbZzUa5jV5ed"
      />
      {/* GHL's native number_pool.js + user_session.js removed 2026-08-17. Both
          pools answered {"isActive":false}, so nothing swapped, and ClickUp
          86bb9qbn0 specifies the EFFVIT dni_pools path instead. DniSwap is NOT
          wired here yet: this page displays (848) 200-1644, which is neither
          office's published line, so it needs a pool/number decision first. */}
    </>
  )
}
