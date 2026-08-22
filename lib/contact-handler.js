import { CONTACT_LIMITS, CONTACT_MAX_BODY_BYTES, CONTACT_MIN_SUBMIT_MS } from './contact-limits.js'

const MAX_SUBMIT_MS = 1000 * 60 * 60 * 6
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const ALLOWED_KEYS = new Set(['name', 'email', 'message', 'website', 'startedAt'])

const hits = new Map()

export function getClientIp(headers) {
  const realIp = headerValue(headers, 'x-real-ip')
  if (realIp) return realIp.slice(0, 64)

  const forwarded = headerValue(headers, 'x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64)

  return 'unknown'
}

export function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(data))
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      resolve(req.body)
      return
    }

    if (typeof req.body === 'string') {
      parseJson(req.body, resolve, reject)
      return
    }

    const chunks = []
    let size = 0

    req.on('data', (chunk) => {
      size += chunk.length
      if (size > CONTACT_MAX_BODY_BYTES) {
        reject(Object.assign(new Error('too large'), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })

    req.on('end', () => {
      parseJson(Buffer.concat(chunks).toString('utf8'), resolve, reject)
    })

    req.on('error', () => {
      reject(Object.assign(new Error('invalid json'), { status: 400 }))
    })
  })
}

export async function handleContact({ body, origin, ip }) {
  if (!isAllowedOrigin(origin)) {
    return fail(403, 'Invalid request.')
  }

  if (isRateLimited(ip)) {
    return fail(429, 'Too many messages. Try again later.')
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return fail(400, 'Invalid request.')
  }

  for (const key of Object.keys(body)) {
    if (!ALLOWED_KEYS.has(key)) return fail(400, 'Invalid request.')
  }

  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return { status: 200, data: { ok: true } }
  }

  const name = cleanText(body.name, CONTACT_LIMITS.name)
  const email = cleanText(body.email, CONTACT_LIMITS.email)
  const message = cleanText(body.message, CONTACT_LIMITS.message)

  if (!name || !email || !message) {
    return fail(400, 'Please fill in your name, email, and message.')
  }

  if (!EMAIL_RE.test(email)) {
    return fail(400, 'Please enter a valid email address.')
  }

  const startedAt = Number(body.startedAt)
  if (!Number.isFinite(startedAt)) {
    return fail(400, 'Invalid request.')
  }

  const elapsed = Date.now() - startedAt
  if (elapsed < CONTACT_MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS) {
    return fail(400, 'Invalid request.')
  }

  const formId = process.env.FORMSUBMIT_ID || 'dc38724da73d762ae9f4ecd201682e1c'

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: 'New message from aleccampana.dev',
        _template: 'table',
        _captcha: 'false',
      }),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok || data.success === 'false' || data.success === false) {
      return fail(502, 'Could not send message.')
    }

    return { status: 200, data: { ok: true } }
  } catch {
    return fail(502, 'Could not send message.')
  }
}

function headerValue(headers, name) {
  const value = headers[name] ?? headers[name.toLowerCase()]
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

function isAllowedOrigin(origin) {
  if (!origin || origin.length > 200) return false

  const allowed = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
    'https://aleccampana.dev',
    'https://www.aleccampana.dev',
  ])

  if (allowed.has(origin)) return true

  if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) {
    return true
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (productionHost) {
    const host = productionHost.replace(/^https?:\/\//, '')
    if (origin === `https://${host}`) return true
  }

  return false
}

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS)

  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)
  return false
}

function cleanText(value, max) {
  if (typeof value !== 'string') return ''
  return value.replace(/\0/g, '').replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

function parseJson(raw, resolve, reject) {
  if (raw.length > CONTACT_MAX_BODY_BYTES) {
    reject(Object.assign(new Error('too large'), { status: 413 }))
    return
  }

  if (!raw) {
    resolve({})
    return
  }

  try {
    resolve(JSON.parse(raw))
  } catch {
    reject(Object.assign(new Error('invalid json'), { status: 400 }))
  }
}

function fail(status, error) {
  return { status, data: { ok: false, error } }
}
