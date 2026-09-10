import Sticker from "@/components/Sticker";
import Wave from "@/components/Wave";
import { HERO, TRUST } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";
import { eyebrow, focus, pillAccent, pillGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";

const RAY_FILL = ["#f9d20f", "#f3efe6", "#98a2ae"];

/**
 * The opening screen: the beam draws itself through the headline while the
 * trust stickers float around it. Stickers sit absolutely on desktop and drop
 * into a wrapped row under the headline on phones.
 */
export default function Hero() {
  const [line1, line2] = HERO.headline;
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      {/* Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,.32),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.22),transparent_65%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-7 pb-[clamp(80px,12vw,160px)] pt-[clamp(120px,16vh,168px)] max-[860px]:px-5">
        <div className="flex items-center gap-3">
          <svg viewBox={PRISM_VIEWBOX} className="h-7 w-auto" aria-hidden="true">
            <path d={PRISM_BODY} fill="#f3efe6" />
            {PRISM_RAYS.map((d, i) => (
              <path key={d} d={d} fill={RAY_FILL[i]} />
            ))}
          </svg>
          <span className={cn(eyebrow, "text-muted")}>{HERO.noiseEyebrow} → {HERO.spectrumEyebrow}</span>
        </div>

        <div className="relative mt-8">
          {/* The beam: drawn once on load, dots run along it. */}
          <svg
            aria-hidden="true"
            className="hero-beam pointer-events-none absolute -inset-x-10 -top-16 -bottom-10 h-[calc(100%+104px)] w-[calc(100%+80px)] overflow-visible"
            viewBox="0 0 1440 620"
            preserveAspectRatio="none"
          >
            <path
              d="M-60 300 C 160 120, 360 520, 600 360 S 920 60, 1120 300 S 1420 560, 1520 340"
              fill="none"
              stroke="#f9d20f"
              strokeWidth="3"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <g className="hero-dots" fill="#f9d20f">
              {[0, 1, 2].map((i) => (
                <circle key={i} r="5">
                  <animateMotion
                    dur="7s"
                    begin={`${1.2 + i * 2.2}s`}
                    repeatCount="indefinite"
                    path="M-60 300 C 160 120, 360 520, 600 360 S 920 60, 1120 300 S 1420 560, 1520 340"
                  />
                </circle>
              ))}
            </g>
          </svg>

          <h1 className="display relative m-0 text-[clamp(64px,12.5vw,196px)]">
            <span className="block">{line1}</span>
            <span className="block min-[861px]:ml-[10vw]">{line2}</span>
          </h1>

          {/* Stickers: pinned around the headline on desktop. */}
          <div className="pointer-events-none absolute inset-0 max-[860px]:hidden" aria-hidden="true">
            <Sticker tone="coral" shape="burst" rotate={-8} className="absolute -top-14 left-[38%] h-[118px] w-[118px]">
              {TRUST[0]}
            </Sticker>
            <Sticker tone="accent" shape="pill" rotate={-6} delay={0.8} className="absolute right-[6%] top-[8%]">
              {TRUST[1]}
            </Sticker>
            <Sticker tone="sky" shape="tag" rotate={4} delay={1.6} className="absolute bottom-[22%] left-[2%]">
              {TRUST[2]}
            </Sticker>
            <Sticker tone="violet" shape="burst" rotate={10} delay={2.4} className="absolute -bottom-10 right-[12%] h-[124px] w-[124px]">
              {TRUST[3]}
            </Sticker>
          </div>
        </div>

        {/* Stickers as a row on phones. */}
        <ul className="mt-6 hidden flex-wrap gap-2 max-[860px]:flex" aria-label="Why Prismal">
          {TRUST.map((t, i) => (
            <li key={t}>
              <Sticker tone={(["coral", "accent", "sky", "violet"] as const)[i]} shape="pill" className="!animate-none !rotate-0 text-[12px]">
                {t}
              </Sticker>
            </li>
          ))}
        </ul>
        <span className="sr-only">{TRUST.join(". ")}.</span>

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <p className="m-0 max-w-[560px] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-paper/85" data-rv>
            {HERO.intro}
          </p>
          <div className="flex flex-wrap gap-3 max-[520px]:w-full max-[520px]:grid" data-rv style={{ ["--d" as string]: ".1s" }}>
            <a href={HERO.primaryCta.href} className={cn(pillAccent, focus, "px-7 py-4 text-[16px]")}>
              {HERO.primaryCta.label}
            </a>
            <a href={HERO.secondaryCta.href} className={cn(pillGhost, focus, "px-7 py-4 text-[16px]")}>
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <Wave className="!top-auto !bottom-0 !translate-y-0 text-paper" />
    </section>
  );
}
