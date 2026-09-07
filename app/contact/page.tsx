import type { Metadata } from 'next'
import { site } from '@/content/site'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Message Prismal on WhatsApp. We read everything that comes in.',
}

/* One channel, on purpose.
 *
 * This page used to carry a form posting to /api/contact plus an email address.
 * The form only delivered when CONTACT_WEBHOOK_URL was set and returned 503
 * otherwise, so in practice it was a lead trap. WhatsApp is where this audience
 * already is, it needs no infrastructure, and the reply lands on a phone rather
 * than in an inbox nobody watches.
 */
export default function Contact() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Contact</p>
        <h1 className={styles.title}>Tell us what you&rsquo;re trying to build.</h1>
        <p className={styles.lede}>
          You don&rsquo;t need a brief or a spec. Tell us what happens now, what you want it
          to look like, and roughly when you need it. We&rsquo;ll come back with what
          we&rsquo;d build, how long it takes and what it costs. If it isn&rsquo;t work for
          us, we&rsquo;ll say so, and we usually know someone who does it.
        </p>
      </header>

      <section className={styles.channel} aria-labelledby="whatsapp">
        <h2 id="whatsapp" className="label">
          WhatsApp
        </h2>
        <a
          className={styles.big}
          href={site.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {site.whatsapp}
        </a>
        <p className="muted">
          Messages go straight to the people who would do the work. We reply during
          UAE business hours, and usually sooner.
        </p>
        <a
          className={styles.cta}
          href={site.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open WhatsApp
        </a>
      </section>
    </div>
  )
}
