import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services, getService } from '@/content/services'
import { Field, isUnfilled } from '@/components/Placeholder'
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

  return (
    <article className="wrap">
      <header className={styles.head}>
        <p className="label">{service.capability}</p>
        <h1 className={styles.title}>{service.title}</h1>
        <p className={styles.promise}>{service.promise}</p>
      </header>

      <section className={styles.block} aria-labelledby="for-whom">
        <h2 id="for-whom" className="label">
          Who this is for
        </h2>
        <ul className={styles.list}>
          {service.forWhom.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block} aria-labelledby="includes">
        <h2 id="includes" className="label">
          How it runs
        </h2>
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
      </section>

      <section className={styles.facts} aria-labelledby="facts">
        <h2 id="facts" className="label">
          Scope
        </h2>
        <dl className={styles.dl}>
          <div>
            <dt className="label">Typical timeline</dt>
            <dd className={isUnfilled(service.timeline) ? '' : 'num'}>
              <Field value={service.timeline} />
            </dd>
          </div>
          <div>
            <dt className="label">Engagements from</dt>
            <dd className={isUnfilled(service.priceFrom) ? '' : 'num'}>
              <Field value={service.priceFrom} />
            </dd>
          </div>
        </dl>
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
