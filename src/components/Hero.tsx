import type { CSSProperties } from "react";
import Headline from "@/components/Headline";
import Sticker from "@/components/Sticker";
import Wave from "@/components/Wave";
import { HERO, TRUST } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";
import { eyebrow, focus, pillAccent, pillGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";

const RAY_FILL = ["#f9d20f", "#f3efe6", "#98a2ae"];
/**
 * The beam's flourish through the headline in the 1440×620 hero viewBox: in
 * from the left under "NOISE IN.", up across the gap, a loop around the end of
 * "SPECTRUM OUT.", and out to the right.
 */
const BEAM =
  "M-80 360 C 120 250, 300 470, 520 330 S 860 120, 1010 250 C 1120 340, 1030 470, 900 430 C 770 390, 820 230, 1040 200 C 1230 175, 1360 300, 1520 250";
/** Where the hollow nodes sit, as fractions of the path length. */
const NODES = [0.1, 0.32, 0.5, 0.66, 0.84];

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
          <span className={cn(eyebrow, "text-muted")}>{HERO.eyebrow}</span>
        </div>

        <div className="relative mt-8">
          {/* The beam: drawn once on load, dots run along it. */}
          {/* The beam is drawn by a pen nib over ~5s, starting the moment the
              splash lifts: Splash arms it (`html.hero-armed`) and then fires
              `html.hero-go` and the nib's motion in the same call. Hollow
              nodes pop as the nib passes. Without JS the finished line shows.
              The whole drawing drifts with the pointer and eases up on scroll. */}
          <div
            data-parallax=""
            data-depth="10"
            className="pointer-events-none absolute -inset-x-10 -top-16 -bottom-10"
          >
            <svg
              aria-hidden="true"
              className="hero-beam h-full w-full overflow-visible"
              viewBox="0 0 1440 620"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="beam-blur" x="-10%" y="-40%" width="120%" height="180%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path
                className="hero-beam-glow"
                d={BEAM}
                fill="none"
                stroke="#f9d20f"
                strokeWidth="10"
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
                strokeWidth="3.5"
                strokeLinecap="round"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
              />
              <g className="hero-nodes" fill="#0b0f14" stroke="#f9d20f" strokeWidth="3" vectorEffect="non-scaling-stroke">
                {NODES.map((t) => (
                  <circle key={t} r="0" style={{ "--t": t } as CSSProperties}>
                    <animateMotion path={BEAM} keyPoints={`${t};${t}`} keyTimes="0;1" calcMode="linear" dur="0.01s" fill="freeze" />
                  </circle>
                ))}
              </g>
              {/* The nib: tip at the origin, body trailing along −x, so
                  rotate="auto" keeps it pointing along the stroke. */}
              <g className="hero-pen">
                <animateMotion
                  path={BEAM}
                  dur="5s"
                  begin="indefinite"
                  restart="never"
                  fill="freeze"
                  rotate="auto"
                />
                <path d="M0 0 L-26 -9 L-40 -6 L-40 6 L-26 9 Z" fill="#f3efe6" stroke="#0b0f14" strokeWidth="2" strokeLinejoin="round" />
                <path d="M-40 -6 L-82 -5 L-82 5 L-40 6 Z" fill="#f9d20f" stroke="#0b0f14" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="-22" cy="0" r="2.2" fill="#0b0f14" />
                <path d="M-22 0 L-4 0" stroke="#0b0f14" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

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
