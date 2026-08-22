import { getClientIp, handleContact, readJsonBody, sendJson } from '../lib/contact-handler.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
    return
  }

  const contentType = typeof req.headers['content-type'] === 'string' ? req.headers['content-type'] : ''
  if (!contentType.toLowerCase().includes('application/json')) {
    sendJson(res, 415, { ok: false, error: 'Invalid request.' })
    return
  }

  try {
    const body = await readJsonBody(req)
    const origin = typeof req.headers.origin === 'string' ? req.headers.origin : ''
    const result = await handleContact({
      body,
      origin,
      ip: getClientIp(req.headers),
    })
    sendJson(res, result.status, result.data)
  } catch (error) {
    const status = error.status === 413 || error.status === 400 ? error.status : 400
    sendJson(res, status, { ok: false, error: 'Invalid request.' })
  }
}
