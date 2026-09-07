import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, getService } from '@/content/services'
import styles from './service.module.css'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return { title: service.title, description: service.promise }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.capability,
    description: service.promise,
    areaServed: 'AE',
    provider: { '@type': 'Organization', name: 'Prismal' },
  }

  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <article className="wrap">
      <header className={styles.head}>
        <p className="label eyebrow">{service.capability}</p>
        <h1 className={styles.title}>{service.title}</h1>
        <p className={styles.promise}>{service.promise}</p>
      </header>

      <section className={styles.row} aria-labelledby="provides">
        <h2 id="provides" className={`label ${styles.rowLabel}`}>
          What we build
        </h2>
        <div className={styles.rowBody}>
          <ul className={styles.list}>
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.row} aria-labelledby="for-whom">
        <h2 id="for-whom" className={`label ${styles.rowLabel}`}>
          Who this is for
        </h2>
        <div className={styles.rowBody}>
          <ul className={`${styles.list} ${styles.listWide}`}>
            {service.forWhom.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.row} aria-labelledby="includes">
        <h2 id="includes" className={`label ${styles.rowLabel}`}>
          How it runs
        </h2>
        <div className={styles.rowBody}>
          <ol className={styles.steps}>
            {service.includes.map((item, i) => (
              <li key={item.step} className={styles.step}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.stepTitle}>{item.step}</h3>
                  <p className="muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.row} aria-labelledby="other">
        <h2 id="other" className={`label ${styles.rowLabel}`}>
          Also from us
        </h2>
        <div className={styles.rowBody}>
          <nav className={styles.more}>
            {others.map((other) => (
              <Link key={other.slug} href={`/services/${other.slug}`} className={styles.moreCard}>
                <span className="label">{other.capability}</span>
                <span className={styles.moreTitle}>{other.title}</span>
                <span className={styles.morePromise}>{other.promise}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Tell us what you need built.</h2>
        <Link href="/contact" className={styles.ctaLink}>
          Start a project
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  )
}
