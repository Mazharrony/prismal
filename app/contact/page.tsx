import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { site } from '@/content/site'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell Prismal what you need built. We reply to everything.',
}

export default function Contact() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Contact</p>
        <h1 className={styles.title}>Tell us what you need built.</h1>
        <p className={styles.lede}>
          Describe the problem in plain language — no brief or spec required. We will tell
          you honestly whether we are the right people for it, and what it would take.
        </p>
      </header>
      <ContactForm />
      <p className={styles.alt}>
        Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </div>
  )
}
