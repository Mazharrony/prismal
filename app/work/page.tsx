import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCaseStudies } from '@/lib/work'
import { portfolio } from '@/content/portfolio'
import styles from './work.module.css'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Live sites Prismal has built for companies in Dubai, Sharjah, Abu Dhabi and beyond.',
}

export default function WorkIndex() {
  const studies = getCaseStudies()

  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="label">Evidence</p>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.lede}>
          Every site below is live. Open any of them and judge the work directly.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="live">
        <div className={styles.sectionHead}>
          <h2 id="live" className="label">
            Live sites
          </h2>
          <span className={styles.rule} />
        </div>
        <ul className={styles.grid}>
          {portfolio.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={styles.site}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={styles.shot}>
                  <Image
                    src={item.image}
                    alt={`${item.name} website`}
                    width={800}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </span>
                <span className={styles.siteName}>{item.name}</span>
                <span className={styles.siteBuilt}>{item.built}</span>
                <span className={`label ${styles.siteMeta}`}>
                  {item.location ?? ''}
                  <i className={styles.arrow} aria-hidden="true">
                    ↗
                  </i>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Case studies stay separate from the link list above. A live URL is a
        * fact; a case study makes claims about outcomes, so it only appears once
        * a client has approved the numbers behind it. */}
      {studies.length > 0 && (
        <section className={styles.section} aria-labelledby="studies">
          <div className={styles.sectionHead}>
            <h2 id="studies" className="label">
              Case studies
            </h2>
            <span className={styles.rule} />
          </div>
          <ul className={styles.list}>
            {studies.map((study) => (
              <li key={study.slug}>
                <Link href={`/work/${study.slug}`} className={styles.card}>
                  <span className="label">
                    {study.client} &middot; <span className="num">{study.year}</span>
                  </span>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <p className="muted">{study.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  )
}
