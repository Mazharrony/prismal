import StackCard from "@/components/StackCard";
import SwipeHint from "@/components/SwipeHint";
import { BUILD_HEAD, KITS, PILLARS } from "@/content/site";
import { eyebrow, monoLine, tile } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * What we build. On desktop the two pillar cards stack in a left column and
 * the six kits form a 3×2 grid beside them, so the whole card fits its slot in
 * the cascade at ordinary laptop heights (the handoff's stacked rows ran ~350px
 * taller than the viewport allows). Below 860px the pillars stack and the kits
 * become a swipe row.
 */
export default function Build() {
  return (
    <StackCard id="build" top={92} z={3} note={BUILD_HEAD.note}>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-5">
        <div className="grid flex-[1_1_420px] gap-3">
          <span className={eyebrow}>{BUILD_HEAD.eyebrow}</span>
          <h2 className="m-0 font-display text-[clamp(32px,4.4vw,60px)] font-medium leading-[1.02] tracking-[-.02em] max-[860px]:text-[clamp(28px,7.4vw,40px)]">
            {BUILD_HEAD.title}
          </h2>
        </div>
        <p className="m-0 flex-[0_1_340px] text-[15px] leading-[1.6] text-muted">
          {BUILD_HEAD.intro}
        </p>
      </div>

      {/* minmax(0,…) tracks: an auto track would size to the swipe row's
          unwrapped content and overflow the phone screen. */}
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 min-[861px]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="grid min-w-0 content-start gap-4">
          {PILLARS.map((p) => {
            const ink = p.tone === "ink";
            return (
              <a
                key={p.title}
                href="#contact"
                className={cn(
                  "relative grid content-start gap-2.5 overflow-hidden rounded-[22px] p-[clamp(16px,1.6vw,20px)] transition-transform duration-200 hover:-translate-y-[3px] max-[860px]:gap-3 max-[860px]:p-6",
                  ink ? "bg-ink text-white" : "border border-ink bg-white text-ink",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[.2em]",
                    ink ? "text-accent" : "text-muted",
                  )}
                >
                  {p.eyebrow}
                </span>
                <h3 className="m-0 font-display text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.08] max-[860px]:text-[clamp(24px,6vw,30px)]">
                  {p.title}
                </h3>
                <p
                  className={cn(
                    "m-0 text-[14px] leading-[1.55]",
                    ink ? "text-line" : "text-muted",
                  )}
                >
                  {p.body}
                </p>
                <span
                  className={cn(
                    monoLine,
                    "border-t pt-3 max-[520px]:break-words",
                    ink ? "border-white/[.18] text-accent" : "border-line text-ink",
                  )}
                >
                  {p.stack}
                </span>
              </a>
            );
          })}
        </div>

        <div className="min-w-0">
          <SwipeHint />
          <div className="snap-row grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3 max-[860px]:grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] max-[860px]:gap-4">
            {KITS.map((k) => (
              <a
                key={k.num}
                href="#contact"
                className={cn(
                  tile,
                  "grid content-start gap-2 rounded-[18px] p-4 max-[860px]:gap-2.5 max-[860px]:p-[22px] max-[520px]:px-4 max-[520px]:py-[18px]",
                )}
              >
                <span className="font-mono text-[10px] tracking-[.2em] text-muted">
                  {k.num}
                </span>
                <h4 className="m-0 font-display text-[19px] font-medium leading-[1.15] max-[860px]:text-[21px]">
                  {k.title}
                </h4>
                <p className="m-0 text-[13px] leading-[1.45] text-muted max-[860px]:text-[14px] max-[860px]:leading-[1.5]">
                  {k.body}
                </p>
                <span
                  className={cn(
                    monoLine,
                    "border-t border-line pt-2.5 text-ink max-[520px]:break-words",
                  )}
                >
                  {k.stack}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </StackCard>
  );
}
