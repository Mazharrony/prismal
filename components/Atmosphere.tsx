'use client'

import { useEffect, useRef, useState } from 'react'
import { isCoarsePointer } from '@/world/capability'
import styles from './atmosphere.module.css'

/* The two flat passes that sit between the reader and the render — a vignette
 * and a grain tile — plus the custom cursor.
 *
 * The grain is generated once into a data URL rather than shipped as an asset:
 * it is 180×180 of seeded noise, which costs less to compute than to download,
 * and keeps the page free of a binary that would need cache-busting.
 */

const TILE = 180
/** Seeded so the tile is identical on every load and between sessions. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeGrain() {
  const canvas = document.createElement('canvas')
  canvas.width = TILE
  canvas.height = TILE
  const context = canvas.getContext('2d')
  if (!context) return ''
  const image = context.createImageData(TILE, TILE)
  const random = mulberry32(9)
  for (let i = 0; i < image.data.length; i += 4) {
    const value = 110 + random() * 90
    image.data[i] = value
    image.data[i + 1] = value
    image.data[i + 2] = value
    image.data[i + 3] = 255
  }
  context.putImageData(image, 0, 0)
  return canvas.toDataURL('image/png')
}

export function Atmosphere() {
  const [grain, setGrain] = useState('')
  const [fine, setFine] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setGrain(makeGrain())
  }, [])

  useEffect(() => {
    if (isCoarsePointer()) return
    setFine(true)

    const dot = cursorRef.current
    if (!dot) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const enter = () => dot.classList.add(styles.active)
    const leave = () => dot.classList.remove(styles.active)

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-cursor]'))
    targets.forEach((element) => {
      element.addEventListener('mouseenter', enter)
      element.addEventListener('mouseleave', leave)
    })

    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      targets.forEach((element) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <>
      <div className={styles.vignette} aria-hidden="true" />
      {grain ? (
        <div
          className={styles.grain}
          aria-hidden="true"
          style={{ backgroundImage: `url(${grain})` }}
        />
      ) : null}
      {fine ? <div ref={cursorRef} className={styles.cursor} aria-hidden="true" /> : null}
    </>
  )
}
