import GaTag from '@/components/GaTag'
import Fab from '@/components/fab/Fab'
import './globals.css'

export const metadata = {
  title: 'Sage Hair Clinic',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* GTM-MZ7TR95R and the Meta pixel (1925381574824233) removed 2026-08-15 at
            Joe's direction. Measured live, the container delivered Microsoft Clarity
            session recording, Meta, and a DoubleClick view-through remarketing beacon
            onto pages collecting patient contact details and hair-loss intent. Neither
            Microsoft nor Meta will sign a BAA.
            The container itself was NOT edited: sagehairclinic.com serves the same one,
            so editing it would strip the client's own site. LP fleet scope only.
            GA4 is retained via <GaTag/>, loaded directly with allow_google_signals:false
            so the pageview cannot be rebuilt into a remarketing audience (H-32). */}
      </head>
      <body>
        <GaTag />
        <Fab client="sage" />
        {children}
      </body>
    </html>
  )
}
