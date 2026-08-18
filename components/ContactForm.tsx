'use client'

import { useState } from 'react'
import styles from './contact-form.module.css'

type State = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    setError('')

    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? 'Something went wrong.')
      setState('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <p className={styles.sent} role="status">
        Thanks — that reached us. We reply to everything, usually within two working days.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <label className={styles.field}>
        <span className="label">Name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className={styles.field}>
        <span className="label">Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className={styles.field}>
        <span className="label">Company</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label className={styles.field}>
        <span className="label">What do you need built?</span>
        <textarea name="message" rows={6} required />
      </label>

      {/* Honeypot — hidden from users, catches naive bots */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === 'error' && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
