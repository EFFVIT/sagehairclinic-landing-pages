'use client'
import { useEffect } from 'react'

// Session-level dynamic number insertion. Paid sessions (gclid/gbraid/wbraid
// present) lease a tracking number from control.effvit.com and every visible
// instance of the static number is swapped, so an inbound call maps back to
// this exact session's click id. Organic/direct sessions never lease — they
// keep the static number, by design. Any failure (endpoint down, pool off,
// no numbers, client not provisioned) leaves the page untouched.
//
// Ported from rhrli-landing-pages 2026-08-17 with one deliberate change:
// CLIENT and DEFAULT_DIGITS are props rather than module constants. Every other
// repo in the fleet is a single-location practice with one static number, so a
// constant is fine there. Sage runs two offices with two different numbers on
// two sets of pages off one shared component, and a module constant would swap
// the Moorestown number on a Metuchen page.
//
// This replaces GHL's native number_pool.js, which was removed the same day.
// The two are mutually exclusive: ClickUp 86bb9qbn0 specifies the EFFVIT pool
// and says not to install GHL's, and only the EFFVIT path feeds
// control.effvit.com reporting and the gclid-keyed offline upload.

const DNI_ENDPOINT = 'https://control.effvit.com/api/dni/lease'

function formatDashes(e164: string): string {
  const d = e164.replace(/\D/g, '').replace(/^1/, '')
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`
}

function swapNumber(e164: string, defaultDigits: string) {
  const digits = e164.replace(/\D/g, '').replace(/^1/, '')
  if (digits.length !== 10) return
  const formatted = formatDashes(e164)

  // tel: links (any href carrying the default digits, with or without +1)
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((a) => {
    if (a.href.replace(/\D/g, '').includes(defaultDigits)) {
      a.href = `tel:+1${digits}`
    }
  })

  // visible text nodes containing any common formatting of the default number.
  // Sage splits the number across two elements in the footer — "(856)" and
  // "360-7159" land in separate text nodes — so the area code is matched with
  // its parentheses optional and the groups are matched independently below.
  const pattern = new RegExp(
    `\\(?${defaultDigits.slice(0, 3)}\\)?[\\s.\\-]?${defaultDigits.slice(3, 6)}[\\s.\\-]?${defaultDigits.slice(6)}`,
    'g',
  )
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const hits: Text[] = []
  while (walker.nextNode()) {
    const t = walker.currentNode as Text
    if (t.nodeValue && pattern.test(t.nodeValue)) hits.push(t)
    pattern.lastIndex = 0
  }
  hits.forEach((t) => {
    t.nodeValue = t.nodeValue!.replace(pattern, formatted)
  })

  // Split-node fallback: the footer renders "(856)" and "360-7159" as separate
  // nodes, which the combined pattern above can never match. Rewrite the halves
  // only when both are present and adjacent in document order, so a stray
  // three-digit string elsewhere on the page cannot be mistaken for an area code.
  const area = defaultDigits.slice(0, 3)
  const local = `${defaultDigits.slice(3, 6)}-${defaultDigits.slice(6)}`
  const areaNodes: Text[] = []
  const localNodes: Text[] = []
  const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w2.nextNode()) {
    const t = w2.currentNode as Text
    const v = (t.nodeValue ?? '').trim()
    if (v === `(${area})` || v === area) areaNodes.push(t)
    else if (v === local) localNodes.push(t)
  }
  if (areaNodes.length && localNodes.length) {
    const nd = digits.slice(0, 3)
    const nl = `${digits.slice(3, 6)}-${digits.slice(6)}`
    areaNodes.forEach((t) => {
      t.nodeValue = (t.nodeValue ?? '').replace(area, nd)
    })
    localNodes.forEach((t) => {
      t.nodeValue = nl
    })
  }
}

export default function DniSwap({
  client,
  defaultDigits,
}: {
  client: string
  /** 10 digits, no punctuation, no country code — e.g. "8563607159" */
  defaultDigits: string
}) {
  useEffect(() => {
    try {
      if (!/^\d{10}$/.test(defaultDigits)) return

      const params = new URLSearchParams(window.location.search)
      const grab = (k: string) => {
        const v = params.get(k)
        if (v) sessionStorage.setItem(k, v)
        return v ?? sessionStorage.getItem(k)
      }
      const gclid = grab('gclid')
      const gbraid = grab('gbraid')
      const wbraid = grab('wbraid')
      if (!gclid && !gbraid && !wbraid) return

      // The lease is sticky per sessionKey AND scoped per client, so a visitor
      // who crosses from a Moorestown page to a Metuchen one gets a second,
      // independent lease rather than carrying the wrong office's number.
      const skKey = `dni_sk_${client}`
      let sessionKey = sessionStorage.getItem(skKey)
      if (!sessionKey) {
        sessionKey = crypto.randomUUID()
        sessionStorage.setItem(skKey, sessionKey)
      }

      // Swap instantly from a cached lease, then refresh it in the background
      // (the server is sticky per sessionKey, so the number can only stay the
      // same — the refresh just slides the lease window).
      const cacheKey = `dni_lease_${client}`
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        try {
          const { number, exp } = JSON.parse(cached)
          if (number && exp > Date.now()) swapNumber(number, defaultDigits)
        } catch { /* ignore */ }
      }

      const utm: Record<string, string> = {}
      for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
        const v = params.get(k) ?? sessionStorage.getItem(k)
        if (v) { utm[k] = v; sessionStorage.setItem(k, v) }
      }

      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 2500)
      fetch(DNI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client,
          sessionKey,
          gclid, gbraid, wbraid,
          utm,
          page: window.location.pathname,
        }),
        signal: ctrl.signal,
      })
        .then((r) => r.json())
        .then(({ lease }) => {
          if (lease?.number) {
            sessionStorage.setItem(cacheKey, JSON.stringify({
              number: lease.number,
              exp: Date.now() + (lease.ttlSeconds ?? 1800) * 1000,
            }))
            swapNumber(lease.number, defaultDigits)
            // React re-renders (accordions, carousels) restore the static
            // number from their own props — watch and re-apply. The swap is
            // idempotent (swapped text no longer matches), so the observer
            // can't loop on its own mutations.
            let pending: number | null = null
            const observer = new MutationObserver(() => {
              if (pending) return
              pending = window.setTimeout(() => {
                pending = null
                swapNumber(lease.number, defaultDigits)
              }, 250)
            })
            observer.observe(document.body, { childList: true, subtree: true, characterData: true })
          }
        })
        .catch(() => { /* static number stays — correct fallback */ })
        .finally(() => clearTimeout(timer))
    } catch { /* never break the page */ }
  }, [client, defaultDigits])

  return null
}
