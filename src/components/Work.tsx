import Image from "next/image";
import StackCard from "@/components/StackCard";
import SwipeHint from "@/components/SwipeHint";
import { WORK, WORK_HEAD } from "@/content/site";
import { eyebrow, monoLine, tile } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * Selected work. The six entries are the handoff's placeholders; a tile shows
 * its screenshot once `image` is set in content/site.ts, and the grey slot
 * until then. On desktop the tiles are horizontal (screenshot left, text
 * right) in a 3×2 grid so the card fits its cascade slot; below 860px they
 * revert to the handoff's portrait tile in a swipe row.
 */
export default function Work() {
  return (
    <StackCard id="work" top={106} z={4} note={WORK_HEAD.note}>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-5">
        <div className="grid flex-[1_1_420px] gap-3">
          <span className={eyebrow}>{WORK_HEAD.eyebrow}</span>
          <h2 className="m-0 font-display text-[clamp(32px,4.4vw,60px)] font-medium leading-[1.02] tracking-[-.02em] max-[860px]:text-[clamp(28px,7.4vw,40px)]">
            {WORK_HEAD.title}
          </h2>
        </div>
        <p className="m-0 flex-[0_1_340px] text-[15px] leading-[1.6] text-muted">
          {WORK_HEAD.intro}
        </p>
      </div>

      <SwipeHint />
      <div className="snap-row mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4 max-[860px]:mt-0 max-[860px]:grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {WORK.map((w) => (
          <a
            key={w.title}
            href="#contact"
            className={cn(
              tile,
              "grid overflow-hidden rounded-[20px] min-[861px]:grid-cols-[minmax(120px,38%)_minmax(0,1fr)] max-[860px]:grid-rows-[auto_1fr] max-[860px]:content-start",
            )}
          >
            <div className="relative bg-line min-[861px]:h-full min-[861px]:min-h-[132px] max-[860px]:aspect-[4/3] max-[860px]:w-full">
              {w.image && (
                <Image
                  src={w.image}
                  alt={`${w.title} — screenshot`}
                  fill
                  sizes="(max-width: 860px) 78vw, 200px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="grid content-start gap-1.5 p-4 max-[860px]:gap-2 max-[860px]:p-5">
              <span className="font-mono text-[10px] tracking-[.2em] text-muted">
                {w.category}
              </span>
              <h4 className="m-0 font-display text-[19px] font-medium leading-[1.15] max-[860px]:text-[22px]">
                {w.title}
              </h4>
              <p className="m-0 text-[13px] leading-[1.45] text-muted max-[860px]:text-[14px] max-[860px]:leading-[1.5]">
                {w.body}
              </p>
              <span
                className={cn(
                  monoLine,
                  "mt-1 border-t border-line pt-2 text-ink",
                )}
              >
                {w.metric}
              </span>
            </div>
          </a>
        ))}
      </div>
    </StackCard>
  );
}
