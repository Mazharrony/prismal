import StackCard from "@/components/StackCard";
import { SERVICES, SERVICES_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Services() {
  return (
    <StackCard id="services" top={78} z={2} note={SERVICES_HEAD.note}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="min-w-0 flex-[1_1_380px]">
          <span className={eyebrow}>{SERVICES_HEAD.eyebrow}</span>
          <h2 className={cn(h2, "mt-3 text-ink")}>{SERVICES_HEAD.title}</h2>
        </div>
        <p className="m-0 mb-1.5 max-w-[380px] flex-[1_1_300px] text-[16px] leading-[1.6] text-ink">
          {SERVICES_HEAD.intro}
        </p>
      </div>
      <div className="grid gap-2">
        {SERVICES.map((s) => (
          <a
            key={s.num}
            href="#contact"
            style={{ background: s.bg, color: s.fg }}
            className="grid grid-cols-[48px_minmax(0,1fr)_32px] grid-rows-[auto_auto] items-start gap-x-5 gap-y-2 rounded-[18px] px-7 py-6 transition-transform duration-[250ms] hover:translate-x-3 max-[520px]:grid-cols-[36px_minmax(0,1fr)_24px] max-[520px]:px-5"
          >
            <span className="pt-2.5 font-mono text-[12px] leading-none tracking-[.2em] opacity-70">
              {s.num}
            </span>
            <h3 className="m-0 font-display text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.1] tracking-[-.01em]">
              {s.title}
            </h3>
            <span
              aria-hidden="true"
              className="pt-1.5 text-right text-[22px] leading-none"
            >
              →
            </span>
            <p className="col-start-2 m-0 max-w-[560px] text-[15px] leading-[1.5] opacity-85 max-[520px]:col-[1/-1]">
              {s.body}
            </p>
          </a>
        ))}
      </div>
    </StackCard>
  );
}
