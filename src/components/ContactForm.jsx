import { useState } from 'react'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/dc38724da73d762ae9f4ecd201682e1c'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (honeypot) return
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: 'New message from aleccampana.dev',
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await response.json()
      if (!response.ok || data.success === 'false' || data.success === false) {
        throw new Error(data.message || 'Could not send message.')
      }

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      setError('Something went wrong. Email me directly at campanaalec@gmail.com.')
    }
  }

  const fieldClass =
    'min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-lime-400 focus:outline-none'
  const labelClass = 'mb-1.5 block font-mono text-[10px] tracking-wider text-zinc-500 uppercase'

  if (status === 'sent') {
    return (
      <div className="rounded-lg border border-lime-400/30 bg-lime-400/5 px-4 py-6 text-center">
        <p className="text-sm text-zinc-200">Message sent. I will get back to you by email.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-lime-400 hover:text-lime-300"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Website
        <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </label>

      <div>
        <label htmlFor="contact-name" className={labelClass}>Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} min-h-32 resize-y py-3`}
          required
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="min-h-11 rounded-md bg-lime-400 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm
