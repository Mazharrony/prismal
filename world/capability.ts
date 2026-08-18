/* Gate the world behind real capability checks.
 *
 * Every negative answer here has a designed fallback: the server-rendered DOM
 * is already complete and readable on its own. The world is an enhancement,
 * never a requirement.
 */

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}

/** Probe for a usable WebGL context without leaking one. */
export function supportsWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    // Release immediately — probing should not hold a context.
    const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')
    lose?.loseContext()
    return true
  } catch {
    return false
  }
}

/** Devices too weak for the full scene still get a reduced build, not a broken one. */
export function isLowPower() {
  if (typeof navigator === 'undefined') return false
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  return cores <= 4 || memory <= 4
}

export function shouldRenderWorld() {
  return supportsWebGL() && !prefersReducedMotion()
}
