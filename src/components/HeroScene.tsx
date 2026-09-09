import type { CSSProperties } from "react";
import { HERO } from "@/content/site";
import { PRISM_BODY } from "@/lib/prism";

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * "Noise in → prism → spectrum out": six flickering phrases, a beam with four
 * dots running along it, the prism, and three rays that pop out at
 * 1.45 / 1.52 / 1.59s while a spectral gradient settles over them. All timing
 * lives in globals.css under "Hero scene"; this file is pure markup.
 */
export default function HeroScene() {
  return (
    <svg
      viewBox="0 150 900 400"
      width="100%"
      // 340px is the design's cap; the vh term lets the hero card still fit
      // (and therefore pin) on a 900px-tall laptop, where 340px overflows by ~20px.
      className="hero-scene mt-2 block h-auto max-h-[min(340px,34vh)] overflow-visible"
      role="img"
      aria-label={HERO.sceneLabel}
    >
      <defs>
        <linearGradient id="spec-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f9d20f" />
          <stop offset="1" stopColor="#f9d20f" />
        </linearGradient>
        <linearGradient id="spec-mid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0f14" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="spec-low" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#64748b" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <g
        className="hero-noise"
        fill="#64748b"
        fontSize="21"
        fontFamily="var(--font-plex), IBM Plex Mono, monospace"
      >
        {HERO.noise.map((n, i) => (
          <text key={n.text} x={n.x} y={n.y} style={idx(i)}>
            {n.text}
          </text>
        ))}
      </g>

      <rect
        className="hero-beam"
        x="0"
        y="349"
        width="470"
        height="4"
        fill="#0b0f14"
        filter="url(#soft-blur)"
        opacity=".35"
      />
      <rect
        className="hero-beam"
        x="0"
        y="350.5"
        width="470"
        height="1.5"
        fill="#0b0f14"
      />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          className="hero-dot"
          cx="8"
          cy="351.5"
          r="2.4"
          fill="#0b0f14"
          style={idx(i)}
        />
      ))}

      <g transform="translate(360,150) scale(2.2)">
        <path className="hero-prism" d={PRISM_BODY} fill="#0b0f14" />
        <g transform="translate(92,92)">
          <g className="hero-ray hero-ray-0" style={idx(0)}>
            <polygon points="0,0 138,-52 138,-30" fill="#f9d20f" />
            <polygon
              className="hero-spectral"
              points="0,0 138,-52 138,-30"
              fill="url(#spec-top)"
              style={idx(0)}
            />
          </g>
          <g className="hero-ray hero-ray-1" style={idx(1)}>
            <polygon points="0,0 140,-4 140,8" fill="#0b0f14" />
            <polygon
              className="hero-spectral"
              points="0,0 140,-4 140,8"
              fill="url(#spec-mid)"
              style={idx(1)}
            />
          </g>
          <g className="hero-ray hero-ray-2" style={idx(2)}>
            <polygon points="0,0 138,30 138,52" fill="#64748b" />
            <polygon
              className="hero-spectral"
              points="0,0 138,30 138,52"
              fill="url(#spec-low)"
              style={idx(2)}
            />
          </g>
        </g>
      </g>

      <circle
        className="hero-burst"
        cx="562.4"
        cy="352.4"
        r="6"
        fill="#0b0f14"
      />
    </svg>
  );
}
