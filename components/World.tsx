'use client'

import { useEffect, useRef } from 'react'
import { createScrollConductor, type Conductor } from '@/world/conductor'
import { sampleWorld } from '@/world/chapters'
import { isCoarsePointer, isLowPower, prefersReducedMotion } from '@/world/capability'
import styles from './world.module.css'

export function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const sections = document.querySelectorAll<HTMLElement>('[data-cam]')
    if (!sections.length) return

    let conductor: Conductor | null = null
    let scene: { update: (s: ReturnType<typeof sampleWorld>) => void; resize: () => void; dispose: () => void } | null = null
    let cancelled = false

    const mobile = isCoarsePointer()

    // three.js is imported here so it lands in the dynamic chunk, not the page bundle.
    import('@/world/scene')
      .then(({ createScene }) => {
        if (cancelled) return
        scene = createScene({ canvas, mobile, lowPower: isLowPower() })
        document.documentElement.dataset.world = 'on'

        conductor = createScrollConductor({
          sections,
          damping: 5.2,
          reducedMotion: prefersReducedMotion(),
          onUpdate: (state) => scene?.update(sampleWorld(state.smooth, mobile)),
          onChapterChange: (index) => {
            document.documentElement.dataset.chapter = String(index)
          },
        })
        conductor.start()
        window.addEventListener('resize', onResize, { passive: true })
      })
      .catch((error) => {
        // A failed world must never take the page with it.
        console.error('[world] failed to initialise, falling back to static page:', error)
      })

    function onResize() {
      scene?.resize()
    }

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      conductor?.destroy()
      scene?.dispose()
      delete document.documentElement.dataset.chapter
      delete document.documentElement.dataset.world
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
