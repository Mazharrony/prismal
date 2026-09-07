'use client'

import { useEffect, useState } from 'react'
import { chapters } from '@/world/chapters'
import { prefersReducedMotion } from '@/world/capability'
import styles from './chapter-rail.module.css'

/* The chapter rail: where you are in the journey, and a way to jump.
 *
 * It recomputes the same anchors the conductor uses rather than reading its
 * state, so the rail is correct even when the world never loads — the two
 * agree because they measure the same sections, not because one calls the
 * other.
 */

const TITLES: Record<string, string> = {
  threshold: 'Threshold',
  catalogue: 'What we build',
  websites: 'Websites and web apps',
  'custom-software': 'Software made to order',
  'ai-automation': 'AI that runs the admin',
  work: 'Evidence',
  close: 'Start here',
}

export function ChapterRail() {
  const [active, setActive] = useState(0)
  const [anchors, setAnchors] = useState<number[]>([])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-cam]'))
    if (!sections.length) return

    let points: number[] = []

    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      points = sections.map((element, i) => {
        if (i === 0) return 0
        if (i === sections.length - 1) return max
        const value = element.offsetTop + element.offsetHeight * 0.5 - window.innerHeight * 0.5
        return Math.min(max, Math.max(0, value))
      })
      for (let i = 1; i < points.length; i += 1) {
        points[i] = Math.max(points[i], points[i - 1] + 1)
      }
      setAnchors([...points])
    }

    const progressAt = (y: number) => {
      if (!points.length || y <= points[0]) return 0
      for (let i = 0; i < points.length - 1; i += 1) {
        if (y <= points[i + 1]) {
          return i + (y - points[i]) / Math.max(1, points[i + 1] - points[i])
        }
      }
      return points.length - 1
    }

    // Rounding means the rail flips at the midpoint between two anchors, which
    // is where the camera has visibly committed to the next shot.
    const onScroll = () => setActive(Math.round(progressAt(window.scrollY)))

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })

    const observer = new ResizeObserver(() => {
      measure()
      onScroll()
    })
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [])

  const goTo = (index: number) => {
    const top = anchors[index]
    if (top === undefined) return
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <nav className={styles.rail} aria-label="Chapters">
      {chapters.map((chapter, i) => {
        const title = TITLES[chapter.id] ?? chapter.id
        return (
          <button
            key={chapter.id}
            type="button"
            className={styles.tick}
            data-on={i === active}
            aria-label={title}
            aria-current={i === active ? 'true' : undefined}
            title={title}
            onClick={() => goTo(i)}
          >
            <i />
          </button>
        )
      })}
    </nav>
  )
}
