'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/world/capability'
import styles from './foreground.module.css'

/* Foreground plates: near-camera silhouettes that pin to the floor of the
 * viewport while their chapter is active, then fade and blur away on handoff.
 *
 * kage cuts these from photographed foliage. Prismal has no such library, and
 * inventing one would mean shipping decorative art that says nothing about the
 * business — so these are drawn from the same massing vocabulary as the towers
 * in the world behind them. They are silhouettes of the thing the site is
 * already about, which is why they can sit at this scale without reading as
 * ornament.
 */

type Plate = { d: string; className: string; enter: 'up' | 'left' | 'right' }

/* Dubai, drawn as silhouettes.
 *
 * kage's plates are photographed Kyoto foliage; prismal's are the skyline the
 * whole site is about — the Burj Khalifa's telescoping spire, the Burj Al
 * Arab's sail, the Dubai Frame, marina towers, palms. Drawn as single paths so
 * a plate stays one element, in a 0 0 100 40 box with the baseline at y=40:
 * everything is anchored to the floor, never the top, so a plate always meets
 * the viewport edge.
 */
const PLATES: Record<string, Plate[]> = {
  // Catalogue — the Khalifa alone, standing in front of the list of what we build.
  catalogue: [
    {
      className: 'left',
      enter: 'left',
      d: 'M0 40V26h8v-5h6v5h5v14ZM26 40V30h9v10Z',
    },
    {
      className: 'centre',
      enter: 'up',
      d: 'M44 40V19h3v-6h2.4v-5h2l1-8 1 8h2v5h2.4v6h3v21ZM40 40v-12h4v12ZM61 40V28h4v12Z',
    },
    {
      className: 'right',
      enter: 'right',
      d: 'M100 40V24h-9v-4h-6v4h-5v16ZM74 40V31h-8v9Z',
    },
  ],
  // Websites — the Burj Al Arab: one sail, held open.
  websites: [
    {
      className: 'left',
      enter: 'left',
      d: 'M4 40 6 4h1.4l.8 10C15 17 20 24 21 40ZM7.4 4l.6-4 .6 4ZM0 40v-8h3v8Z',
    },
    {
      className: 'right',
      enter: 'right',
      d: 'M100 40V14h-8v-4h-5v4h-6v10h-7v16ZM70 40V29h-9v11ZM57 40v-7h-6v7Z',
    },
  ],
  // Custom software — the Dubai Frame: the machine you can see through.
  'custom-software': [
    {
      className: 'left',
      enter: 'left',
      d: 'M2 40V2h26v38h-5V7H7v33ZM0 40v-2h30v2Z',
    },
    {
      className: 'right',
      enter: 'right',
      d: 'M100 40V18h-7v-8h-6l-1-4-1 4h-5v8h-6v22ZM70 40V30h-8v10Z',
    },
  ],
  // AI automation — marina towers, the twisted Cayan profile on the left.
  'ai-automation': [
    {
      className: 'left',
      enter: 'left',
      d: 'M2 40 5 8h3l1-6 1 6h3l3 32h-4l-1.6-24h-.8L8 40ZM20 40V22h8v18ZM32 40V28h6v12Z',
    },
    {
      className: 'right',
      enter: 'right',
      d: 'M100 40V20h-8v-6h-5v6h-6v20ZM78 40V26h-7v14Z',
    },
  ],
  // Work — the shoreline: palms in front of the towers, Jumeirah reading.
  work: [
    {
      className: 'left',
      enter: 'left',
      d: 'M12 40c-.5-6-.8-12-.6-18-2 3-5 4-8.4 4 3-2.6 5.6-5 7.6-8-3-.6-5.6-2-7.6-4.6 3 .6 6 .4 8.6-1C10 9 9 5.6 9.4 2c1.6 3 3.6 5.6 6 7.4C16 6.6 17.4 4 19.6 2c-.4 3.4-.2 6.6 1 9.6 2.6-1.2 5.4-1.6 8.4-1-2.4 2.4-5 3.8-8 4.4 2 3 4.6 5.6 7.6 8.2-3.4 0-6.4-1.2-8.4-4 .2 7-.1 14-.6 20.8Z',
    },
    {
      className: 'right',
      enter: 'right',
      d: 'M100 40V12h-6v-5h-4l-1-7-1 7h-4v5h-5v12h-7v16ZM66 40V27h-9v13Z',
    },
  ],
}

export function Foreground({ stage }: { stage: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const plates = PLATES[stage]

  useEffect(() => {
    const element = ref.current
    if (!element || !plates) return

    const section = element.closest<HTMLElement>('[data-cam]')
    if (!section) return

    const reduce = prefersReducedMotion()
    let retiring = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.intersectionRatio >= 0.32
        if (active) {
          window.clearTimeout(retiring)
          element.classList.remove(styles.retiring)
          element.classList.add(styles.active)
          return
        }
        if (!element.classList.contains(styles.active)) return
        element.classList.remove(styles.active)
        if (reduce) return
        element.classList.add(styles.retiring)
        // Held for the length of the blur, then dropped so a parked plate is
        // never left painting a fixed layer off-chapter.
        retiring = window.setTimeout(() => element.classList.remove(styles.retiring), 820)
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: [0, 0.12, 0.32, 0.55] },
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      window.clearTimeout(retiring)
    }
  }, [plates])

  if (!plates) return null

  return (
    <div ref={ref} className={styles.stage} aria-hidden="true">
      {plates.map((plate, i) => (
        <span
          key={plate.className}
          className={`${styles.plate} ${styles[plate.className]}`}
          data-enter={plate.enter}
          style={{ '--fg-delay': `${i * 90}ms` } as React.CSSProperties}
        >
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
            <path d={plate.d} fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  )
}
