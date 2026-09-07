import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { createTowers } from './towers'
import { createGrid } from './grid'
import { createSky } from './sky'
import { createMoon } from './moon'
import type { WorldSample } from './chapters'

/* Scene orchestration: renderer, camera, atmosphere, lights, content.
 *
 * A Dubai skyline at blue hour. The accent is read from the CSS custom
 * properties in styles/tokens.css, so swapping it when the Prismal wordmark
 * lands reskins the site *and* the city glow in this world from the same line.
 *
 * Renders on demand — the conductor drives update(), and a settled page issues
 * no frames at all. Nothing here animates on its own, which is why there is no
 * clock and no time uniform anywhere in world/.
 */

type Options = { canvas: HTMLCanvasElement; mobile: boolean; lowPower: boolean }

export type Scene = {
  update: (sample: WorldSample) => void
  resize: () => void
  dispose: () => void
}

function cssColor(name: string, fallback: string) {
  if (typeof window === 'undefined') return new THREE.Color(fallback)
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  try {
    return new THREE.Color(value || fallback)
  } catch {
    return new THREE.Color(fallback)
  }
}

export function createScene({ canvas, mobile, lowPower }: Options): Scene {
  const accent = cssColor('--accent', '#e9a04a')

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lowPower,
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  // Held below 1 on purpose: the facades now emit, and ACES will otherwise roll
  // the warm windows off toward cream before the highlights have anywhere to go.
  renderer.toneMappingExposure = 0.78

  const scene = new THREE.Scene()

  /* Haze, matched to the sky's horizon rather than to the ground colour.
   *
   * This is the single highest-leverage value in the file. Fogging distant
   * towers toward near-black gives depth by subtraction and the skyline dies in
   * a void; fogging them toward the lit horizon is what a city at night
   * actually does, and the far towers separate into layers on their own. */
  const hazeColor = new THREE.Color('#1b1a24')
  const fog = new THREE.FogExp2(hazeColor.getHex(), 0.0075)
  scene.fog = fog
  renderer.setClearColor(hazeColor, 1)

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 900)
  const target = new THREE.Vector3()

  /* ---- atmosphere ---- */

  const sky = createSky({ renderer, mobile, lowPower, accent })
  scene.add(sky.group)
  if (sky.environment) scene.environment = sky.environment

  const moon = createMoon({ mobile })
  scene.add(moon.group)

  /* ---- light ----
   *
   * Keyed off the moon vector, so the frame is lit by the object you can see in
   * it. The previous version lit from the upper left while the moon hung on the
   * right; nobody can name that error but everybody registers it. */
  const hemi = new THREE.HemisphereLight(0x1b2740, 0x0a0705, 0.5)
  scene.add(hemi)

  const key = new THREE.DirectionalLight(0xcfd9ff, 0.5)
  key.position.copy(moon.direction).multiplyScalar(200)
  scene.add(key)

  /* Warm bounce off the streets. The city lights the underside of everything
   * above them, and without this the tower bases go flat black. */
  const bounce = new THREE.DirectionalLight(accent.clone().lerp(new THREE.Color('#ffffff'), 0.2), 0.28)
  bounce.position.set(-30, -40, 20)
  scene.add(bounce)

  /* ---- ground ----
   *
   * Wet asphalt: metal enough to mirror the sky and the moon out of the baked
   * environment, rough enough that the reflection is a smear rather than a
   * second skyline. Buys most of what a Reflector would, for no second pass. */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 900),
    new THREE.MeshStandardMaterial({
      color: 0x0a0a0e,
      roughness: 0.38,
      metalness: 0.88,
      envMapIntensity: 0.7,
    }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -0.05
  scene.add(floor)

  const grid = createGrid(accent)
  scene.add(grid.mesh)

  // Fewer, chunkier towers on mobile: reduced geometry, not a downscaled scene.
  const towers = createTowers({ count: mobile ? 70 : 130, mobile })
  scene.add(towers.group)

  /* Bloom, and only bloom.
   *
   * The lit windows are the one thing in this scene that is supposed to be
   * emitting; the facade shader pushes them past the threshold deliberately so
   * the glow comes from the pass rather than from painted halos. The threshold
   * is what keeps the street grid and the sky gradient out of it.
   *
   * Grain and vignette are deliberately not here: they are flat, resolution-
   * independent passes that the Atmosphere component already lays over the
   * whole page, so running them again per-pixel would draw the same thing twice.
   */
  const composer = lowPower ? null : new EffectComposer(renderer)
  if (composer) {
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.26, // strength — a lift, not a halo
        0.62, // radius
        0.80, // threshold — above the sky and the streets, below the windows
      ),
    )
    // Tone mapping and the sRGB conversion happen here rather than in the
    // materials, because the intermediate targets are linear.
    composer.addPass(new OutputPass())
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const draw = () => (composer ? composer.render() : renderer.render(scene, camera))

  function update(sample: WorldSample) {
    camera.position.set(sample.position[0], sample.position[1], sample.position[2])
    target.set(sample.target[0], sample.target[1], sample.target[2])
    camera.lookAt(target)
    if (camera.fov !== sample.fov) {
      camera.fov = sample.fov
      camera.updateProjectionMatrix()
    }

    // The sky and the moon travel with the camera, so the horizon never slides
    // out from under a skyline that is only 110 units across.
    sky.group.position.copy(camera.position).setY(0)
    moon.group.position.copy(camera.position).setY(0)
    moon.faceCamera(camera)

    fog.density = sample.fog
    hemi.intensity = 0.42 + sample.key * 0.50
    key.intensity = 0.25 + sample.key * 0.85
    bounce.intensity = 0.12 + sample.practicals * 0.30

    towers.setBuild(sample.build)
    towers.setPracticals(sample.practicals)
    grid.setEnergy(sample.gridEnergy)

    draw()
  }

  function resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 2))
    renderer.setSize(width, height, false)
    composer?.setSize(width, height)
    composer?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    draw()
  }

  function dispose() {
    towers.dispose()
    grid.dispose()
    sky.dispose()
    moon.dispose()
    floor.geometry.dispose()
    ;(floor.material as THREE.Material).dispose()
    composer?.dispose()
    renderer.dispose()
  }

  return { update, resize, dispose }
}
