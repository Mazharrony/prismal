import Link from 'next/link'
import { nav, site } from '@/content/site'
import styles from './nav.module.css'

export function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.mark} aria-label={`${site.name} — home`}>
          {/* TODO(prismal): replace with the supplied wordmark asset */}
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.list}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className={styles.cta}>
          Start a project
        </Link>
      </div>
    </header>
  )
}
