/* The scene ledger.
 *
 * The full camera and world contract lives here as data — not as thresholds
 * scattered through CSS and the render loop. Chapter indices match the
 * `data-cam` attributes on the server-rendered sections in app/page.tsx.
 *
 * The journey mirrors the sales argument: arrive at the city, see the proof,
 * then climb the ladder — build it, run it without you, make it decide.
 */

export type Vec3 = [number, number, number]

export type Chapter = {
  id: string
  /** Matches data-cam in the DOM */
  cam: number
  camera: {
    position: Vec3
    target: Vec3
    fov: number
    /** Coarse-pointer overrides: pull back and widen so the subject still reads */
    mobile?: { position?: Vec3; target?: Vec3; fov?: number }
  }
  world: {
    /** Key light intensity */
    key: number
    /** Warm practical windows/beacons — where the warmth comes from */
    practicals: number
    /** Exponential fog density */
    fog: number
    /** 0 = bare ground plane, 1 = fully assembled massing */
    build: number
    /** Energy travelling the connective grid */
    gridEnergy: number
  }
}

export const chapters: Chapter[] = [
  {
    id: 'threshold',
    cam: 0,
    camera: {
      position: [0, 14, 92],
      target: [0, 20, 0],
      fov: 38,
      mobile: { position: [0, 16, 128], fov: 50 },
    },
    world: { key: 0.35, practicals: 0.55, fog: 0.0075, build: 0.18, gridEnergy: 0.05 },
  },
  {
    id: 'proof',
    cam: 1,
    camera: {
      position: [-26, 30, 74],
      target: [0, 24, 0],
      fov: 40,
      mobile: { position: [-14, 32, 108], fov: 52 },
    },
    world: { key: 0.5, practicals: 0.5, fog: 0.009, build: 0.3, gridEnergy: 0.1 },
  },
  {
    id: 'ship',
    cam: 2,
    camera: {
      position: [-34, 12, 46],
      target: [-6, 26, -6],
      fov: 42,
      mobile: { position: [-20, 16, 74], fov: 54 },
    },
    world: { key: 0.7, practicals: 0.75, fog: 0.011, build: 0.62, gridEnergy: 0.2 },
  },
  {
    id: 'automate',
    cam: 3,
    camera: {
      position: [30, 9, 34],
      target: [-2, 18, -14],
      fov: 44,
      mobile: { position: [22, 14, 62], fov: 56 },
    },
    world: { key: 0.62, practicals: 0.9, fog: 0.013, build: 0.84, gridEnergy: 0.72 },
  },
  {
    id: 'decide',
    cam: 4,
    camera: {
      position: [8, 46, 40],
      target: [0, 16, -18],
      fov: 40,
      mobile: { position: [6, 52, 70], fov: 52 },
    },
    world: { key: 0.8, practicals: 1, fog: 0.0095, build: 1, gridEnergy: 1 },
  },
  {
    id: 'work',
    cam: 5,
    camera: {
      position: [0, 62, 96],
      target: [0, 14, -10],
      fov: 36,
      mobile: { position: [0, 66, 140], fov: 48 },
    },
    world: { key: 0.55, practicals: 0.7, fog: 0.008, build: 1, gridEnergy: 0.45 },
  },
  {
    id: 'close',
    cam: 6,
    camera: {
      position: [0, 18, 108],
      target: [0, 22, 0],
      fov: 38,
      mobile: { position: [0, 20, 146], fov: 50 },
    },
    world: { key: 0.3, practicals: 0.45, fog: 0.007, build: 1, gridEnergy: 0.15 },
  },
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpVec = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
]

/** Resolve a chapter's camera for the current device. */
export function cameraFor(chapter: Chapter, mobile: boolean) {
  const { position, target, fov, mobile: m } = chapter.camera
  return {
    position: (mobile && m?.position) || position,
    target: (mobile && m?.target) || target,
    fov: (mobile && m?.fov) || fov,
  }
}

/** Interpolate the full world contract at fractional chapter progress. */
export function sampleWorld(progress: number, mobile: boolean) {
  const last = chapters.length - 1
  const index = Math.min(last, Math.max(0, Math.floor(progress)))
  const next = Math.min(last, index + 1)
  const t = next === index ? 0 : Math.min(1, Math.max(0, progress - index))

  const a = chapters[index]
  const b = chapters[next]
  const ca = cameraFor(a, mobile)
  const cb = cameraFor(b, mobile)

  return {
    position: lerpVec(ca.position, cb.position, t),
    target: lerpVec(ca.target, cb.target, t),
    fov: lerp(ca.fov, cb.fov, t),
    key: lerp(a.world.key, b.world.key, t),
    practicals: lerp(a.world.practicals, b.world.practicals, t),
    fog: lerp(a.world.fog, b.world.fog, t),
    build: lerp(a.world.build, b.world.build, t),
    gridEnergy: lerp(a.world.gridEnergy, b.world.gridEnergy, t),
  }
}

export type WorldSample = ReturnType<typeof sampleWorld>
