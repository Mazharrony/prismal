import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { RESULTS_HEAD, STATS } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Four giant numbers on ink. */
export default function Results() {
  return (
    <Band id="results" tone="ink">
      <div data-rv>
        <span className={cn(eyebrow, "text-accent")}>{RESULTS_HEAD.eyebrow}</span>
        <Headline className={cn(h2, "mt-4")}>{RESULTS_HEAD.title}</Headline>
      </div>
      <div className="mt-[clamp(32px,5vw,64px)] grid grid-cols-4 gap-x-8 max-[1024px]:grid-cols-2 max-[520px]:grid-cols-1">
        {STATS.map((s, i) => (
          <div
            key={s.value}
            data-rv
            style={{ ["--d" as string]: `${i * 0.1}s` }}
            className="min-w-0 border-t-2 border-accent pb-6 pt-6"
          >
            <div className="display whitespace-nowrap text-[clamp(64px,6.6vw,120px)] text-accent">
              {s.value}
            </div>
            <p className="m-0 mt-3 max-w-[26ch] text-[15px] leading-[1.5] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}
