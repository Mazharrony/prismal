import Band from "@/components/Band";
import { ENGAGE_HEAD, WAYS } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const CARD = [
  "bg-ink text-paper",
  "bg-paper text-ink",
  "bg-violet text-paper",
];
const BAR = ["bg-ink", "bg-paper", "bg-violet"];
const BAR_GRID = "grid grid-cols-[minmax(0,1fr)_minmax(0,4fr)_minmax(0,3fr)] gap-2";

/** Three ways to start, on the yellow band. */
export default function Engage() {
  return (
    <Band id="engage" tone="accent" flip>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-ink/70")}>{ENGAGE_HEAD.eyebrow}</span>
          <h2 className={cn(h2, "mt-4")}>{ENGAGE_HEAD.title}</h2>
        </div>
        <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-ink/80" data-rv style={{ ["--d" as string]: ".1s" }}>
          {ENGAGE_HEAD.intro}
        </p>
      </div>

      <div className={cn(BAR_GRID, "mt-[clamp(32px,4vw,48px)]")} aria-hidden="true" data-rv>
        {BAR.map((b) => (
          <div key={b} className={cn("h-4 rounded-full", b)} />
        ))}
      </div>
      <div className={cn(BAR_GRID, "mt-2 font-mono text-[11px] tracking-[.18em] text-ink/70")}>
        {ENGAGE_HEAD.durations.map((d, i) => (
          <span key={d} className={cn("whitespace-nowrap", i === 0 && "overflow-hidden text-ellipsis")}>
            {d}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-1">
        {WAYS.map((w, i) => (
          <article
            key={w.num}
            data-rv
            style={{ ["--d" as string]: `${i * 0.12}s` }}
            className={cn("flex flex-col gap-4 rounded-[28px] p-8", CARD[i])}
          >
            <span className="font-mono text-[11px] tracking-[.2em] opacity-70">{w.num}</span>
            <h3 className="display m-0 text-[clamp(44px,4.5vw,64px)]">{w.title}</h3>
            <p className="m-0 text-[16px] leading-[1.55] opacity-85">{w.body}</p>
            <ul className="m-0 mt-auto grid list-none gap-2 border-t border-current/20 p-0 pt-5">
              {w.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-[1.5]">
                  <span aria-hidden="true" className="mt-2.5 h-0.5 w-[18px] flex-none bg-current opacity-60" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Band>
  );
}
