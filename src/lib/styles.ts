/**
 * Class strings shared by several sections. Anything used once stays inline
 * in its component.
 */

/** IBM Plex Mono eyebrow: 11px, .2em tracking. Colour set by the caller. */
export const eyebrow = "font-mono text-[11px] tracking-[.2em] uppercase";

/** Giant section headline. */
export const h2 = "display m-0 text-[clamp(44px,7.2vw,112px)]";

/** Yellow pill: the primary CTA everywhere. */
export const pillAccent =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-ink font-brand font-semibold no-underline transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-paper active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

/** Ink pill for light bands. */
export const pillInk =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink text-paper font-brand font-semibold no-underline transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ink-3 active:translate-y-0";

/** Outlined pill that works on any band (uses currentColor). */
export const pillGhost =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-current/30 font-brand font-semibold no-underline transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-current active:translate-y-0";

/** Focus ring shared by every interactive element. */
export const focus =
  "outline-none focus-visible:ring-4 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-current";
