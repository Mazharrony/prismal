'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { prefersReducedMotion } from '@/world/capability'
import styles from './preloader.module.css'

/* The boot curtain: mark, rule, a percentage.
 *
 * The number tracks real readiness, not a timer pretending to be one — it
 * advances toward whichever is further: elapsed boot time or the world
 * actually reporting in via html[data-world]. A capped wait means a machine
 * that never produces a canvas still gets its page in under a second.
 *
 * Under reduced motion the curtain never mounts at all; loading theatre is
 * exactly the kind of motion that preference is asking to skip.
 */

const MAX_BOOT = 900
const LABEL = 'Assembling the skyline'

export function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const start = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    // Only the first visit this session earns a curtain; on a back-navigation
    // the world is warm and a second boot would just be theatre.
    if (sessionStorage.getItem('prismal-booted')) return

    setMounted(true)
    start.current = performance.now()
    let frame = 0

    const tick = () => {
      const elapsed = performance.now() - start.current
      const timed = Math.min(1, elapsed / MAX_BOOT)
      const worldReady = document.documentElement.dataset.world === 'on'
      const target = worldReady ? 1 : Math.min(timed, 0.92)
      setProgress((value) => Math.max(value, target))

      if (timed >= 1 || (worldReady && elapsed > 420)) {
        setProgress(1)
        setDone(true)
        sessionStorage.setItem('prismal-booted', '1')
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!mounted) return null

  return (
    <div className={`${styles.curtain} ${done ? styles.done : ''}`} aria-hidden="true">
      <div className={styles.inner}>
        <Image
          src="/brand/02-mark-reversed.svg"
          alt=""
          width={232}
          height={160}
          className={styles.mark}
          priority
        />
        <div className={styles.bar}>
          <i style={{ insetInlineEnd: `${((1 - progress) * 100).toFixed(1)}%` }} />
        </div>
        <div className={styles.meta}>
          <span>{LABEL}</span>
          <span className="num">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  )
}
