"use client";

import Image from "next/image";
import { useState } from "react";
import { CAPABILITY_LABEL, WORK, type Capability } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Tag colour per capability, matching the three service rays. */
const TAG: Record<Capability, string> = {
  websites: "bg-accent text-ink",
  "custom-software": "bg-sky text-ink",
  "ai-automation": "bg-violet text-paper",
};

type Filter = Capability | "all";

const FILTERS: readonly { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "websites", label: "Websites" },
  { key: "custom-software", label: "Software" },
  { key: "ai-automation", label: "AI & automation" },
];

const count = (f: Filter) =>
  f === "all" ? WORK.length : WORK.filter((w) => w.capability === f).length;

/** A chip with nothing behind it is a dead end, so empty capabilities drop out. */
const CHIPS = FILTERS.filter((f) => count(f.key) > 0);

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/**
 * Phones and small tablets only — the deck takes over above 860px.
 * Every live build as a grid: all of them visible at once, each card a
 * screenshot, what we built and a link straight to the site. The capability
 * chips narrow the grid to one of the three rays. A portfolio has to be
 * scannable, so nothing here hides a build behind an interaction.
 */
export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? WORK : WORK.filter((w) => w.capability === filter);

  return (
    <div className="mt-[clamp(32px,4vw,56px)]">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter work by capability">
        {CHIPS.map(({ key, label }) => {
          const on = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(key)}
              data-cursor="Filter"
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-brand text-[14px] font-semibold transition-colors",
                on
                  ? "border-accent bg-accent text-ink"
                  : "border-white/20 text-muted hover:border-white/50 hover:text-paper",
                focus,
              )}
            >
              {label}
              <span className={cn("font-mono text-[11px]", on ? "opacity-60" : "opacity-50")}>
                {count(key)}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {shown.length} of {WORK.length} builds.
      </p>

      <ul className="m-0 mt-[clamp(24px,3vw,36px)] grid list-none grid-cols-3 gap-5 p-0 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
        {shown.map((w, i) => (
          <li
            key={w.url}
            data-rv="pop"
            // Stagger across the row, not down the list: rows enter one at a
            // time anyway, so a per-index delay only made lower rows slow.
            style={{ ["--d" as string]: `${(i % 3) * 0.06}s` }}
            // A featured build takes the whole row, so a lone last card never
            // sits half-empty next to a gap.
            className={cn(w.featured && "col-span-3 max-[1024px]:col-span-2 max-[640px]:col-span-1")}
          >
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit ↗"
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-ink-2 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/70",
                w.featured && "min-[861px]:min-h-[340px] min-[861px]:flex-row",
                focus,
              )}
            >
              <div
                className={cn(
                  "relative aspect-[8/5] overflow-hidden bg-ink-3",
                  w.featured && "min-[861px]:aspect-auto min-[861px]:w-[52%] min-[861px]:shrink-0",
                )}
              >
                {/* Oversized by the drift's reach, so the parallax never shows an edge. */}
                <div data-drift="" className="absolute -inset-y-3.5 inset-x-0">
                  <Image
                    src={w.image}
                    alt={w.alt}
                    fill
                    sizes={w.featured ? "(max-width:860px) 100vw, 660px" : "(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] tracking-[.14em]",
                    TAG[w.capability],
                  )}
                >
                  {CAPABILITY_LABEL[w.capability]}
                </span>
              </div>

              <div
                className={cn(
                  "flex flex-1 flex-col p-6 max-[640px]:p-5",
                  w.featured && "min-[861px]:justify-center min-[861px]:p-9",
                )}
              >
                <h3
                  className={cn(
                    "m-0 font-brand font-semibold leading-tight text-paper",
                    w.featured ? "text-[clamp(22px,2.4vw,32px)]" : "text-[22px]",
                  )}
                >
                  {w.name}
                </h3>
                <p
                  className={cn(
                    "m-0 mt-2 leading-[1.5] text-muted",
                    w.featured ? "max-w-[46ch] text-[clamp(15px,1.3vw,17px)]" : "text-[15px]",
                  )}
                >
                  {w.built}
                </p>
                {w.featured && w.detail && (
                  <p className="m-0 mt-4 max-w-[52ch] text-[14px] leading-[1.6] text-muted">{w.detail}</p>
                )}
                <span
                  className={cn(
                    "mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[11px] tracking-[.14em] text-muted-2",
                    w.featured && "min-[861px]:mt-7",
                  )}
                >
                  <span>{w.location ? w.location.toUpperCase() : "LIVE"}</span>
                  <span className="text-muted transition-colors group-hover:text-accent">
                    {host(w.url)} <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
