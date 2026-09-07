import type { Metadata } from 'next'
import { Placeholder } from '@/components/Placeholder'
import { site } from '@/content/site'
import styles from '../about/about.module.css'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open roles at Prismal in Dubai.',
}

export default function Careers() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Careers</p>
        <h1 className={styles.title}>Build things that go into production.</h1>
      </header>
      <section className={styles.section}>
        <h2 className="label">Open roles</h2>
        <p className={styles.body}>
          <Placeholder note="current openings, or state plainly that there are none" />
        </p>
        <p className="muted">
          Nothing listed that fits? Message us on{' '}
          <a href={site.whatsappUrl} target="_blank" rel="noreferrer noopener">
            WhatsApp
          </a>
          .
        </p>
      </section>
    </div>
  )
}
