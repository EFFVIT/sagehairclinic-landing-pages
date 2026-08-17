import type { Metadata } from 'next'
import ArtasConsultLP from '@/components/ArtasConsultLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration Consultation | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasConsultPage() {
  return (
    <>
      <ArtasConsultLP
        heroFormId="JRQUSXBB48Nt2DcTGCpM"
        bottomFormId="gC3pfj36b8I5Xf5LnsJM"
      />
      {/* GHL's native number_pool.js + user_session.js removed 2026-08-17. Both
          pools answered {"isActive":false}, so nothing swapped, and ClickUp
          86bb9qbn0 specifies the EFFVIT dni_pools path instead. DniSwap is NOT
          wired here yet: this page displays (848) 200-1644, which is neither
          office's published line, so it needs a pool/number decision first. */}
    </>
  )
}
