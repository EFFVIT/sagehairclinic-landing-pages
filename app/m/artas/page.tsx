import type { Metadata } from 'next'
import ArtasMetaLP from '@/components/ArtasMetaLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasMetaPage() {
  return (
    // Real Metuchen-hosted forms (2026-08-18, correcting a build that pointed
    // Metuchen pages at forms living in the Moorestown sub-account). These
    // two forms carry NO gclid/UTM hidden fields yet — Metuchen leads will
    // not be attributable until Mike adds them via the builder.
    <ArtasMetaLP
      heroFormId="i6rmjxtmMz9sBMFur6wb"
      bottomFormId="tYT7UL6UzNb9hhkz1nBc"
    />
  )
}
