import Link from 'next/link'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { WorldMount } from '@/components/WorldMount'
import { Reveal } from '@/components/Reveal'
import { ChapterRail } from '@/components/ChapterRail'
import { Atmosphere } from '@/components/Atmosphere'
import { Foreground } from '@/components/Foreground'
import { Preloader } from '@/components/Preloader'
import styles from './home.module.css'

/* The seven chapters exist as real, server-rendered HTML.
 *
 * This is deliberate and load-bearing: the same markup is the SEO surface, the
 * reduced-motion fallback, and the WebGL-failure fallback. The world binds to
 * `data-cam` and layers over this — it never replaces it. If the world never
 * loads, this page still sells.
 *
 * `data-rv` marks an element for the reveal observer; headings carrying
 * `display` are additionally split word-by-word. Both degrade to plain visible
 * text when JS or motion is unavailable.
 */

const arrow = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M3 10 10 3M10 3H4.5M10 3v5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

/* The hero floor doubles as the table of contents. */
const index = [
  ...services.map((s) => ({ label: s.capability, note: s.promise })),
  { label: 'Evidence', note: 'The sites and systems we have already shipped.' },
]

export default function Home() {
  return (
    <>
      <Preloader />
      <WorldMount />
      <Atmosphere />
      <ChapterRail />
      <Reveal />

      {/* 0 — Threshold */}
      <section className={styles.hero} data-cam="0" id="top">
        <div className={styles.heroTop}>
          <p className="label eyebrow" data-rv="fade">
            Dubai
          </p>
          {/* Deliberately NOT site.tagline.
            *
            * The tagline is written for the <title> tag, the footer and the About
            * page, where naming all three service lines earns its length and its
            * search value. Set at 58px inside a 20ch column it ran to four lines
            * of display type that only repeated the nav directly above it.
            *
            * A headline has a different job: say what a visitor gets, in one
            * breath. The services are named in the lede, in the nav, and again in
            * the catalogue a screen below. */}
          <h1 className={`display ${styles.h1}`} data-rv="up">
            We build what your business runs on.
          </h1>
          <p className={styles.lede} data-rv="up">
            Websites, custom software, and AI that runs the daily admin. We&rsquo;re a
            small team in Dubai, and everything we build is yours to keep.
          </p>
          <div className={styles.actions} data-rv="up">
            <Link href="/contact" className={styles.primary} data-cursor>
              Start a project
            </Link>
            <Link href="/work" className={styles.secondary} data-cursor>
              See the work
            </Link>
          </div>
        </div>

        <div className={styles.heroSpacer} />

        <div className={styles.heroFoot}>
          <ol className={styles.index} data-rv="fade">
            {index.map((item, i) => (
              <li key={item.label} className={styles.indexItem}>
                <span className={styles.indexNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.indexLabel}>
                  <b>{item.label}</b>
                  <span>{item.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 1 — Catalogue.
        *
        * This slot used to hold three "products shipped / years operating / clients
        * served" counters that had no verified numbers behind them. Empty credibility
        * metrics are worse than none, so the chapter now answers the question a visitor
        * actually arrives with: what do you build? It reads straight off the service
        * data, so it cannot drift out of sync with the sections below it. */}
      <section className={styles.stage} data-cam="1" aria-labelledby="catalogue">
        <Foreground stage="catalogue" />
        <div className={styles.head} data-rv="fade">
          <p className="label k">
            <b>01</b> — Services
          </p>
          <span className={styles.rule} />
        </div>
        <h2 id="catalogue" className={`display ${styles.title}`} data-rv="up">
          What we build.
        </h2>
        <div className={styles.catalogue}>
          {services.map((service) => (
            <div key={service.slug} className={styles.catGroup} data-rv="up">
              <p className={`label ${styles.catLabel}`}>{service.capability}</p>
              <ul className={styles.catList}>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2, 3, 4 — the three offerings: websites, custom software, AI operations */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          className={styles.stage}
          data-cam={i + 2}
          aria-labelledby={`svc-${service.slug}`}
        >
          <Foreground stage={service.slug} />
          <p className={`vertical ${styles.vrt}`} aria-hidden="true">
            {service.capability}
          </p>

          <div className={styles.head} data-rv="fade">
            <p className="label k">
              <b>{String(i + 2).padStart(2, '0')}</b> — {service.capability}
            </p>
            <span className={styles.rule} />
          </div>

          <div className={styles.split}>
            <h2 id={`svc-${service.slug}`} className={`display ${styles.title}`} data-rv="up">
              {service.title}
            </h2>
            <div className={styles.copy}>
              <p className={styles.promise} data-rv="up">
                {service.promise}
              </p>
            </div>
          </div>

          <ol className={styles.steps}>
            {service.includes.map((item, k) => (
              <li key={item.step} className={styles.step} data-rv="fade" data-cursor>
                <span className={styles.stepK}>{String(k + 1).padStart(2, '0')}</span>
                <span className={styles.stepBody}>
                  <strong>{item.step}</strong>
                  <span>{item.detail}</span>
                </span>
                <i className={styles.stepBar} aria-hidden="true" />
              </li>
            ))}
          </ol>

          <Link href={`/services/${service.slug}`} className={styles.more} data-rv="fade" data-cursor>
            How it runs
            <span className={styles.ar}>{arrow}</span>
          </Link>
        </section>
      ))}

      {/* 5 — Work */}
      <section className={styles.stage} data-cam="5" aria-labelledby="work">
        <Foreground stage="work" />
        <div className={styles.head} data-rv="fade">
          <p className="label k">
            <b>05</b> — Evidence
          </p>
          <span className={styles.rule} />
        </div>
        <div className={styles.evidence}>
          <h2 id="work" className={`display ${styles.title}`} data-rv="up">
            Here's what we've built.
          </h2>
          <div>
            <p className={styles.promise} data-rv="up">
              Each project says what the client asked for, what we built, and how long it took. Some of them are still running. Have a look and see if any of it looks like your situation.
            </p>
            <Link href="/work" className={styles.more} data-rv="fade" data-cursor>
              Browse the work
              <span className={styles.ar}>{arrow}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — Close */}
      <section className={`${styles.stage} ${styles.close}`} data-cam="6" aria-labelledby="close">
        <p className="label eyebrow" data-rv="fade">
          Start here
        </p>
        <h2 id="close" className={styles.closeTitle} data-rv="up">
          Tell us what you're trying to build.
        </h2>
        <p data-rv="up">
          Write it however it comes out. We read everything that comes in, and the person who replies is the one who'd do the work.
        </p>
        <Link href="/contact" className={styles.cta} data-rv="up" data-cursor>
          <i aria-hidden="true" />
          Start a project
        </Link>
      </section>
    </>
  )
}
