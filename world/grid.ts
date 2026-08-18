import * as THREE from 'three'

/* The connective ground grid.
 *
 * Reads as infrastructure rather than decoration: hairlines on the ground plane
 * that carry energy as the ladder progresses — dormant at "Ship it", live by
 * "Make it decide". One draw call.
 */

export type GroundGrid = {
  mesh: THREE.LineSegments
  setEnergy: (value: number) => void
  dispose: () => void
}

export function createGrid(accent: THREE.Color, line: THREE.Color): GroundGrid {
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
    uniforms: {
      uEnergy: { value: 0 },
      uAccent: { value: accent },
      uLine: { value: line },
    },
    vertexShader: `
      attribute float aDistance;
      varying float vDistance;
      void main() {
        vDistance = aDistance;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uEnergy;
      uniform vec3 uAccent;
      uniform vec3 uLine;
      varying float vDistance;
      void main() {
        // Fade toward the horizon so the grid never ends in a hard edge.
        float falloff = 1.0 - smoothstep(0.35, 1.0, vDistance);
        vec3 c = mix(uLine, uAccent, uEnergy * 0.7);
        gl_FragColor = vec4(c, falloff * (0.10 + uEnergy * 0.30));
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
