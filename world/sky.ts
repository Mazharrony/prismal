import * as THREE from 'three'
import { HASH, NOISE } from './glsl'
import { MOON_DIRECTION, MOON_POSITION, MOON_RADIUS } from './moon'

/* Atmosphere.
 *
 * Not three's `Sky`: Preetham/Hosek is a daytime scattering model, and pushing
 * its sun below the horizon clamps the whole dome into mud. This is a night
 * model built from the four things that actually describe a city sky after
 * sunset — a vertical scattering gradient, ground-lit haze at the horizon, a
 * Mie lobe around the moon, and cloud.
 *
 * The cloud layer lives inside the dome's own fragment shader rather than on
 * billboards, so it costs nothing extra to draw. Stars are the only separate
 * pass, because points need to stay crisp.
 *
 * Draw calls: 2. Plus one PMREM bake at init, which is what gives the towers
 * something to reflect.
 */

export type Sky = {
  group: THREE.Group
  /** PMREM-filtered dome, for `scene.environment`. Null on the reduced tier. */
  environment: THREE.Texture | null
  dispose: () => void
}

type Params = {
  renderer: THREE.WebGLRenderer
  mobile: boolean
  lowPower: boolean
  accent: THREE.Color
}

const SKY_RADIUS = 480
const STAR_RADIUS = 430

/** Deterministic PRNG — the star field must be identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createDomeMaterial(accent: THREE.Color) {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      // Blue hour, top to bottom. The teal mid-band is what stops the gradient
      // reading as a single hue ramp — it is the difference between "dark blue"
      // and "sky".
      uZenith: { value: new THREE.Color('#03060f') },
      uMid: { value: new THREE.Color('#0a1826') },
      uHorizon: { value: new THREE.Color('#1e1611') },
      uCityGlow: { value: accent.clone() },
      uMoonDir: { value: MOON_DIRECTION.clone() },
      uMoonColor: { value: new THREE.Color('#c9d6ff') },
      uCloudLit: { value: new THREE.Color('#3d4560') },
      uCloudDark: { value: new THREE.Color('#0b0f1a') },
      uCloud: { value: 0.85 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      ${HASH}
      ${NOISE}

      uniform vec3 uZenith;
      uniform vec3 uMid;
      uniform vec3 uHorizon;
      uniform vec3 uCityGlow;
      uniform vec3 uMoonDir;
      uniform vec3 uMoonColor;
      uniform vec3 uCloudLit;
      uniform vec3 uCloudDark;
      uniform float uCloud;

      varying vec3 vDir;

      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;

        // --- vertical scattering falloff ---
        vec3 col = mix(uHorizon, uMid, smoothstep(-0.04, 0.22, h));
        col = mix(col, uZenith, smoothstep(0.12, 0.72, h));

        /* --- ground-lit city glow ---
         * Sodium and LED bounced back off the haze. This hugs the horizon hard
         * (the exponent is steep on purpose) and is biased toward the dense
         * side of the city so it is a glow, not a uniform ring. It is the main
         * source of colour in the upper half of the frame. */
        float band = exp(-max(h, 0.0) * 16.0) * smoothstep(-0.10, 0.012, h);
        float azimuth = 0.62 + 0.38 * dot(normalize(vec3(d.x, 0.0, d.z)), vec3(0.28, 0.0, -0.96));
        col += uCityGlow * band * azimuth * 0.30;

        /* --- Mie forward scatter around the moon ---
         * Three lobes, tight to wide. This is the single cue that reads as
         * "there is air between the camera and that object" — without it the
         * moon sits on the gradient rather than in it. */
        float mu = max(dot(d, uMoonDir), 0.0);
        col += uMoonColor * pow(mu, 280.0) * 0.50;
        col += uMoonColor * pow(mu, 16.0) * 0.055;
        col += uMoonColor * pow(mu, 3.0) * 0.014;

        /* --- cloud ---
         * Projected onto a dome plane so the cells foreshorten toward the
         * horizon the way real cloud decks do. Lit from the moon side with a
         * silver rim, shaded slate elsewhere. */
        if (h > 0.004) {
          vec2 cuv = (d.xz / (h + 0.24)) * 0.42;
          float f = fbm2(cuv + vec2(3.1, 7.7));
          float mask = smoothstep(0.44, 0.76, f);
          // Thin toward the zenith, dissolve into the horizon haze.
          mask *= smoothstep(0.005, 0.15, h) * (1.0 - smoothstep(0.50, 0.95, h));

          float lit = pow(max(dot(d, uMoonDir), 0.0), 2.2);
          // A second, finer octave lifts the edges facing the moon.
          float rim = smoothstep(0.52, 0.72, f) * lit;
          vec3 cloudCol = mix(uCloudDark, uCloudLit, lit * 0.8 + rim * 0.6);

          col = mix(col, cloudCol, mask * uCloud);
        }

        /* 8-bit quantisation is plainly visible across a gradient this dark and
         * this wide. A half-LSB hash breaks the bands up. */
        col += (hash21(gl_FragCoord.xy) - 0.5) * 0.007;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
}

export function createSky({ renderer, mobile, lowPower, accent }: Params): Sky {
  const group = new THREE.Group()

  const domeGeometry = new THREE.SphereGeometry(SKY_RADIUS, mobile ? 32 : 48, mobile ? 20 : 32)
  const domeMaterial = createDomeMaterial(accent)

  const dome = new THREE.Mesh(domeGeometry, domeMaterial)
  dome.frustumCulled = false
  dome.renderOrder = -100
  group.add(dome)

  /* ---- stars ----
   *
   * Magnitude is cubed so the field is mostly faint with a few bright anchors,
   * which is what a real sky looks like; a uniform distribution reads as noise.
   */
  const starCount = lowPower ? 320 : mobile ? 520 : 1400
  const random = mulberry32(19940712)

  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)
  const starSizes = new Float32Array(starCount)

  const hot = new THREE.Color('#9db4ff')
  const cool = new THREE.Color('#ffd9a0')
  const tint = new THREE.Color()

  for (let i = 0; i < starCount; i += 1) {
    // Only the visible hemisphere plus a little below, so none are wasted.
    const y = -0.05 + random() * 1.05
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = random() * Math.PI * 2

    starPositions[i * 3 + 0] = Math.cos(theta) * r * STAR_RADIUS
    starPositions[i * 3 + 1] = y * STAR_RADIUS
    starPositions[i * 3 + 2] = Math.sin(theta) * r * STAR_RADIUS

    const magnitude = Math.pow(random(), 3)
    starSizes[i] = 0.7 + magnitude * 2.6

    tint.copy(hot).lerp(cool, random())
    // The brightest stars read closer to white.
    tint.lerp(new THREE.Color(1, 1, 1), magnitude * 0.5)
    starColors[i * 3 + 0] = tint.r
    starColors[i * 3 + 1] = tint.g
    starColors[i * 3 + 2] = tint.b
  }

  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeometry.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3))
  starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1))

  const starMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    fog: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aColor;
      attribute float aSize;
      uniform float uPixelRatio;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = aColor;
        // Atmospheric extinction — air mass swallows stars near the horizon.
        vAlpha = smoothstep(-0.02, 0.32, normalize(position).y);
        gl_PointSize = aSize * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float r = length(gl_PointCoord - 0.5);
        float core = smoothstep(0.5, 0.0, r);
        gl_FragColor = vec4(vColor, core * core * vAlpha);
      }
    `,
  })

  const stars = new THREE.Points(starGeometry, starMaterial)
  stars.frustumCulled = false
  stars.renderOrder = -99
  group.add(stars)

  /* ---- environment bake ----
   *
   * A throwaway scene holding a second mesh that *shares* this dome's geometry
   * and material (a mesh can only have one parent, but nothing stops two from
   * pointing at the same buffers), plus a bright stand-in for the moon so the
   * glass picks up a specular highlight rather than a flat wash.
   *
   * Runs once. The reduced tier skips it: the PMREM bake is the single most
   * expensive thing in the startup path.
   */
  let environment: THREE.Texture | null = null
  let pmrem: THREE.PMREMGenerator | null = null
  let bakeGeometry: THREE.SphereGeometry | null = null
  let bakeMaterial: THREE.MeshBasicMaterial | null = null

  if (!lowPower) {
    pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()

    const bakeScene = new THREE.Scene()

    const domeProxy = new THREE.Mesh(domeGeometry, domeMaterial)
    domeProxy.frustumCulled = false
    bakeScene.add(domeProxy)

    bakeGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 12)
    bakeMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#d9dbe4').multiplyScalar(2.4) })
    const moonProxy = new THREE.Mesh(bakeGeometry, bakeMaterial)
    moonProxy.position.copy(MOON_POSITION)
    bakeScene.add(moonProxy)

    // near/far must straddle the dome — the default far of 100 would clip it.
    environment = pmrem.fromScene(bakeScene, 0, 1, SKY_RADIUS * 2).texture
    bakeScene.clear()
  }

  return {
    group,
    environment,
    dispose() {
      domeGeometry.dispose()
      domeMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      bakeGeometry?.dispose()
      bakeMaterial?.dispose()
      environment?.dispose()
      pmrem?.dispose()
    },
  }
}
