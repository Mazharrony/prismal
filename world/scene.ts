import * as THREE from 'three'
import { createTowers } from './towers'
import { createGrid } from './grid'
import type { WorldSample } from './chapters'

/* Scene orchestration: renderer, camera, atmosphere, lights, content.
 *
 * Palette is read from the CSS custom properties in styles/tokens.css, so
 * swapping the accent when the Prismal wordmark lands reskins the site *and*
 * this world from the same two lines.
 *
 * Renders on demand — the conductor drives update(), and a settled page issues
 * no frames at all. Nothing here animates on its own.
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
  const ground = cssColor('--ink-000', '#080706')
  const line = cssColor('--ink-400', '#38322c')

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !lowPower,
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setClearColor(ground, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const scene = new THREE.Scene()
  const fog = new THREE.FogExp2(ground.getHex(), 0.0075)
  scene.fog = fog

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 600)
  const target = new THREE.Vector3()

  // Cool ambient against warm practicals — the warmth comes from the windows,
  // never from bloom.
  const hemi = new THREE.HemisphereLight(0x2a3340, 0x050404, 0.5)
  scene.add(hemi)

  const key = new THREE.DirectionalLight(0xbfd0e0, 0.5)
  key.position.set(-40, 70, 30)
  scene.add(key)


  /* Horizon backdrop. Without this every tower is near-black on near-black and
   * the skyline has no silhouette. Excluded from fog so it stays a clean
   * gradient rather than being flattened into the haze. */
  const skyGeometry = new THREE.SphereGeometry(320, 32, 16)
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color('#050605') },
      uHorizon: { value: new THREE.Color('#191410') },
      uAccent: { value: accent },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uAccent;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y;
        vec3 c = mix(uHorizon, uTop, smoothstep(-0.12, 0.5, h));
        // A restrained warm band at the horizon — city glow, not a sunset.
        c += uAccent * (1.0 - smoothstep(0.0, 0.16, abs(h))) * 0.07;
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  })
  const sky = new THREE.Mesh(skyGeometry, skyMaterial)
  sky.frustumCulled = false
  scene.add(sky)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: ground, roughness: 1, metalness: 0 }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -0.05
  scene.add(floor)

  const grid = createGrid(accent, line)
  scene.add(grid.mesh)

  // Fewer, chunkier towers on mobile: reduced geometry, not a downscaled scene.
  const towers = createTowers({ count: mobile ? 70 : 130, accent, line })
  scene.add(towers.group)

  function update(sample: WorldSample) {
    camera.position.set(sample.position[0], sample.position[1], sample.position[2])
    target.set(sample.target[0], sample.target[1], sample.target[2])
    camera.lookAt(target)
    if (camera.fov !== sample.fov) {
      camera.fov = sample.fov
      camera.updateProjectionMatrix()
    }

    fog.density = sample.fog
    hemi.intensity = 0.28 + sample.key * 0.5
    key.intensity = 0.2 + sample.key * 0.7

    towers.setBuild(sample.build)
    towers.setPracticals(sample.practicals)
    grid.setEnergy(sample.gridEnergy)

    renderer.render(scene, camera)
  }

  function resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 2))
    renderer.setSize(width, height, false)
    renderer.render(scene, camera)
  }

  function dispose() {
    towers.dispose()
    grid.dispose()
    skyGeometry.dispose()
    skyMaterial.dispose()
    floor.geometry.dispose()
    ;(floor.material as THREE.Material).dispose()
    renderer.dispose()
  }

  return { update, resize, dispose }
}
