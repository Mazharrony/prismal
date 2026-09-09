import HeroScene from "@/components/HeroScene";
import StackCard from "@/components/StackCard";
import { HERO, type RayTone } from "@/content/site";
import { eyebrow, pillDark, pillLight } from "@/lib/styles";
import { cn } from "@/lib/utils";

const RAY_TONE: Record<RayTone, string> = {
  accent: "bg-accent text-ink",
  surface: "border border-line bg-surface text-ink",
  ink: "bg-ink text-white",
};

export default function Hero() {
  const [line1, line2] = HERO.headline;
  return (
    <StackCard top={64} z={1} pad="hero" hero>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-8">
        <div className="min-w-0 max-w-[640px] flex-[1_1_360px]">
          <span className={eyebrow}>{HERO.noiseEyebrow}</span>
          <HeroScene />
        </div>
        <div className="grid flex-[1_1_260px] content-center gap-3">
          <span className={eyebrow}>{HERO.spectrumEyebrow}</span>
          {HERO.rays.map((r) => (
            <a
              key={r.title}
              href="#services"
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl px-[22px] py-[18px] font-display text-[26px] font-medium transition-transform duration-200 hover:translate-x-2 max-[520px]:text-[22px]",
                RAY_TONE[r.tone],
              )}
            >
              {r.title}
              <span
                className={cn(
                  "whitespace-nowrap font-mono text-[11px] tracking-[.2em]",
                  r.tone === "ink" && "text-line",
                )}
              >
                {r.tag}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-[min(clamp(28px,4vw,52px),4vh)] flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-line pt-7">
        <h1 className="m-0 flex-[1_1_420px] font-display text-[clamp(48px,7vw,104px)] font-medium leading-[.95] tracking-[-.025em] text-ink">
          {line1}
          <br />
          <em className="italic text-ink shadow-[inset_0_-.14em_0_#f9d20f]">
            {line2}
          </em>
        </h1>
        <div className="grid flex-[0_1_380px] gap-[18px]">
          <p className="m-0 text-[17px] leading-[1.6] text-ink">{HERO.intro}</p>
          <div className="flex flex-wrap gap-2.5 max-[520px]:grid">
            <a
              href={HERO.primaryCta.href}
              className={cn(pillDark, "px-[26px] py-[15px] text-[15px] max-[520px]:justify-center")}
            >
              {HERO.primaryCta.label}
            </a>
            <a
              href={HERO.secondaryCta.href}
              className={cn(pillLight, "px-[26px] py-[15px] text-[15px] max-[520px]:justify-center")}
            >
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </StackCard>
  );
}
