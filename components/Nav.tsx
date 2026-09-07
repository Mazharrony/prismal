'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '@/content/site'
import styles from './nav.module.css'

/* The bar sets a wash once the page leaves the threshold and retreats on
 * downward scroll, so a chapter is never read through a permanent band of
 * chrome. kage resolves its active link from the scrolled chapter; prismal's
 * nav points at real routes, so the active state comes from the pathname.
 */
export function Nav() {
  const pathname = usePathname()
  const [stuck, setStuck] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setStuck(y > 40)
      setHidden(!open && y > lastY.current + 4 && y > window.innerHeight * 0.8)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // The sheet is a fixed overlay; leaving the page scrollable behind it lets a
  // trackpad scroll the chapter underneath while the menu is up.
  useEffect(() => {
    if (!open) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      document.documentElement.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const className = [
    styles.header,
    stuck ? styles.stuck : '',
    hidden ? styles.hide : '',
    open ? styles.open : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={className}>
      <Link href="/" className={styles.mark} aria-label={`${site.name} — home`} data-cursor>
        <span className={styles.markText}>
          <b>{site.name}</b>
          <i>Dubai</i>
        </span>
      </Link>

      <nav aria-label="Primary">
        <ul className={styles.list}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                data-on={pathname === item.href}
                data-cursor
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/contact" className={styles.cta} data-cursor>
        Start a project
      </Link>

      <button
        type="button"
        className={styles.burger}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i />
        <i />
      </button>
    </header>
  )
}
