import type { Metadata } from 'next'
import { Placeholder } from '@/components/Placeholder'
import { site } from '@/content/site'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who Prismal is and how we work.',
}

export default function About() {
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">About</p>
        <h1 className={styles.title}>{site.tagline}</h1>
      </header>

      <section className={styles.section}>
        <h2 className="label">How we work</h2>
        <p className={styles.body}>
          We take a small number of projects at a time and stay on them until they work in
          production. You talk to the people building the thing, not an account manager.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className="label">The company</h2>
        <p className={styles.body}>
          <Placeholder note="founding year, team size, and the honest story of why Prismal exists" />
        </p>
      </section>

      <section className={styles.section}>
        <h2 className="label">Team</h2>
        <p className={styles.body}>
          <Placeholder note="names, roles and real photographs — omit entirely rather than using stock portraits" />
        </p>
      </section>
    </div>
  )
}
