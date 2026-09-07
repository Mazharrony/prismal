'use client'

import { useEffect } from 'react'
import { prefersReducedMotion } from '@/world/capability'

/* The reading choreography: word-split display headings, staggered entrances,
 * and the scroll-driven hero exit.
 *
 * It renders nothing. Everything it touches is already in the server-rendered
 * DOM, so the page is complete and readable before this runs — and stays that
 * way if it never does. Under reduced motion it wires nothing at all: the
 * static markup is the reduced-motion experience, not a degraded copy of it.
 */

/** Words inside a line, in ms. Two staggers compose: this and SIBLING. */
const WORD_STEP = 72
/** Sibling elements sharing a parent, in ms. */
const SIBLING_STEP = 85

function splitWords(heading: HTMLElement) {
  if (heading.dataset.wordReady === 'true') return
  const phrase = heading.textContent?.replace(/\s+/g, ' ').trim()
  if (!phrase) return

  heading.dataset.wordReady = 'true'
  heading.classList.add('word-reveal')
  // The visible text becomes a pile of aria-hidden spans, so the accessible
  // name has to be restored explicitly or the heading reads as empty.
  heading.setAttribute('aria-label', phrase)
  heading.textContent = ''

  phrase.split(' ').forEach((word, i) => {
    if (i) heading.appendChild(document.createTextNode(' '))
    const mask = document.createElement('span')
    const inner = document.createElement('span')
    mask.className = 'word-mask'
    mask.setAttribute('aria-hidden', 'true')
    inner.className = 'word'
    inner.textContent = word
    inner.style.setProperty('--word-delay', `${i * WORD_STEP}ms`)
    mask.appendChild(inner)
    heading.appendChild(mask)
  })
}

export function Reveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const hero = document.querySelector<HTMLElement>('[data-cam="0"]')
    document.documentElement.dataset.reveal = 'on'

    document.querySelectorAll<HTMLElement>('h1.display, h2.display').forEach(splitWords)

    // Stagger siblings against their shared parent rather than document order,
    // so a two-column chapter reveals per column instead of in a single ripple.
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]'))
    const byParent = new Map<Element, HTMLElement[]>()
    items.forEach((element) => {
      const parent = element.parentElement
      if (!parent) return
      const group = byParent.get(parent) ?? []
      group.push(element)
      byParent.set(parent, group)
    })
    byParent.forEach((group) => {
      group.forEach((element, i) => {
        element.dataset.rvd = String(i * SIBLING_STEP)
      })
    })

    const timers: number[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const element = entry.target as HTMLElement
          const delay = Number(element.dataset.rvd ?? 0)
          timers.push(window.setTimeout(() => element.classList.add('rv-in'), delay))
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.04 },
    )

    // The hero is above the fold on load, so an observer would fire it at the
    // same instant as the page paint. It gets its own opening beat instead.
    items.forEach((element) => {
      if (!hero?.contains(element)) observer.observe(element)
    })

    hero?.querySelectorAll<HTMLElement>('[data-rv]').forEach((element, i) => {
      timers.push(window.setTimeout(() => element.classList.add('rv-in'), 120 + i * 95))
    })

    /* Hero exit. Driven by scroll position rather than a transition, so the
     * threshold dissolves under the reader's own hand as the first chapter
     * arrives. Inline styles are cleared at the top so the entrance above is
     * never pre-empted by a leftover opacity. */
    const exit = hero
      ? [
          { el: hero.querySelector<HTMLElement>('[data-rv="up"]'), at: 0.1, span: 0.3, shift: true },
          ...Array.from(hero.querySelectorAll<HTMLElement>('li')).map((el, i) => ({
            el,
            at: 0.2 + i * 0.1,
            span: 0.3,
            shift: true,
          })),
        ].filter((entry): entry is { el: HTMLElement; at: number; span: number; shift: boolean } =>
          Boolean(entry.el),
        )
      : []

    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
      return t * t * (3 - 2 * t)
    }

    function applyExit() {
      const t = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.58)))
      exit.forEach(({ el, at, span, shift }) => {
        if (t <= 0) {
          el.style.transition = ''
          el.style.opacity = ''
          el.style.transform = ''
          el.style.pointerEvents = ''
          return
        }
        const a = 1 - smoothstep(at, at + span, t)
        el.style.transition = 'none'
        el.style.opacity = a.toFixed(3)
        if (shift) el.style.transform = `translate3d(0, ${((1 - a) * 15).toFixed(1)}px, 0)`
        el.style.pointerEvents = a < 0.05 ? 'none' : ''
      })
    }

    window.addEventListener('scroll', applyExit, { passive: true })
    window.addEventListener('resize', applyExit, { passive: true })
    applyExit()

    return () => {
      observer.disconnect()
      timers.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('scroll', applyExit)
      window.removeEventListener('resize', applyExit)
      delete document.documentElement.dataset.reveal
    }
  }, [])

  return null
}
