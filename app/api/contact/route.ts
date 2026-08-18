import { NextResponse } from 'next/server'

/* First-party lead handling. No third-party form service.
 *
 * Delivery is intentionally fail-loud: if CONTACT_WEBHOOK_URL is not configured,
 * this returns 503 rather than a cheerful success. A form that silently drops
 * leads is worse than one that is visibly broken.
 */

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 3
const hits = new Map<string, number[]>()

/* NOTE: in-memory, so this is per serverless instance rather than global.
 * It stops casual abuse, not a determined attacker. Move to Upstash/KV if
 * spam becomes a real problem. */
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const { name, email, message, company, website } = payload as Record<string, string>

  // Honeypot: real users never fill a hidden field.
  if (website) return NextResponse.json({ ok: true })

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look valid.' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL
  if (!endpoint) {
    console.error('[contact] CONTACT_WEBHOOK_URL is not set — lead not delivered:', { name, email })
    return NextResponse.json(
      { error: 'Contact delivery is not configured yet. Please email us directly.' },
      { status: 503 },
    )
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, company: company ?? '', message, ip, at: new Date().toISOString() }),
    })
    if (!res.ok) throw new Error(`delivery responded ${res.status}`)
  } catch (error) {
    console.error('[contact] delivery failed:', error)
    return NextResponse.json({ error: 'We could not send that. Please email us directly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
