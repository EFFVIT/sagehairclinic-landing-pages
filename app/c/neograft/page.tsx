import type { Metadata } from 'next'
import Script from 'next/script'
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
      <Script src="https://backend.leadconnectorhq.com/appengine/loc/In7QtzS6f6h8Znf5DRAZ/pool/8jsmq7SZkDjaNUz9w2SK/number_pool.js" strategy="afterInteractive" />
      <Script src="https://backend.leadconnectorhq.com/appengine/js/user_session.js" strategy="afterInteractive" />
    </>
  )
}
