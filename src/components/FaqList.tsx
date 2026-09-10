import { FAQS, SITE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";

const Avatar = () => (
  <span
    aria-hidden="true"
    className="grid h-8 w-8 flex-none place-items-center self-end rounded-full bg-ink"
  >
    <svg viewBox={PRISM_VIEWBOX} className="h-3 w-auto">
      <path d={PRISM_BODY} fill="#f3efe6" />
      {PRISM_RAYS.map((d) => (
        <path key={d} d={d} fill="#f9d20f" />
      ))}
    </svg>
  </span>
);

/**
 * The FAQ as a chat thread: every question arrives as an outgoing bubble on
 * the right, every answer as Prismal's reply on the left, each pair revealing
 * as it scrolls into view. Semantically it stays a definition list.
 */
export default function FaqList() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-ink/10 bg-white/60 shadow-[0_30px_60px_-30px_rgba(11,15,20,.35)]">
      <div className="flex items-center gap-3 border-b border-ink/10 bg-white/70 px-6 py-4">
        <Avatar />
        <div className="grid leading-tight">
          <span className="font-brand text-[15px] font-semibold tracking-[.2em] text-ink">{SITE.name}</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[.16em] text-muted-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            Online · replies within 48h
          </span>
        </div>
      </div>

      <dl className="m-0 grid gap-6 px-6 py-7 max-[520px]:px-4">
        {FAQS.map((f, i) => (
          <div key={f.q} className="grid gap-2.5" data-rv style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
            <dt className="flex justify-end">
              <span className="max-w-[78%] rounded-[22px] rounded-br-md bg-ink px-5 py-3 font-brand text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.3] text-paper">
                {f.q}
              </span>
            </dt>
            <dd className="m-0 flex items-end gap-2.5">
              <Avatar />
              <span className="max-w-[82%] rounded-[22px] rounded-bl-md bg-paper-2 px-5 py-3.5 text-[15px] leading-[1.6] text-ink">
                {f.a}
              </span>
            </dd>
          </div>
        ))}
        <div className="flex items-end gap-2.5" aria-hidden="true">
          <Avatar />
          <span className="flex items-center gap-1 rounded-[22px] rounded-bl-md bg-paper-2 px-4 py-3.5">
            <span className="typing-dot h-2 w-2 rounded-full bg-ink/50" />
            <span className="typing-dot h-2 w-2 rounded-full bg-ink/50" />
            <span className="typing-dot h-2 w-2 rounded-full bg-ink/50" />
          </span>
        </div>
      </dl>

      <div className="border-t border-ink/10 bg-white/70 px-6 py-4">
        <a
          href="#contact"
          className="flex items-center justify-between rounded-full border border-ink/15 px-5 py-3 font-brand text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-accent"
        >
          Ask your own question
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
