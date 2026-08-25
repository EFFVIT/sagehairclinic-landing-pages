'use client'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

/* GA4 ONLY. GTM-MZ7TR95R was removed from this landing page app on 2026-08-15 at
   Joe's direction. Measured live that day it delivered Microsoft Clarity session
   recording, the Meta pixel, Bing UET and a DoubleClick view-through remarketing
   beacon onto patient-intake pages. Neither Microsoft nor Meta will sign a BAA.

   The container itself was NOT edited, and must not be: Sage's own website
   serves the same container, so editing it would strip that site's own analytics
   and retargeting. Scope is the landing page fleet only.

   allow_google_signals:false is load-bearing. Without it, GA4 linked to Google Ads
   keeps building the same remarketing audiences off the same page views and
   removing the beacon achieves nothing (H-32). */
const GA_ID = 'G-PY114415WL'

/* HEALTH-INTENT ROUTE GATE, added 2026-08-25 on Joe's explicit call during the
   fleet-wide LP sweep.

   Every /c route in this app mounts a GHL consult form collecting a name,
   email, mobile and hair-loss intent. That is health-intent input in a form,
   and H-26 / §6 failure mode 7 make a browser analytics tag on such a page
   non-waivable; these practices are BAA-covered and Google will not sign a BAA
   for GA4. Server-side delivery would not launder it either, because the
   restriction follows the data rather than the pipe (H-32).

   This app had NO route gate at all before today and was verified firing GA4
   live on its /c pages. Gating the PREFIX rather than listing routes is
   deliberate: a gate written against the routes that exist today goes silently
   wrong the moment a route is added (H-45).

   Suppressing a tag on a medical page can only reduce exposure, so this cannot
   hide a violation. Widening it back belongs to Joe (H-43). */
const HEALTH_INTENT_ROUTES = ['/c']
const isHealthIntent = (p: string) =>
  HEALTH_INTENT_ROUTES.some((r) => p === r || p.startsWith(r + '/'))

export default function GaTag() {
  const pathname = usePathname() || ''
  if (isHealthIntent(pathname)) return null

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js', new Date());
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false,anonymize_ip:true});`}
      </Script>
    </>
  )
}
