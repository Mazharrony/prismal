import * as THREE from 'three'
import { HASH, NOISE } from './glsl'

/* The moon — an actual sphere, lit, with a surface.
 *
 * The previous version was a `CircleGeometry` with a flat basic material: a
 * sticker on the sky gradient. Three things make a disc read as a body rather
 * than a decal, and all three are here: a curved terminator, a perturbed
 * surface normal so the grazing light catches relief, and a scattering halo
 * that puts it *inside* the atmosphere instead of on top of it.
 *
 * Cost is two draw calls (sphere + halo). Nothing animates — the world renders
 * on demand, so every value below is static.
 */

/** Where the moon hangs. The hero's copy column owns the left of the frame, so
 *  it takes the right — and the towers still cross in front of it mid-scroll. */
export const MOON_POSITION = new THREE.Vector3(120, 88, -300)

/** Unit vector from the origin toward the moon. The scene keys its light off
 *  this so the visible source and the lighting finally agree. */
export const MOON_DIRECTION = MOON_POSITION.clone().normalize()

export const MOON_RADIUS = 20

/* The direction sunlight arrives from, in world space.
 *
 * Deliberately *not* the same as the direction the moon lights the city from.
 * A full-face moon has no terminator and collapses straight back into a flat
 * disc, so this is set to a waxing gibbous — bright enough to read as the
 * frame's light source, with a visible curved shadow on the trailing limb. The
 * physical inconsistency is invisible and the alternative looks like a sticker.
 */
const SUN_DIRECTION = new THREE.Vector3(-0.42, 0.28, 0.86).normalize()

export type Moon = {
  group: THREE.Group
  direction: THREE.Vector3
  /** Billboard the halo. Called from the scene's update — one quaternion copy. */
  faceCamera: (camera: THREE.Camera) => void
  dispose: () => void
}

export function createMoon({ mobile }: { mobile: boolean }): Moon {
  const group = new THREE.Group()

  const bodyColor = new THREE.Color('#d9dbe4')
  const haloColor = new THREE.Color('#b8c6ee')

  /* ---- the body ---- */

  const geometry = new THREE.SphereGeometry(MOON_RADIUS, mobile ? 32 : 64, mobile ? 16 : 32)

  const material = new THREE.ShaderMaterial({
    fog: false,
    uniforms: {
      uSun: { value: SUN_DIRECTION },
      uColor: { value: bodyColor },
      uBump: { value: mobile ? 0.35 : 0.55 },
      uEarthshine: { value: 0.035 },
      uIntensity: { value: 1.35 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormalW;
      varying vec3 vLocal;
      void main() {
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vLocal = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      ${HASH}
      ${NOISE}

      uniform vec3 uSun;
      uniform vec3 uColor;
      uniform float uBump;
      uniform float uEarthshine;
      uniform float uIntensity;

      varying vec3 vNormalW;
      varying vec3 vLocal;

      /* Worley F1 on a jittered lattice — the basis for the crater field. */
      float worley(vec3 p) {
        vec3 g = floor(p);
        vec3 f = fract(p);
        float best = 1.0;
        for (int x = -1; x <= 1; x++) {
          for (int y = -1; y <= 1; y++) {
            for (int z = -1; z <= 1; z++) {
              vec3 o = vec3(float(x), float(y), float(z));
              vec3 c = g + o;
              vec3 j = vec3(hash31(c), hash31(c + 19.19), hash31(c + 47.31));
              best = min(best, length(o + j - f));
            }
          }
        }
        return best;
      }

      /* Crater profile: a sunken floor, a raised rim just outside it, then flat.
       * Two scales so large basins carry smaller impacts on their flanks. */
      float craterField(vec3 p) {
        float d1 = worley(p * 3.0);
        float d2 = worley(p * 7.4 + 13.7);
        float c1 = smoothstep(0.0, 0.30, d1) - 0.55 * (1.0 - smoothstep(0.30, 0.48, d1));
        float c2 = smoothstep(0.0, 0.30, d2) - 0.55 * (1.0 - smoothstep(0.30, 0.48, d2));
        return c1 * 0.66 + c2 * 0.34;
      }

      float height(vec3 p) {
        // Maria: broad, low basalt plains under the cratering.
        return craterField(p) * 0.34 + fbm3(p * 1.7) * 0.22;
      }

      void main() {
        vec3 n = normalize(vNormalW);
        vec3 p = normalize(vLocal);

        // Perturb the normal by the gradient of the height field. Four samples,
        // and only the tangential component is kept so the silhouette stays a
        // clean circle — relief on the surface, never on the edge.
        float e = 0.015;
        float h0 = height(p);
        vec3 grad = vec3(
          height(p + vec3(e, 0.0, 0.0)) - h0,
          height(p + vec3(0.0, e, 0.0)) - h0,
          height(p + vec3(0.0, 0.0, e)) - h0
        ) / e;
        grad -= n * dot(grad, n);
        vec3 nb = normalize(n - grad * uBump);

        float ndl = dot(nb, uSun);

        /* Flattened response, not Lambert. The moon is retroreflective: a plain
         * cosine falloff darkens the limb far too early and the result reads as
         * a ball bearing. pow(.., 0.55) holds the disc bright to the edge and
         * lets the terminator do the work of describing the curvature. */
        float shade = pow(max(ndl, 0.0), 0.55);

        // Soften the terminator — a rough body never casts a knife edge.
        float term = smoothstep(-0.07, 0.12, ndl);

        // Maria are roughly a third darker than the highlands.
        float maria = smoothstep(0.42, 0.62, fbm3(p * 1.7));
        vec3 albedo = mix(uColor, uColor * 0.60, maria);

        vec3 col = albedo * shade * term;
        // Earthshine: the unlit limb is never truly black.
        col += albedo * uEarthshine * (1.0 - term);

        gl_FragColor = vec4(col * uIntensity, 1.0);
      }
    `,
  })

  const body = new THREE.Mesh(geometry, material)
  body.position.copy(MOON_POSITION)
  group.add(body)

  /* ---- the halo ----
   *
   * One additive plane carrying two falloff lobes: a tight ring hugging the
   * disc and a wide, very faint bloom. Two lobes in one shader rather than two
   * stacked quads, because the second quad buys nothing but a draw call.
   *
   * It sits at the moon's centre and writes no depth, so the sphere's own front
   * face occludes the half of the plane behind it for free. */

  const haloSize = MOON_RADIUS * 11
  const haloGeometry = new THREE.PlaneGeometry(haloSize, haloSize)
  const haloMaterial = new THREE.ShaderMaterial({
    fog: false,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: haloColor },
      uIntensity: { value: 1.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      ${HASH}
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        float tight = exp(-r * 11.0);
        float wide = exp(-r * 2.4);
        float a = tight * 0.60 + wide * 0.14;
        // Clip the plane's square corners before they reach the edge.
        a *= smoothstep(1.0, 0.82, r);
        // A dark, wide gradient banding is very visible; dither it away.
        a += (hash21(gl_FragCoord.xy) - 0.5) * 0.004;
        gl_FragColor = vec4(uColor * a * uIntensity, a);
      }
    `,
  })

  const halo = new THREE.Mesh(haloGeometry, haloMaterial)
  halo.position.copy(MOON_POSITION)
  halo.frustumCulled = false
  group.add(halo)

  return {
    group,
    direction: MOON_DIRECTION.clone(),
    faceCamera(camera) {
      halo.quaternion.copy(camera.quaternion)
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      haloGeometry.dispose()
      haloMaterial.dispose()
    },
  }
}
