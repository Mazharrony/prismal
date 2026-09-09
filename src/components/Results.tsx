import StackCard from "@/components/StackCard";
import { RESULTS_HEAD, STATS } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Results() {
  return (
    <StackCard id="results" top={148} z={7} tone="accent" note={RESULTS_HEAD.note}>
      <span className={cn(eyebrow, "text-ink")}>{RESULTS_HEAD.eyebrow}</span>
      <h2 className={cn(h2, "mb-8 mt-3 text-ink")}>{RESULTS_HEAD.title}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8">
        {STATS.map((s) => (
          <div key={s.value} className="min-w-0 border-t-2 border-ink pb-5 pt-6">
            <div className="font-display text-[clamp(40px,5vw,80px)] font-medium leading-none tracking-[-.03em] text-ink [overflow-wrap:anywhere]">
              {s.value}
            </div>
            <p className="m-0 mt-3 text-[14px] leading-[1.5] text-ink">{s.label}</p>
          </div>
        ))}
      </div>
    </StackCard>
  );
}
