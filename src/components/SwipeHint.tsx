/** Mobile-only cue above a horizontal snap row. */
export default function SwipeHint() {
  return (
    <p
      aria-hidden="true"
      className="mb-2 mt-5 hidden font-mono text-[11px] tracking-[.2em] text-muted max-[860px]:block"
    >
      SWIPE →
    </p>
  );
}
