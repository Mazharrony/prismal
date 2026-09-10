import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { SERVICES, SERVICES_HEAD } from "@/content/site";
import { eyebrow, focus, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const CARD = [
  "bg-accent text-ink",
  "bg-ink text-paper",
  "bg-violet text-paper",
];
const CTA = [
  "bg-ink text-paper hover:bg-ink-3",
  "bg-accent text-ink hover:bg-paper",
  "bg-paper text-ink hover:bg-accent",
];

/** Three colour-block cards, one per ray. */
export default function Services() {
  return (
    <Band id="services" tone="paper" wave={false}>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-muted-2")}>{SERVICES_HEAD.eyebrow}</span>
          <Headline className={cn(h2, "mt-4")}>{SERVICES_HEAD.title}</Headline>
        </div>
        <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-muted-2" data-rv style={{ ["--d" as string]: ".1s" }}>
          {SERVICES_HEAD.intro}
        </p>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)] grid grid-cols-3 gap-5 max-[1024px]:grid-cols-1">
        {SERVICES.map((s, i) => (
          <a
            key={s.num}
            href="#contact"
            data-rv
            data-tilt="7"
            data-cursor="Build"
            style={{ ["--d" as string]: `${i * 0.12}s` }}
            className={cn(
              "group relative flex min-h-[440px] flex-col overflow-hidden rounded-[32px] p-8 max-[1024px]:min-h-0",
              CARD[i],
              focus,
            )}
          >
            <span className="display text-[96px] leading-none opacity-30">{s.num}</span>
            <h3 className="m-0 mt-auto font-brand text-[clamp(30px,2.8vw,40px)] font-medium leading-[1.05]">
              {s.title}
            </h3>
            <p className="m-0 mt-4 max-w-[34ch] text-[16px] leading-[1.55] opacity-85">
              {s.body}
            </p>
            <span
              className={cn(
                "mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-brand text-[15px] font-semibold transition-colors",
                CTA[i],
              )}
            >
              Build this <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        ))}
      </div>
    </Band>
  );
}
