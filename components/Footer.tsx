import Link from 'next/link'
import { footerNav, site } from '@/content/site'
import styles from './footer.module.css'

/* The colophon.
 *
 * Three columns rather than two: identity, where to go next, and how to reach
 * us. Contact earns its own column because WhatsApp is now the only channel —
 * burying the single way to start a conversation inside a nav list would be the
 * one genuine mistake this footer could make.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <p className={styles.mark}>{site.name}</p>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className={styles.heading}>Site</p>
          <ul className={styles.list}>
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={styles.heading}>Contact</p>
          <a
            className={styles.whatsapp}
            href={site.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {site.whatsapp}
          </a>
          <p className={styles.channel}>WhatsApp</p>
        </div>
      </div>

      <div className={styles.base}>
        <span className="label">
          {site.city}, {site.country}
        </span>
        <span className="label">
          &copy; {new Date().getFullYear()} {site.legalName}
        </span>
      </div>
    </footer>
  )
}
