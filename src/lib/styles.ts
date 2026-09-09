/**
 * Class strings shared by several sections, so the handoff's recurring
 * measurements live in one place. Anything used once stays inline in its
 * component.
 */

/** IBM Plex Mono eyebrow: 11px, .2em tracking, muted. Colour is overridable. */
export const eyebrow = "font-mono text-[11px] tracking-[.2em] text-muted";

/** The tighter mono line used for stack lists and metrics. */
export const monoLine = "font-mono text-[10px] tracking-[.14em]";

/** Handwritten Caveat note pinned top-right of a card. Hidden on mobile. */
export const note =
  "pointer-events-none absolute right-7 top-3 m-0 font-hand text-[20px] -rotate-3 max-[860px]:hidden";

/** Section H2: Jost 500, clamp(36px,4.5vw,64px). */
export const h2 =
  "m-0 font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-none tracking-[-.02em] max-[860px]:text-[clamp(28px,7.4vw,40px)]";

/** Ink pill with yellow text (primary CTA). */
export const pillDark =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink text-accent font-bold no-underline transition-colors hover:bg-muted";

/** White pill with a 1px border (secondary CTA / nav link). */
export const pillLight =
  "inline-flex items-center whitespace-nowrap rounded-full border border-line bg-white text-ink font-semibold no-underline transition-colors hover:bg-surface";

/** Surface tile that lifts and outlines in ink on hover (kits, work). */
export const tile =
  "border border-line bg-surface text-ink no-underline transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-ink";
