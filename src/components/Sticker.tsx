import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StickerTone = "accent" | "violet" | "coral" | "sky" | "paper";
type Shape = "burst" | "pill" | "tag";

const TONE: Record<StickerTone, string> = {
  accent: "text-ink [--fill:var(--color-accent)]",
  violet: "text-paper [--fill:var(--color-violet)]",
  coral: "text-paper [--fill:var(--color-coral)]",
  sky: "text-ink [--fill:var(--color-sky)]",
  paper: "text-ink [--fill:var(--color-paper)]",
};

// 14-point starburst, computed once.
const BURST = Array.from({ length: 28 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 28 - Math.PI / 2;
  const r = i % 2 ? 40 : 50;
  return `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`;
}).join(" ");

/**
 * A trust badge in the style of a printed sticker: a burst, a pill, or a
 * skewed tag, slightly rotated and floating. Decorative shapes are
 * aria-hidden; the text is real.
 */
export default function Sticker({
  tone = "accent",
  shape = "pill",
  rotate = 0,
  delay = 0,
  className,
  children,
}: {
  tone?: StickerTone;
  shape?: Shape;
  rotate?: number;
  /** Float animation offset, seconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "sticker",
        `sticker--${shape}`,
        TONE[tone],
        shape === "burst" ? "text-[13px]" : "text-[14px]",
        shape !== "burst" && "rounded-full bg-[var(--fill)]",
        className,
      )}
      style={{ "--r": `${rotate}deg`, "--d": `${delay}s` } as CSSProperties}
    >
      {shape === "burst" && (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <polygon points={BURST} fill="var(--fill)" />
        </svg>
      )}
      <span>{children}</span>
    </span>
  );
}
