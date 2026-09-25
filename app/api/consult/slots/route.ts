import { NextRequest, NextResponse } from 'next/server'
import { getSlots, resolveOffice, isFormat, MULTI_OFFICE, type ConsultFormat } from '@/lib/consult'

export const dynamic = 'force-dynamic'

/* Live availability for one consultation format at one office. Hours, buffers
   and staff are configured in GHL; this only reads what that calendar already
   publishes.

   On a multi-office client `office` is REQUIRED. resolveOffice throws a 400
   rather than picking one, because returning the wrong practice's availability
   under the right practice's name is the failure that looks correct on screen. */
export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get('format') as ConsultFormat | null
  const office = req.nextUrl.searchParams.get('office')

  let resolved
  try {
    resolved = resolveOffice(office)
  } catch (err) {
    const e = err as Error
    return NextResponse.json({ error: e.message }, { status: 400 })
  }

  if (!format || !isFormat(resolved, format)) {
    return NextResponse.json(
      { error: `format must be one of ${Object.keys(resolved.calendars).join(', ')}` },
      { status: 400 }
    )
  }

  try {
    const slots = await getSlots(format, MULTI_OFFICE ? resolved.key : null)
    return NextResponse.json({ format, office: resolved.key, slots })
  } catch (err) {
    const e = err as Error & { status?: number; body?: unknown }
    console.error('[consult/slots]', e?.status, e?.message, e?.body)
    /* An empty list and a failed read are different claims with different
       owners, so the failure says so rather than returning []. */
    return NextResponse.json(
      { error: 'could not read availability', detail: e?.status || null },
      { status: 502 }
    )
  }
}
