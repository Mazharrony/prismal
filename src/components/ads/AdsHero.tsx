import Headline from "@/components/Headline";
import Sticker, { type StickerTone } from "@/components/Sticker";
import { ADS_HERO } from "@/content/ad-creatives";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";
import { eyebrow, focus, pillAccent, pillGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";

const RAY_FILL = ["#f9d20f", "#f3efe6", "#98a2ae"];
const STICKER: { tone: StickerTone; rotate: number }[] = [
  { tone: "accent", rotate: -4 },
  { tone: "violet", rotate: 3 },
  { tone: "coral", rotate: -2 },
  { tone: "sky", rotate: 4 },
];

/**
 * The ads page's opening screen: the same ink, glows and prism mark as the
 * homepage hero, without the beam. The small line is the h1; the slogan is
 * display copy.
 */
export default function AdsHero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,.32),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.22),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-7 pb-[clamp(96px,12vw,160px)] pt-[clamp(120px,16vh,168px)] max-[860px]:px-5">
        <div className="flex items-center gap-3">
          <svg viewBox={PRISM_VIEWBOX} className="h-7 w-auto flex-none" aria-hidden="true">
            <path d={PRISM_BODY} fill="#f3efe6" />
            {PRISM_RAYS.map((d, i) => (
              <path key={d} d={d} fill={RAY_FILL[i]} />
            ))}
          </svg>
          <h1 className={cn(eyebrow, "m-0 text-muted")}>{ADS_HERO.eyebrow}</h1>
        </div>

        <Headline as="p" lines={ADS_HERO.headline} className="display m-0 mt-8 text-[clamp(64px,10.5vw,176px)]" />

        <p className="m-0 mt-8 max-w-[600px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-paper/85" data-rv>
          {ADS_HERO.intro}
        </p>

        <div className="mt-10 flex flex-wrap gap-3" data-rv>
          <a href={ADS_HERO.primaryCta.href} data-magnetic="" className={cn(pillAccent, focus, "px-7 py-4 text-[16px]")}>
            {ADS_HERO.primaryCta.label}
          </a>
          <a href={ADS_HERO.secondaryCta.href} className={cn(pillGhost, focus, "px-7 py-4 text-[16px] text-paper")}>
            {ADS_HERO.secondaryCta.label}
          </a>
        </div>

        <ul className="m-0 mt-12 flex list-none flex-wrap gap-3 p-0" aria-label="What you get">
          {ADS_HERO.stickers.map((s, i) => (
            <li key={s}>
              <Sticker tone={STICKER[i].tone} rotate={STICKER[i].rotate} delay={i * 0.4}>
                {s}
              </Sticker>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
