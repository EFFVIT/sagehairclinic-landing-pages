import type { Metadata } from 'next'
import ArtasMetaLP from '@/components/ArtasMetaLP'

export const metadata: Metadata = {
  title: 'ARTAS Robotic Hair Restoration | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function ArtasMetaPage() {
  return (
    <ArtasMetaLP
      heroFormId="WLibZyahE99rBFolZNrs"
      bottomFormId="IjT7GToDzvZ5SHNDu7un"
    />
  )
}
