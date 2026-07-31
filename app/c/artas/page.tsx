import type { Metadata } from 'next'
import Script from 'next/script'
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
      <Script src="https://backend.leadconnectorhq.com/appengine/loc/In7QtzS6f6h8Znf5DRAZ/pool/B0cJj1hmJ55yU6dCeOdL/number_pool.js" strategy="afterInteractive" />
      <Script src="https://backend.leadconnectorhq.com/appengine/js/user_session.js" strategy="afterInteractive" />
    </>
  )
}
