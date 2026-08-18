import * as THREE from 'three'

/* Procedural tower massing — architecture from parameters, not mesh files.
 *
 * Rendered as hairline wireframe over a near-black solid fill: the fill supplies
 * silhouette and occlusion, the lines supply the technical read. This is the
 * "architectural, not atmospheric" rule — the world is structure drawn in light,
 * never a particle field or a glowing orb.
 *
 * Draw call budget: 3 total (fill, edges, windows) regardless of tower count.
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

export type TowerField = {
  group: THREE.Group
  setBuild: (value: number) => void
  setPracticals: (value: number) => void
  dispose: () => void
}

type Params = { count: number; accent: THREE.Color; line: THREE.Color }

export function createTowers({ count, accent, line }: Params): TowerField {
  const random = mulberry32(20260818)
  const group = new THREE.Group()

  type Block = { x: number; z: number; w: number; d: number; h: number }
  const blocks: Block[] = []

  // Lay out on a loose radial grid, denser and taller toward the centre.
  for (let i = 0; i < count; i += 1) {
    const angle = random() * Math.PI * 2
    const radius = 8 + Math.pow(random(), 0.65) * 76
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const falloff = 1 - Math.min(1, radius / 88)
    const h = 4 + Math.pow(random(), 1.8) * 54 * (0.35 + falloff * 0.9)
    const w = 3 + random() * 5
    const d = 3 + random() * 5
    blocks.push({ x, z, w, d, h })
  }

  /* ---- solid fill: one InstancedMesh ---- */
  const box = new THREE.BoxGeometry(1, 1, 1)
  const fillMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0d0c0b'),
    roughness: 0.92,
    metalness: 0.04,
  })
  const fill = new THREE.InstancedMesh(box, fillMaterial, blocks.length)
  fill.frustumCulled = false
  group.add(fill)

  const dummy = new THREE.Object3D()
  const applyBuild = (build: number) => {
    for (let i = 0; i < blocks.length; i += 1) {
      const b = blocks[i]
      const h = Math.max(0.001, b.h * build)
      dummy.position.set(b.x, h / 2, b.z)
      dummy.scale.set(b.w, h, b.d)
      dummy.updateMatrix()
      fill.setMatrixAt(i, dummy.matrix)
    }
    fill.instanceMatrix.needsUpdate = true
  }

  /* ---- edges: one merged LineSegments, height driven in the vertex shader ---- */
  const positions: number[] = []
  const localY: number[] = []

  const pushEdge = (
    ax: number, ay: number, az: number,
    bx: number, by: number, bz: number,
  ) => {
    positions.push(ax, ay, az, bx, by, bz)
    localY.push(ay, by)
  }

  for (const b of blocks) {
    const hw = b.w / 2
    const hd = b.d / 2
    const corners: [number, number][] = [
      [b.x - hw, b.z - hd],
      [b.x + hw, b.z - hd],
      [b.x + hw, b.z + hd],
      [b.x - hw, b.z + hd],
    ]
    for (let i = 0; i < 4; i += 1) {
      const [cx, cz] = corners[i]
      const [nx, nz] = corners[(i + 1) % 4]
      pushEdge(cx, 0, cz, cx, b.h, cz) // vertical
      pushEdge(cx, b.h, cz, nx, b.h, nz) // roof
      pushEdge(cx, 0, cz, nx, 0, nz) // base
    }
  }

  const edgeGeometry = new THREE.BufferGeometry()
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  edgeGeometry.setAttribute('aLocalY', new THREE.Float32BufferAttribute(localY, 1))

  const edgeMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uBuild: { value: 0 },
      uColor: { value: line },
      uAccent: { value: accent },
      uOpacity: { value: 0.82 },
    },
    vertexShader: `
      attribute float aLocalY;
      uniform float uBuild;
      varying float vHeight;
      void main() {
        vec3 p = position;
        p.y = aLocalY * uBuild;
        vHeight = aLocalY;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 uAccent;
      uniform float uOpacity;
      varying float vHeight;
      void main() {
        // Warm the tops slightly so the skyline reads as lit, not drawn.
        float warm = smoothstep(4.0, 44.0, vHeight);
        // Lift the base line off the ground colour, then warm the tops.
        vec3 base = mix(uColor, vec3(0.62, 0.58, 0.53), 0.42);
        vec3 c = mix(base, uAccent, warm * 0.55);
        gl_FragColor = vec4(c, uOpacity);
      }
    `,
  })

  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
  edges.frustumCulled = false
  group.add(edges)

  /* ---- practical windows: one Points cloud, the source of warmth ---- */
  const windowPositions: number[] = []
  const windowLocalY: number[] = []
  for (const b of blocks) {
    const rows = Math.max(1, Math.floor(b.h / 3.2))
    for (let r = 0; r < rows; r += 1) {
      if (random() > 0.45) continue
      const y = 2 + r * 3.2
      if (y > b.h - 1) continue
      const side = Math.floor(random() * 4)
      const t = 0.2 + random() * 0.6
      const hw = b.w / 2
      const hd = b.d / 2
      let px = b.x
      let pz = b.z
      if (side === 0) { px = b.x - hw + b.w * t; pz = b.z - hd }
      else if (side === 1) { px = b.x + hw; pz = b.z - hd + b.d * t }
      else if (side === 2) { px = b.x - hw + b.w * t; pz = b.z + hd }
      else { px = b.x - hw; pz = b.z - hd + b.d * t }
      windowPositions.push(px, y, pz)
      windowLocalY.push(y)
    }
  }

  const windowGeometry = new THREE.BufferGeometry()
  windowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(windowPositions, 3))
  windowGeometry.setAttribute('aLocalY', new THREE.Float32BufferAttribute(windowLocalY, 1))

  const windowMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uBuild: { value: 0 },
      uPracticals: { value: 0 },
      uAccent: { value: accent },
      uSize: { value: 3.4 },
    },
    vertexShader: `
      attribute float aLocalY;
      uniform float uBuild;
      uniform float uSize;
      varying float vFade;
      void main() {
        vec3 p = position;
        p.y = aLocalY * uBuild;
        // Windows fade in once the massing is meaningfully assembled.
        vFade = smoothstep(0.15, 0.55, uBuild);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uAccent;
      uniform float uPracticals;
      varying float vFade;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float mask = smoothstep(0.5, 0.05, length(d));
        gl_FragColor = vec4(uAccent, mask * uPracticals * vFade * 0.9);
      }
    `,
  })

  const windows = new THREE.Points(windowGeometry, windowMaterial)
  windows.frustumCulled = false
  group.add(windows)

  applyBuild(0)

  return {
    group,
    setBuild(value) {
      applyBuild(value)
      edgeMaterial.uniforms.uBuild.value = value
      windowMaterial.uniforms.uBuild.value = value
    },
    setPracticals(value) {
      windowMaterial.uniforms.uPracticals.value = value
    },
    dispose() {
      box.dispose()
      fillMaterial.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
      windowGeometry.dispose()
      windowMaterial.dispose()
    },
  }
}
