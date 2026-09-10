import type { CSSProperties } from "react";
import Headline from "@/components/Headline";
import Sticker from "@/components/Sticker";
import Wave from "@/components/Wave";
import { HERO, TRUST } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";
import { eyebrow, focus, pillAccent, pillGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";

const RAY_FILL = ["#f9d20f", "#f3efe6", "#98a2ae"];
/** The beam's spline through the headline, in the 1440×620 hero viewBox. */
const BEAM = "M-60 300 C 160 120, 360 520, 600 360 S 920 60, 1120 300 S 1420 560, 1520 340";

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
          {/* The beam whips across the headline the moment the splash lifts
              (`html.hero-go`, set by Splash; the 2.05s fallback covers no-JS):
              a glow and the line draw together, a bright head leads them, and
              the nodes pop as it passes. Then the dots patrol the path. */}
          <svg
            aria-hidden="true"
            className="hero-beam pointer-events-none absolute -inset-x-10 -top-16 -bottom-10 h-[calc(100%+104px)] w-[calc(100%+80px)] overflow-visible"
            viewBox="0 0 1440 620"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="beam-blur" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <path
              className="hero-beam-glow"
              d={BEAM}
              fill="none"
              stroke="#f9d20f"
              strokeWidth="14"
              strokeLinecap="round"
              pathLength="1"
              filter="url(#beam-blur)"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="hero-beam-line"
              d={BEAM}
              fill="none"
              stroke="#f9d20f"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <g className="hero-nodes" fill="#f9d20f" stroke="#0b0f14" strokeWidth="3">
              {[0.14, 0.4, 0.62, 0.86].map((t) => (
                <circle key={t} r="0" style={{ "--t": t } as CSSProperties}>
                  <animateMotion path={BEAM} keyPoints={`${t};${t}`} keyTimes="0;1" calcMode="linear" dur="0.01s" fill="freeze" />
                </circle>
              ))}
            </g>
            <circle className="hero-head" r="8" fill="#f3efe6">
              <animateMotion
                path={BEAM}
                dur="1.4s"
                begin="2.05s; indefinite"
                restart="never"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines=".7 0 .2 1"
              />
            </circle>
            <g className="hero-dots" fill="#f9d20f">
              {[0, 1, 2].map((i) => (
                <circle key={i} r="5" style={{ "--i": i } as CSSProperties}>
                  <animateMotion dur="7s" begin={`${3.6 + i * 2.2}s`} repeatCount="indefinite" path={BEAM} />
                </circle>
              ))}
            </g>
          </svg>

          <Headline
            as="h1"
            className="display relative m-0 text-[clamp(64px,12.5vw,196px)] [&>span:last-child]:min-[861px]:ml-[10vw]"
            lines={[line1, line2]}
          />

          {/* Stickers: pinned around the headline on desktop, drifting with the pointer. */}
          <div className="pointer-events-none absolute inset-0 max-[860px]:hidden" aria-hidden="true">
            <span data-parallax="" data-depth="28" className="absolute -top-14 left-[38%] block">
              <Sticker tone="coral" shape="burst" rotate={-8} className="h-[118px] w-[118px]">
                {TRUST[0]}
              </Sticker>
            </span>
            <span data-parallax="" data-depth="-18" className="absolute right-[6%] top-[8%] block">
              <Sticker tone="accent" shape="pill" rotate={-6} delay={0.8}>
                {TRUST[1]}
              </Sticker>
            </span>
            <span data-parallax="" data-depth="22" className="absolute bottom-[22%] left-[2%] block">
              <Sticker tone="sky" shape="tag" rotate={4} delay={1.6}>
                {TRUST[2]}
              </Sticker>
            </span>
            <span data-parallax="" data-depth="-30" className="absolute -bottom-10 right-[12%] block">
              <Sticker tone="violet" shape="burst" rotate={10} delay={2.4} className="h-[124px] w-[124px]">
                {TRUST[3]}
              </Sticker>
            </span>
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
            <a href={HERO.primaryCta.href} data-magnetic="" className={cn(pillAccent, focus, "px-7 py-4 text-[16px]")}>
              {HERO.primaryCta.label}
            </a>
            <a href={HERO.secondaryCta.href} data-magnetic="" className={cn(pillGhost, focus, "px-7 py-4 text-[16px]")}>
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <Wave className="wave--bottom text-paper" />
    </section>
  );
}
