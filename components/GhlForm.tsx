'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

export default function GhlForm({
  formId,
  height = 620,
  formName = '',
}: {
  formId: string
  height?: number
  formName?: string
}) {
  const [src, setSrc] = useState(`https://api.leadconnectorhq.com/widget/form/${formId}`)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const out = new URLSearchParams()

    const gclid = urlParams.get('gclid') || sessionStorage.getItem('gclid')
    if (gclid) {
      sessionStorage.setItem('gclid', gclid)
      out.set('gclid', gclid)
    }

    UTM_KEYS.forEach(key => {
      const val = urlParams.get(key) || sessionStorage.getItem(key)
      if (val) {
        sessionStorage.setItem(key, val)
        out.set(key, val)
      }
    })

    if (out.toString()) {
      setSrc(`https://api.leadconnectorhq.com/widget/form/${formId}?${out.toString()}`)
    }
  }, [formId])

  return (
    <>
      <iframe
        src={src}
        style={{ width: '100%', height: `${height}px`, border: 'none', borderRadius: '0px', display: 'block' }}
        id={`inline-${formId}`}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={height}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        title={formName || formId}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  )
}
