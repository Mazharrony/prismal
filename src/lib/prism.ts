/**
 * The PRISMAL mark as raw path data (viewBox 0 0 232 160). The splash and the
 * hero scene draw it inline so each path can carry its own animation; the
 * header and footer use the SVG files in /public instead.
 */
export const PRISM_VIEWBOX = "0 0 232 160";

export const PRISM_BODY = "M0 160 L88 0 L112 45 L88 90 L176 160 Z";

/** Top, middle and bottom rays, all leaving the prism at (92, 92). */
export const PRISM_RAYS = [
  "M92 92 L230 40 L230 62 Z",
  "M92 92 L232 88 L232 100 Z",
  "M92 92 L230 122 L230 144 Z",
] as const;
