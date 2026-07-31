import Script from 'next/script'

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script src="https://backend.leadconnectorhq.com/appengine/loc/In7QtzS6f6h8Znf5DRAZ/pool/B0cJj1hmJ55yU6dCeOdL/number_pool.js" strategy="afterInteractive" />
      <Script src="https://backend.leadconnectorhq.com/appengine/js/user_session.js" strategy="afterInteractive" />
    </>
  )
}
