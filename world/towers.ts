import * as THREE from 'three'
import { HASH } from './glsl'

/* Procedural tower massing — architecture from parameters, not mesh files.
 *
 * Every tower is a stack of setback segments with a crown on top, clad in a
 * glass material whose window grid is stamped in the fragment shader. The
 * windows are the point: a facade is what makes a box read as a building, and
 * the previous version's additive point cloud only ever read as orange specks
 * floating near the massing.
 *
 * Draw calls: 4 (segments, crowns, spires, beacons) regardless of tower count.
 *
 * NOTE: the facade shader hooks into MeshStandardMaterial via onBeforeCompile.
 * The injection points below (`#include <common>`, `<begin_vertex>`,
 * `<map_fragment>`, `<emissivemap_fragment>`) are correct for three r171, which
 * package.json pins. A three upgrade can move them without any build error —
 * the symptom is a silently unlit city.
 */

/** Deterministic PRNG — the skyline must be identical on every render. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Four districts, distinguished by the colour temperature of what is switched
 * on inside them and the tint of the curtain wall. This is where the colour in
 * the frame comes from: light temperature and glass, never a grade pass. */
const DISTRICTS = [
  { glass: '#0b1119', lamp: '#ffdcb0', lit: 0.50 }, // corporate core — cool offices
  { glass: '#150f0a', lamp: '#ffab5e', lit: 0.42 }, // hotels — tungsten, bronze glass
  { glass: '#07161b', lamp: '#ffc98a', lit: 0.46 }, // marina — teal curtain wall
  { glass: '#170b16', lamp: '#ff9ec4', lit: 0.36 }, // signage strip — one pink note
]

export type TowerField = {
  group: THREE.Group
  setBuild: (value: number) => void
  setPracticals: (value: number) => void
  dispose: () => void
}

type Params = { count: number; mobile: boolean }

type Segment = {
  x: number
  z: number
  w: number
  d: number
  base: number
  h: number
  seed: number
  district: number
}

type Crown = { x: number; z: number; w: number; d: number; base: number; h: number }

export function createTowers({ count, mobile }: Params): TowerField {
  const random = mulberry32(20260818)
  const group = new THREE.Group()

  const segments: Segment[] = []
  const pyramids: Crown[] = []
  const spires: Crown[] = []
  const beaconTops: number[] = []

  // Height splits per segment count. Lower masses read heavier, which is what
  // a setback tower actually does.
  const WEIGHTS: number[][] = [[1], [0.64, 0.36], [0.52, 0.31, 0.17]]

  for (let i = 0; i < count; i += 1) {
    const angle = random() * Math.PI * 2
    const radius = 8 + Math.pow(random(), 0.65) * 76
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const falloff = 1 - Math.min(1, radius / 88)

    let total = 4 + Math.pow(random(), 1.8) * 54 * (0.35 + falloff * 0.9)
    // A handful of supertalls. A skyline with a uniform ceiling reads as a bar
    // chart; the outliers are what give it a profile.
    if (random() < 0.07) total *= 1.75

    // Rectangular, not square — slab towers rather than posts.
    const w = 2.4 + random() * 4.8
    const d = w * (0.55 + random() * 0.9)

    // Districts follow sectors, with enough jitter that the boundaries are not
    // visible as hard wedges.
    const sector = Math.floor(((angle / (Math.PI * 2)) * 4 + random() * 0.6) % 4)
    const district = Math.max(0, Math.min(3, sector))
    const seed = random() * 1000

    const segCount = total > 34 ? 3 : total > 16 ? 2 : 1
    const weights = WEIGHTS[segCount - 1]

    let base = 0
    let cw = w
    let cd = d
    for (let s = 0; s < segCount; s += 1) {
      const h = total * weights[s]
      segments.push({ x, z, w: cw, d: cd, base, h, seed, district })
      base += h
      const setback = 0.70 + random() * 0.16
      cw *= setback
      cd *= setback
    }

    // Crowns, on anything tall enough to carry one.
    if (total > 22) {
      const kind = random()
      if (kind < 0.34) {
        pyramids.push({ x, z, w: cw / (0.70 + 0.16), d: cd / (0.70 + 0.16), base, h: 2 + random() * 5 })
      } else if (kind < 0.60) {
        const spireH = 4 + random() * 14
        spires.push({ x, z, w: 0.9 + random() * 0.9, d: 0.9, base, h: spireH })
        beaconTops.push(x, base + spireH, z)
      } else if (kind < 0.78) {
        // A stepped cap: one more short, tight segment.
        segments.push({ x, z, w: cw * 0.66, d: cd * 0.66, base, h: 1.5 + random() * 3, seed, district })
      }
      if (total > 40 && random() < 0.5) beaconTops.push(x, base, z)
    }
  }

  const uBuild = { value: 0 }
  const uPracticals = { value: 0 }

  /* ---- facade material ---- */

  const facadeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // per-instance glass tint replaces this in the shader
    roughness: 0.22,
    metalness: 0.78,
    envMapIntensity: 1.7,
  })

  facadeMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uBuild = uBuild
    shader.uniforms.uPracticals = uPracticals
    // Window pitch in world units: a ~3.6m bay and a ~4m floor at this scale.
    shader.uniforms.uWin = { value: new THREE.Vector2(0.46, 0.52) }
    shader.uniforms.uCool = { value: new THREE.Color('#cfe4ff') }
    // Windows must clear the bloom threshold to glow; the material's own
    // emissive would otherwise sit below it and read as flat paint.
    shader.uniforms.uWindowIntensity = { value: 1.45 }

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        attribute vec3 aSize;
        attribute vec2 aCentre;
        attribute float aBase;
        attribute float aSeed;
        attribute float aLit;
        attribute vec3 aLamp;
        attribute vec3 aGlass;
        uniform float uBuild;
        varying vec2 vFacadeUv;
        varying float vFace;
        varying float vSeed;
        varying float vLit;
        varying vec3 vLamp;
        varying vec3 vGlass;
        `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `#include <begin_vertex>
        /* Facade coordinates are resolved here, in world units, so the window
         * grid is continuous across a tower's setbacks and consistent city-wide
         * — and so the fragment stage carries two floats instead of nine.
         *
         * The box geometry is translated to put its origin at the base, so
         * position.y runs 0..1 while x and z run -0.5..0.5. */
        vec3 an = abs(normal);
        vFace = an.y > 0.5 ? 2.0 : (an.x > 0.5 ? 0.0 : 1.0);
        float along = an.x > 0.5
          ? position.z * aSize.z + aCentre.y
          : position.x * aSize.x + aCentre.x;
        /* Scaling height by uBuild keeps floors a constant physical size while
         * the tower grows, so the city gains storeys as it assembles instead of
         * squashing a fixed grid. */
        vFacadeUv = vec2(along, (position.y * aSize.y + aBase) * uBuild);
        vSeed = aSeed;
        vLit = aLit;
        vLamp = aLamp;
        vGlass = aGlass;
        `,
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        ${HASH}
        uniform vec2 uWin;
        uniform vec3 uCool;
        uniform float uPracticals;
        uniform float uWindowIntensity;
        varying vec2 vFacadeUv;
        varying float vFace;
        varying float vSeed;
        varying float vLit;
        varying vec3 vLamp;
        varying vec3 vGlass;
        vec3 gWindow;
        `,
      )
      .replace(
        '#include <map_fragment>',
        /* glsl */ `#include <map_fragment>
        gWindow = vec3(0.0);
        if (vFace > 1.5) {
          // Roof deck: plant, gravel, nothing lit.
          diffuseColor.rgb = vGlass * 0.5 + vec3(0.022);
        } else {
          vec2 cell = vFacadeUv / uWin;
          vec2 g = fwidth(cell);
          vec2 id = floor(cell);
          vec2 f = fract(cell);

          // Mullions, widened by the screen-space derivative so the grid stays
          // smooth instead of shimmering as the camera pulls back.
          vec2 e = clamp(g, 0.002, 0.5);
          float bw = 0.24;
          float mx = smoothstep(bw - e.x, bw + e.x, f.x) * smoothstep(bw - e.x, bw + e.x, 1.0 - f.x);
          float my = smoothstep(bw - e.y, bw + e.y, f.y) * smoothstep(bw - e.y, bw + e.y, 1.0 - f.y);
          float pane = mx * my;

          // Whole floors go dark together more often than single panes do.
          float paneHash = hash21(id + vSeed);
          float floorHash = hash21(vec2(id.y, vSeed * 3.7));
          float on = step(1.0 - vLit, mix(paneHash, floorHash, 0.52));
          float level = 0.34 + 0.52 * hash21(id + vSeed + 7.3);

          float temp = hash21(id + vSeed + 19.7);
          vec3 lamp = mix(vLamp, uCool, smoothstep(0.60, 0.92, temp));

          /* Once a cell is smaller than a pixel the grid aliases into static.
           * Dissolve it into the average lit value instead — this is mip
           * selection done by hand, and it is the difference between a city and
           * a field of noise at the far end of the skyline. */
          float detail = 1.0 - smoothstep(0.35, 1.0, max(g.x, g.y));
          vec3 lampAvg = mix(vLamp, uCool, 0.25);

          gWindow = mix(lampAvg * vLit * 0.5, lamp * pane * on * level, detail);
          /* Mullions are a lighter alloy than the glass, so the grid stays legible
           * across the unlit half of a tower. A facade of black holes with a few
           * lit squares in it reads as scattered dots, not as a building. */
          vec3 mullion = vec3(0.052, 0.056, 0.066);
          diffuseColor.rgb = mix(mullion, vGlass, pane * detail);
          // Street level sees less sky, so the glass darkens toward the base.
          diffuseColor.rgb *= 0.70 + 0.30 * smoothstep(0.0, 42.0, vFacadeUv.y);
        }
        `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        totalEmissiveRadiance += gWindow * uPracticals * uWindowIntensity;
        `,
      )
  }

  /* ---- segments: one InstancedMesh ---- */

  const box = new THREE.BoxGeometry(1, 1, 1)
  box.translate(0, 0.5, 0) // origin at the base makes build scaling trivial

  const fill = new THREE.InstancedMesh(box, facadeMaterial, segments.length)
  fill.frustumCulled = false

  const aSize = new Float32Array(segments.length * 3)
  const aCentre = new Float32Array(segments.length * 2)
  const aBase = new Float32Array(segments.length)
  const aSeed = new Float32Array(segments.length)
  const aLit = new Float32Array(segments.length)
  const aLamp = new Float32Array(segments.length * 3)
  const aGlass = new Float32Array(segments.length * 3)

  const lampColor = new THREE.Color()
  const glassColor = new THREE.Color()

  segments.forEach((s, i) => {
    const district = DISTRICTS[s.district]
    aSize[i * 3 + 0] = s.w
    aSize[i * 3 + 1] = s.h
    aSize[i * 3 + 2] = s.d
    aCentre[i * 2 + 0] = s.x
    aCentre[i * 2 + 1] = s.z
    aBase[i] = s.base
    aSeed[i] = s.seed
    // Occupancy varies building to building, not just district to district.
    aLit[i] = district.lit * (0.6 + random() * 0.75)

    lampColor.set(district.lamp)
    aLamp[i * 3 + 0] = lampColor.r
    aLamp[i * 3 + 1] = lampColor.g
    aLamp[i * 3 + 2] = lampColor.b

    glassColor.set(district.glass)
    aGlass[i * 3 + 0] = glassColor.r
    aGlass[i * 3 + 1] = glassColor.g
    aGlass[i * 3 + 2] = glassColor.b
  })

  fill.geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(aSize, 3))
  fill.geometry.setAttribute('aCentre', new THREE.InstancedBufferAttribute(aCentre, 2))
  fill.geometry.setAttribute('aBase', new THREE.InstancedBufferAttribute(aBase, 1))
  fill.geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(aSeed, 1))
  fill.geometry.setAttribute('aLit', new THREE.InstancedBufferAttribute(aLit, 1))
  fill.geometry.setAttribute('aLamp', new THREE.InstancedBufferAttribute(aLamp, 3))
  fill.geometry.setAttribute('aGlass', new THREE.InstancedBufferAttribute(aGlass, 3))
  group.add(fill)

  /* ---- crowns ----
   *
   * Dark anodised metal rather than glass: crowns are plant and structure, and
   * giving them the facade shader would put office windows in a spire.
   */
  const crownMaterial = new THREE.MeshStandardMaterial({
    color: 0x14161c,
    roughness: 0.34,
    metalness: 0.85,
    envMapIntensity: 1.0,
  })

  // A 4-sided cylinder is a pyramid; rotating it 45° and scaling by root 2
  // squares the base off to exactly 1x1, so instance scale is just (w, h, d).
  const pyramidGeometry = new THREE.CylinderGeometry(0.09, 0.5, 1, 4)
  pyramidGeometry.rotateY(Math.PI / 4)
  pyramidGeometry.scale(Math.SQRT2, 1, Math.SQRT2)
  pyramidGeometry.translate(0, 0.5, 0)

  const pyramidMesh = new THREE.InstancedMesh(pyramidGeometry, crownMaterial, Math.max(1, pyramids.length))
  pyramidMesh.frustumCulled = false
  pyramidMesh.count = pyramids.length
  group.add(pyramidMesh)

  const spireGeometry = new THREE.CylinderGeometry(0.02, 0.06, 1, mobile ? 5 : 8)
  spireGeometry.translate(0, 0.5, 0)

  const spireMesh = new THREE.InstancedMesh(spireGeometry, crownMaterial, Math.max(1, spires.length))
  spireMesh.frustumCulled = false
  spireMesh.count = spires.length
  group.add(spireMesh)

  /* ---- aviation beacons ----
   *
   * Red, small, and on the tall structures only. They cost one draw call and do
   * more for "this is a real skyline at night" than any amount of extra massing.
   */
  const beaconGeometry = new THREE.BufferGeometry()
  const beaconPositions = new Float32Array(beaconTops)
  const beaconY = new Float32Array(beaconTops.length / 3)
  for (let i = 0; i < beaconY.length; i += 1) beaconY[i] = beaconTops[i * 3 + 1]
  beaconGeometry.setAttribute('position', new THREE.BufferAttribute(beaconPositions, 3))
  beaconGeometry.setAttribute('aTopY', new THREE.BufferAttribute(beaconY, 1))

  const beaconMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uBuild,
      uPracticals,
      uColor: { value: new THREE.Color('#ff4436') },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aTopY;
      uniform float uBuild;
      uniform float uPixelRatio;
      void main() {
        vec3 p = position;
        p.y = aTopY * uBuild;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uPixelRatio * 90.0 / max(-mv.z, 1.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uPracticals;
      void main() {
        float r = length(gl_PointCoord - 0.5);
        float core = smoothstep(0.5, 0.0, r);
        gl_FragColor = vec4(uColor, core * core * uPracticals);
      }
    `,
  })

  const beacons = new THREE.Points(beaconGeometry, beaconMaterial)
  beacons.frustumCulled = false
  group.add(beacons)

  /* ---- build ---- */

  const dummy = new THREE.Object3D()

  const place = (mesh: THREE.InstancedMesh, items: { x: number; z: number; w: number; d: number; base: number; h: number }[], build: number) => {
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      dummy.position.set(item.x, item.base * build, item.z)
      dummy.scale.set(item.w, Math.max(0.001, item.h * build), item.d)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }

  const applyBuild = (build: number) => {
    place(fill, segments, build)
    place(pyramidMesh, pyramids, build)
    place(spireMesh, spires, build)
  }

  applyBuild(0)

  return {
    group,
    setBuild(value) {
      applyBuild(value)
      uBuild.value = value
    },
    setPracticals(value) {
      uPracticals.value = value
    },
    dispose() {
      box.dispose()
      facadeMaterial.dispose()
      pyramidGeometry.dispose()
      spireGeometry.dispose()
      crownMaterial.dispose()
      beaconGeometry.dispose()
      beaconMaterial.dispose()
    },
  }
}
