import type { Metadata } from 'next'
import NeografMetaLP from '@/components/NeografMetaLP'

export const metadata: Metadata = {
  title: 'NeoGraft Automated FUE | Sage Hair Clinic',
  robots: 'noindex, nofollow',
}

export default function NeografMetaPage() {
  return (
    <NeografMetaLP
      heroFormId="QpqHZd8KuIEu2PPyFrCc"
      bottomFormId="KioupFfJA74fpfcwVsIg"
    />
  )
}
