import type { Metadata } from 'next'
import { Placeholder } from '@/components/Placeholder'
import styles from '../about/about.module.css'

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Privacy policy and terms for Prismal.',
  robots: { index: false, follow: true },
}

export default function Legal() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Legal</p>
        <h1 className={styles.title}>Privacy and terms</h1>
      </header>
      <section className={styles.section}>
        <h2 className="label">Privacy</h2>
        <p className={styles.body}>
          <Placeholder note="what contact-form data is collected, where it is stored, how long it is kept, and who processes it — must reflect actual practice" />
        </p>
      </section>
      <section className={styles.section}>
        <h2 className="label">Company details</h2>
        <p className={styles.body}>
          <Placeholder note="registered entity name, trade licence number, and registered Dubai address" />
        </p>
      </section>
    </div>
  )
}
