import type { Metadata } from 'next'
import Link from 'next/link'
import { getCaseStudies } from '@/lib/work'
import { Placeholder } from '@/components/Placeholder'
import styles from './work.module.css'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products, automations and AI systems Prismal has delivered for clients in Dubai and beyond.',
}

export default function WorkIndex() {
  const studies = getCaseStudies()

  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Evidence</p>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.lede}>
          The argument for hiring us is the work, not the adjectives.
        </p>
      </header>

      {studies.length === 0 ? (
        <div className={styles.empty}>
          <Placeholder note="no published case studies yet — copy content/work/_TEMPLATE.mdx, fill it in, set draft: false" />
          <p className="muted">
            This page is wired and will list case studies automatically as they are added.
            It stays deliberately empty rather than showing invented projects.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {studies.map((study) => (
            <li key={study.slug}>
              <Link href={`/work/${study.slug}`} className={styles.card}>
                <span className="label">
                  {study.client} &middot; <span className="num">{study.year}</span>
                </span>
                <h2 className={styles.cardTitle}>{study.title}</h2>
                <p className="muted">{study.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
