"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Sticker, { type StickerTone } from "@/components/Sticker";
import { CAPABILITY_LABEL, WORK, type Capability } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const N = WORK.length;
/** Cards further than this from the front are folded away. */
const REACH = 5;

const STICKER: Record<Capability, StickerTone> = {
  websites: "accent",
  "custom-software": "sky",
  "ai-automation": "violet",
};
/** Spine colours cycle by position so the fan reads as a deck, not a row of one colour. */
const SPINE = ["bg-accent text-ink", "bg-paper text-ink", "bg-sky text-ink", "bg-violet text-paper"];

const pad = (n: number) => String(n).padStart(2, "0");
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
const arrow =
  "grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/20 bg-ink-2/70 text-paper backdrop-blur transition-colors hover:bg-accent hover:text-ink";

/** Prism rays turning slowly behind the deck: the brand's answer to crency's star. */
function Burst() {
  const rays = Array.from({ length: 18 }, (_, i) => (360 / 18) * i);
  return (
    <svg aria-hidden="true" className="deck-burst" viewBox="-500 -500 1000 1000">
      <g className="deck-burst-a" fill="#7c5cff">
        <polygon points="0,-500 60,-60 500,0 60,60 0,500 -60,60 -500,0 -60,-60" />
        <polygon points="0,-360 40,-40 360,0 40,40 0,360 -40,40 -360,0 -40,-40" transform="rotate(45)" opacity=".7" />
      </g>
      <g className="deck-burst-b" fill="#f9d20f" opacity=".55">
        {rays.map((r) => (
          <polygon key={r} points="0,0 -14,-470 14,-470" transform={`rotate(${r})`} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The builds as a card deck, desktop only (the grid takes over at 860px).
 * One card in front, the rest fanned out behind it on both sides with the
 * client name on a coloured spine. Every card is the same shape — the whole
 * 8:5 screenshot on top, a paper strip with the name, a line and the link
 * below — so bringing one forward never crops the site it shows. Any spine,
 * the arrows, the arrow keys or a swipe brings another build to the front.
 * Cards stay mounted and only change transforms, so every move is one
 * smooth transition.
 */
export default function WorkDeck() {
  const [active, setActive] = useState(0);
  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + N) % N), []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  // Swipe / drag: a horizontal move of 40px or more flips a card.
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: PointerEvent) => {
    if (e.button === 0) startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) >= 40) go(dx < 0 ? 1 : -1);
  };

  const current = WORK[active];

  return (
    <div className="mt-[clamp(32px,4vw,56px)]">
      <div
        className={cn("deck", focus)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
        // Images and links would start a native drag and cancel the swipe.
        onDragStart={(e) => e.preventDefault()}
      >
        <Burst />
        {WORK.map((w, i) => {
          const o = (i - active + N) % N;
          const right = o <= N / 2;
          const d = o === 0 ? 0 : right ? o : N - o;
          const side = o === 0 ? 0 : right ? 1 : -1;
          const isActive = o === 0;
          const hidden = d > REACH;
          return (
            <article
              key={w.url}
              className={cn(
                "deck-card",
                isActive && "is-active",
                hidden && "is-hidden",
                side < 0 && "is-left",
                side > 0 && "is-right",
              )}
              style={{ "--side": side, "--d": d, zIndex: isActive ? 20 : 12 - d } as CSSProperties}
              aria-hidden={!isActive}
            >
              <div className="deck-face">
                <Image src={w.image} alt="" fill sizes="560px" className="object-cover" draggable={false} />
                <span className="deck-shade" aria-hidden="true" />
                <Sticker tone={STICKER[w.capability]} shape="pill" rotate={-4} className="!absolute left-4 top-4 !animate-none text-[11px]">
                  {CAPABILITY_LABEL[w.capability]}
                </Sticker>
              </div>

              <div className="deck-info">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="m-0 font-brand text-[22px] font-semibold leading-tight text-ink">{w.name}</h3>
                    <p className="m-0 mt-1.5 line-clamp-2 text-[14px] leading-[1.5] text-muted-2">{w.built}</p>
                  </div>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    data-cursor="Visit ↗"
                    data-magnetic=""
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2.5 font-brand text-[14px] font-semibold text-accent transition-colors hover:bg-ink-3",
                      focus,
                    )}
                  >
                    Visit the site <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 font-mono text-[11px] tracking-[.14em] text-ink">
                  <span>{w.location ? w.location.toUpperCase() : "LIVE"}</span>
                  <span className="text-muted-2">{host(w.url)}</span>
                </span>
              </div>

              {/* The whole card is the hit area while it sits in the fan; it fades
                  out in front so the link underneath can be clicked. */}
              <button
                type="button"
                className={cn("deck-hit", focus)}
                onClick={() => setActive(i)}
                tabIndex={isActive || hidden ? -1 : 0}
                aria-label={`Show ${w.name}`}
                data-cursor="Open"
              >
                <span className={cn("deck-spine", SPINE[i % SPINE.length])} aria-hidden="true">
                  {w.name}
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button type="button" aria-label="Previous build" onClick={() => go(-1)} className={cn(arrow, focus)}>
          ←
        </button>
        <span aria-live="polite" className="min-w-[9ch] text-center font-mono text-[12px] tracking-[.2em] text-muted">
          {pad(active + 1)} / {pad(N)} · <span className="sr-only">{current.name}</span>
          <span aria-hidden="true">{current.name.toUpperCase()}</span>
        </span>
        <button type="button" aria-label="Next build" onClick={() => go(1)} className={cn(arrow, focus)}>
          →
        </button>
      </div>
    </div>
  );
}
