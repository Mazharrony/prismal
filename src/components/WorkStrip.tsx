"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Sticker, { type StickerTone } from "@/components/Sticker";
import { CAPABILITY_LABEL, WORK, WORK_HEAD, type Capability } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const TONE: Record<Capability, StickerTone> = {
  websites: "accent",
  "custom-software": "sky",
  "ai-automation": "violet",
};

const arrow =
  "grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/20 bg-transparent text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";

/**
 * A horizontal snap strip of large tilted cards, one per live build. Paged
 * with the arrows, a trackpad, or keyboard once a card is focused.
 */
export default function WorkStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState({ start: true, end: false, index: 1 });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
      setAt({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft >= max - 2,
        index: Math.min(WORK.length, Math.round(el.scrollLeft / (step + 20)) + 1),
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 380;
    el.scrollBy({ left: dir * (step + 20) * 2, behavior: "smooth" });
  };
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <span aria-live="polite" className="font-mono text-[11px] tracking-[.2em] text-muted-2">
          {pad(at.index)} / {pad(WORK.length)}
          <span className="ml-3 max-[860px]:inline min-[861px]:hidden">{WORK_HEAD.swipe}</span>
        </span>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous builds" disabled={at.start} onClick={() => go(-1)} className={cn(arrow, focus)}>
            ←
          </button>
          <button type="button" aria-label="Next builds" disabled={at.end} onClick={() => go(1)} className={cn(arrow, focus)}>
            →
          </button>
        </div>
      </div>

      <div ref={scroller} className="strip max-[860px]:-mx-5 max-[860px]:px-5">
        {WORK.map((w) => (
          <a
            key={w.url}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative grid overflow-hidden rounded-[28px] border border-ink/10 bg-white text-ink shadow-[0_24px_60px_-28px_rgba(11,15,20,.5)] transition-[rotate,translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_32px_70px_-28px_rgba(11,15,20,.6)]",
              focus,
            )}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2">
              <Image
                src={w.image}
                alt={`${w.name} — screenshot of the live site`}
                fill
                sizes="(max-width: 860px) 82vw, 380px"
                className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <Sticker tone={TONE[w.capability]} shape="pill" rotate={-4} className="!absolute left-4 top-4 !animate-none text-[11px]">
                {CAPABILITY_LABEL[w.capability]}
              </Sticker>
            </div>
            <div className="grid gap-2 p-6">
              <h4 className="m-0 font-brand text-[26px] font-medium leading-[1.1]">{w.name}</h4>
              <p className="m-0 text-[15px] leading-[1.5] text-muted-2">{w.built}</p>
              <span className="mt-2 flex items-center justify-between border-t border-ink/10 pt-3 font-mono text-[11px] tracking-[.14em]">
                <span>{w.location ? w.location.toUpperCase() : "LIVE"}</span>
                <span className="text-muted-2">
                  {new URL(w.url).hostname.replace(/^www\./, "")} ↗
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
