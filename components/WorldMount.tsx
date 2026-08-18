'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { shouldRenderWorld } from '@/world/capability'

/* `ssr: false` is only legal inside a client component in the App Router, so this
 * thin wrapper exists to keep the three.js chunk out of every other route and out
 * of the server bundle entirely. */
const World = dynamic(() => import('./World').then((m) => m.World), { ssr: false })

export function WorldMount() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Decided after mount: matchMedia and WebGL probing need a real browser.
    setEnabled(shouldRenderWorld())

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setEnabled(shouldRenderWorld())
    motion.addEventListener('change', onChange)
    return () => motion.removeEventListener('change', onChange)
  }, [])

  if (!enabled) return null
  return <World />
}
