import Link from 'next/link'
import { footerNav, site } from '@/content/site'
import styles from './footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.mark}>{site.name}</p>
          <p className="muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
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
      </div>
      <div className={styles.base}>
        <span className="label">{site.city}</span>
        <span className="label">
          &copy; {new Date().getFullYear()} {site.legalName}
        </span>
      </div>
    </footer>
  )
}
