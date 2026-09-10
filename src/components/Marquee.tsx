import { MARQUEE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";

const Mark = () => (
  <svg viewBox={PRISM_VIEWBOX} className="mx-[.35em] inline-block h-[.55em] w-auto" aria-hidden="true">
    <path d={PRISM_BODY} fill="#f9d20f" />
    {PRISM_RAYS.map((d) => (
      <path key={d} d={d} fill="#f9d20f" />
    ))}
  </svg>
);

/** The brand line on a loop, between the FAQ and the contact band. */
export default function Marquee() {
  const run = (
    <div aria-hidden="true">
      {MARQUEE.map((t, i) => (
        <span key={i} className="display inline-flex items-center text-[clamp(56px,9vw,140px)] text-paper">
          {t}
          <Mark />
        </span>
      ))}
    </div>
  );
  return (
    <section className="marquee bg-ink py-[clamp(24px,4vw,48px)]" aria-label={MARQUEE.join(" ")}>
      {run}
      {run}
    </section>
  );
}
