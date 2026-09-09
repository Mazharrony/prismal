import StackCard from "@/components/StackCard";
import { ENGAGE_HEAD, WAYS } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const BAR_GRID = "grid grid-cols-[minmax(0,1fr)_minmax(0,4fr)_minmax(0,3fr)] gap-1.5";

export default function Engage() {
  return (
    <StackCard id="engage" top={134} z={6} note={ENGAGE_HEAD.note}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="min-w-0 flex-[1_1_380px]">
          <span className={eyebrow}>{ENGAGE_HEAD.eyebrow}</span>
          <h2 className={cn(h2, "mt-3 text-ink")}>{ENGAGE_HEAD.title}</h2>
        </div>
        <p className="m-0 mb-1.5 max-w-[380px] flex-[1_1_300px] text-[16px] leading-[1.6] text-ink">
          {ENGAGE_HEAD.intro}
        </p>
      </div>

      {/* Duration bar: the timeline is the spectrum. */}
      <div className={cn(BAR_GRID, "mb-2")} aria-hidden="true">
        <div className="h-3.5 rounded-full bg-accent" />
        <div className="h-3.5 rounded-full bg-line" />
        <div className="h-3.5 rounded-full bg-[linear-gradient(90deg,#0b0f14,#0b0f14_40%,rgba(13,62,102,0))]" />
      </div>
      <div
        className={cn(
          BAR_GRID,
          "mb-7 font-mono text-[11px] tracking-[.18em] text-muted",
        )}
      >
        {ENGAGE_HEAD.durations.map((d, i) => (
          <span
            key={d}
            className={cn(
              "whitespace-nowrap",
              i === 0 && "overflow-hidden text-ellipsis",
            )}
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {WAYS.map((w) => (
          <article
            key={w.num}
            style={{ background: w.bg, color: w.fg, borderColor: w.border }}
            className="flex flex-col gap-3 rounded-[24px] border p-7"
          >
            <span className="font-mono text-[11px] tracking-[.2em] opacity-70">
              {w.num}
            </span>
            <h3 className="m-0 font-display text-[clamp(30px,3vw,40px)] font-medium leading-none">
              {w.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] opacity-90">{w.body}</p>
            <ul
              style={{ borderColor: w.border }}
              className="m-0 mt-auto grid list-none gap-2 border-t p-0 pt-4"
            >
              {w.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-[14px] leading-[1.5]">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-0.5 w-[18px] flex-none bg-current opacity-50"
                  />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </StackCard>
  );
}
