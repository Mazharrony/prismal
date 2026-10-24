import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { ADS_STEPS, ADS_STEPS_HEAD } from "@/content/ad-creatives";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const CARD = ["bg-accent text-ink", "bg-ink text-paper", "bg-violet text-paper"];

/** Brief → Batch → Learn, as three colour-block cards. */
export default function AdsSteps() {
  return (
    <Band id="how" tone="paper">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-muted-2")}>{ADS_STEPS_HEAD.eyebrow}</span>
          <Headline className={cn(h2, "mt-4")}>{ADS_STEPS_HEAD.title}</Headline>
        </div>
        <p className="m-0 max-w-[400px] text-[17px] leading-[1.55] text-muted-2" data-rv style={{ ["--d" as string]: ".1s" }}>
          {ADS_STEPS_HEAD.intro}
        </p>
      </div>

      <ol className="m-0 mt-[clamp(36px,5vw,64px)] grid list-none grid-cols-3 gap-5 p-0 max-[1024px]:grid-cols-1">
        {ADS_STEPS.map((s, i) => (
          <li
            key={s.num}
            data-rv
            style={{ ["--d" as string]: `${i * 0.12}s` }}
            className={cn("flex min-h-[340px] flex-col rounded-[32px] p-8 max-[1024px]:min-h-0", CARD[i])}
          >
            <span className="display text-[96px] leading-none opacity-30">{s.num}</span>
            <h3 className="m-0 mt-auto font-brand text-[clamp(30px,2.8vw,40px)] font-medium leading-[1.05]">{s.title}</h3>
            <p className="m-0 mt-4 max-w-[36ch] text-[16px] leading-[1.55] opacity-85">{s.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}
