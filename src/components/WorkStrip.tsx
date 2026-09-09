"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CAPABILITY_LABEL, WORK, WORK_HEAD } from "@/content/site";
import { eyebrow, tile } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Tiles per page on desktop: three columns × two rows. */
const COLS = 3;
const ROWS = 2;
const PER_PAGE = COLS * ROWS;

const arrowButton =
  "grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-surface disabled:cursor-default disabled:opacity-30";

/**
 * The Selected-work card body: header plus the twelve live builds. On desktop
 * the tiles sit in a two-row strip that pages sideways (arrow buttons under
 * the intro, trackpad, or keyboard once a tile is focused), so the card keeps
 * the height of six tiles and fits its slot in the cascade. Below 860px the
 * same list is the single-row swipe of portrait tiles.
 */
export default function WorkStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(WORK.length / PER_PAGE);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () =>
      setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const first = page * PER_PAGE + 1;
  const last = Math.min(WORK.length, first + PER_PAGE - 1);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-line pb-5">
        <div className="grid flex-[1_1_420px] gap-3">
          <span className={eyebrow}>{WORK_HEAD.eyebrow}</span>
          <h2 className="m-0 font-display text-[clamp(32px,4.4vw,60px)] font-medium leading-[1.02] tracking-[-.02em] max-[860px]:text-[clamp(28px,7.4vw,40px)]">
            {WORK_HEAD.title}
          </h2>
        </div>
        <div className="grid flex-[0_1_340px] gap-2">
          <p className="m-0 text-[15px] leading-[1.6] text-muted">
            {WORK_HEAD.intro}
          </p>
          <div className="flex items-center justify-between gap-4 max-[860px]:hidden">
            <span
              aria-live="polite"
              className="font-mono text-[11px] tracking-[.2em] text-muted"
            >
              {pad(first)}–{pad(last)} / {pad(WORK.length)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous builds"
                disabled={page === 0}
                onClick={() => go(-1)}
                className={arrowButton}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next builds"
                disabled={page >= pages - 1}
                onClick={() => go(1)}
                className={arrowButton}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mb-2 mt-5 hidden font-mono text-[11px] tracking-[.2em] text-muted max-[860px]:block"
      >
        {WORK_HEAD.swipe}
      </p>

      <div
        ref={scroller}
        className="snap-row work-strip mt-5 grid snap-x snap-mandatory grid-flow-col grid-rows-2 gap-4 overflow-x-auto max-[860px]:mt-0"
        style={{ gridAutoColumns: `calc((100% - ${(COLS - 1) * 16}px) / ${COLS})` }}
      >
        {WORK.map((w) => (
          <a
            key={w.url}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              tile,
              "grid snap-start overflow-hidden rounded-[20px] min-[861px]:grid-cols-[minmax(104px,32%)_minmax(0,1fr)] max-[860px]:grid-rows-[auto_1fr] max-[860px]:content-start",
            )}
          >
            <div className="relative bg-line min-[861px]:h-full min-[861px]:min-h-[132px] max-[860px]:aspect-[16/10] max-[860px]:w-full">
              <Image
                src={w.image}
                alt={`${w.name} — screenshot of the live site`}
                fill
                sizes="(max-width: 860px) 78vw, 160px"
                className="object-cover object-left-top"
              />
            </div>
            <div className="grid content-start gap-1 p-3.5 max-[860px]:gap-2 max-[860px]:p-5">
              <span className="font-mono text-[10px] tracking-[.2em] text-muted">
                {CAPABILITY_LABEL[w.capability]}
              </span>
              <h4 className="m-0 font-display text-[19px] font-medium leading-[1.15] max-[860px]:text-[22px]">
                {w.name}
              </h4>
              <p className="m-0 text-[13px] leading-[1.45] text-muted max-[860px]:text-[14px] max-[860px]:leading-[1.5]">
                {w.built}
              </p>
              <span className="mt-1 border-t border-line pt-2 font-mono text-[10px] tracking-[.14em] text-ink">
                {w.location ? `${w.location.toUpperCase()} · ` : ""}
                {new URL(w.url).hostname.replace(/^www\./, "").toUpperCase()} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
