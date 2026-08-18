import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCaseStudies, readCaseStudy } from '@/lib/work'
import styles from './study.module.css'

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = readCaseStudy(slug)
  if (!study || study.draft) return {}
  return { title: study.title, description: study.summary }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = readCaseStudy(slug)
  if (!study || study.draft) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    datePublished: String(study.year),
    author: { '@type': 'Organization', name: 'Prismal' },
    description: study.summary,
  }

  return (
    <article className="wrap">
      <header className={styles.head}>
        <p className="label">
          {study.client} &middot; <span className="num">{study.year}</span>
        </p>
        <h1 className={styles.title}>{study.title}</h1>
        <p className={styles.summary}>{study.summary}</p>
        {study.outcome && <p className={styles.outcome}>{study.outcome}</p>}
      </header>
      <div className={styles.body}>
        <MDXRemote source={study.body} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  )
}
