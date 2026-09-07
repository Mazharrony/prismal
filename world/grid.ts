import * as THREE from 'three'

/* Street lighting on the ground plane.
 *
 * Same geometry and the same single draw call as the blueprint grid it
 * replaces, but read as infrastructure that is switched on rather than drawn:
 * sodium vapour warming toward white as the ladder progresses — dormant at
 * the websites chapter, live by the AI chapter.
 *
 * depthTest stays on so the towers occlude the streets behind them; without it
 * the lines float over the massing and the illusion dies instantly.
 */

export type GroundGrid = {
  mesh: THREE.LineSegments
  setEnergy: (value: number) => void
  dispose: () => void
}

export function createGrid(accent: THREE.Color): GroundGrid {
  const extent = 110
  const step = 10
  const positions: number[] = []
  const distance: number[] = []

  for (let v = -extent; v <= extent; v += step) {
    positions.push(-extent, 0, v, extent, 0, v)
    distance.push(Math.abs(v) / extent, Math.abs(v) / extent)
    positions.push(v, 0, -extent, v, 0, extent)
    distance.push(Math.abs(v) / extent, Math.abs(v) / extent)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aDistance', new THREE.Float32BufferAttribute(distance, 1))

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uEnergy: { value: 0 },
      // Low-pressure sodium: the colour of a street that has been there a while.
      uSodium: { value: new THREE.Color('#ff9a3c') },
      // What the newer arterials are relit with.
      uWhite: { value: new THREE.Color('#bcd4ff') },
      uAccent: { value: accent },
    },
    vertexShader: /* glsl */ `
      attribute float aDistance;
      varying float vDistance;
      void main() {
        vDistance = aDistance;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uEnergy;
      uniform vec3 uSodium;
      uniform vec3 uWhite;
      uniform vec3 uAccent;
      varying float vDistance;
      void main() {
        // Fade toward the horizon so the grid never ends in a hard edge.
        float falloff = 1.0 - smoothstep(0.30, 1.0, vDistance);
        // Energy relights the network: sodium first, then cooler and brighter.
        vec3 c = mix(uSodium, uWhite, smoothstep(0.35, 1.0, uEnergy));
        c = mix(c, uAccent, 0.12);
        gl_FragColor = vec4(c, falloff * (0.16 + uEnergy * 0.42));
      }
    `,
  })

  const mesh = new THREE.LineSegments(geometry, material)
  mesh.frustumCulled = false

  return {
    mesh,
    setEnergy: (value) => {
      material.uniforms.uEnergy.value = value
    },
    dispose: () => {
      geometry.dispose()
      material.dispose()
    },
  }
}
