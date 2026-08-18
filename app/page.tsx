import Link from 'next/link'
import { services } from '@/content/services'
import { Placeholder } from '@/components/Placeholder'
import { WorldMount } from '@/components/WorldMount'
import styles from './home.module.css'

/* The seven chapters exist as real, server-rendered HTML.
 *
 * This is deliberate and load-bearing: the same markup is the SEO surface, the
 * reduced-motion fallback, and the WebGL-failure fallback. The world (added in
 * the next build step) binds to `data-cam` and layers over this — it never
 * replaces it. If the world never loads, this page still sells.
 */

export default function Home() {
  return (
    <>
      <WorldMount />
      {/* 0 — Threshold */}
      <section className={styles.hero} data-cam="0" id="top">
        <div className="wrap">
          <p className="label">Dubai</p>
          <h1 className={styles.h1}>
            We build the software
            <br />
            Dubai companies run on.
          </h1>
          <p className={styles.lede}>
            Product delivery, workflow automation, and applied AI — for companies that
            need the thing working, not a deck about it.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              Start a project
            </Link>
            <Link href="/work" className={styles.secondary}>
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* 1 — Proof. Warm-paper interlude: the rhythm break and the metric pause. */}
      <section className={styles.interlude} data-cam="1" aria-labelledby="proof">
        <div className="wrap">
          <h2 id="proof" className="label">
            Track record
          </h2>
          <dl className={styles.metrics}>
            <div>
              <dt>Products shipped</dt>
              <dd>
                <Placeholder note="verified count" />
              </dd>
            </div>
            <div>
              <dt>Years operating</dt>
              <dd>
                <Placeholder note="founding year" />
              </dd>
            </div>
            <div>
              <dt>Clients served</dt>
              <dd>
                <Placeholder note="verified count" />
              </dd>
            </div>
          </dl>
          <p className={styles.interludeNote}>
            Every number here must be verifiable and attributable before launch.
          </p>
        </div>
      </section>

      {/* 2, 3, 4 — the ladder: build it, run it without you, make it decide */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          className={styles.chapter}
          data-cam={i + 2}
          aria-labelledby={`svc-${service.slug}`}
        >
          <div className="wrap">
            <p className="label">
              <span className="num">{String(i + 1).padStart(2, '0')}</span> &nbsp;{service.capability}
            </p>
            <h2 id={`svc-${service.slug}`} className={styles.chapterTitle}>
              {service.title}
            </h2>
            <p className={styles.chapterLede}>{service.promise}</p>
            <ul className={styles.points}>
              {service.includes.map((item) => (
                <li key={item.step}>
                  <strong>{item.step}.</strong> <span className="muted">{item.detail}</span>
                </li>
              ))}
            </ul>
            <Link href={`/services/${service.slug}`} className={styles.more}>
              {service.title} — scope and timeline
            </Link>
          </div>
        </section>
      ))}

      {/* 5 — Work */}
      <section className={styles.chapter} data-cam="5" aria-labelledby="work">
        <div className="wrap">
          <p className="label">Evidence</p>
          <h2 id="work" className={styles.chapterTitle}>
            What we have actually built
          </h2>
          <p className={styles.chapterLede}>
            The argument for hiring us is the work, not the adjectives.
          </p>
          <Link href="/work" className={styles.more}>
            Browse the work
          </Link>
        </div>
      </section>

      {/* 6 — Close */}
      <section className={styles.close} data-cam="6" aria-labelledby="close">
        <div className="wrap">
          <h2 id="close" className={styles.closeTitle}>
            Tell us what you need built.
          </h2>
          <p className={styles.chapterLede}>
            Describe the problem in plain language. We will tell you whether we are the
            right people for it.
          </p>
          <Link href="/contact" className={styles.primary}>
            Start a project
          </Link>
        </div>
      </section>
    </>
  )
}
