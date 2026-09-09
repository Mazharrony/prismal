import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { note as noteClass } from "@/lib/styles";

type Tone = "white" | "ink" | "accent";
type Pad = "card" | "hero" | "contact";

// `--card-bg` feeds the fade the cascade CSS paints over a tall card's top
// edge while its body is shifted.
const TONE: Record<Tone, string> = {
  white:
    "bg-white border border-line shadow-[0_-16px_48px_-12px_#0b0f1440] [--card-bg:#fff]",
  ink: "bg-ink text-white shadow-[0_-16px_48px_-12px_#0b0f1466] [--card-bg:#0b0f14]",
  accent: "bg-accent shadow-[0_-16px_48px_-12px_#0b0f1440] [--card-bg:#f9d20f]",
};

const PAD: Record<Pad, string> = {
  card: "p-[clamp(28px,4vw,48px)] max-[860px]:px-5 max-[860px]:py-6",
  // The vh term trims the hero's vertical padding on short viewports so the
  // card still fits (and pins) at 900px tall, where the design's 64px overflows.
  hero: "py-[min(clamp(36px,5vw,64px),5vh)] px-[clamp(24px,4vw,56px)] max-[860px]:px-5 max-[860px]:py-7",
  contact:
    "py-[clamp(36px,5vw,64px)] px-[clamp(28px,4vw,48px)] max-[860px]:px-5 max-[860px]:py-7",
};

/**
 * One card of the cascade. The `<section>` is the sticky element (pinned by
 * StackController via `data-pinned`), the inner `.stack-card` is the rounded
 * card that recedes as the next section covers it, `.stack-veil` is the dim
 * overlay the cascade CSS drives, and `.stack-body` holds the content so a
 * card taller than the viewport can scroll it inside the clipped card. The
 * Caveat note is decorative.
 */
export default function StackCard({
  id,
  top,
  z,
  tone = "white",
  pad = "card",
  hero = false,
  note,
  sectionClassName,
  cardClassName,
  bodyClassName,
  children,
  after,
}: {
  id?: string;
  /** Sticky offset in px; also sets the card's viewport min-height. */
  top: number;
  z: number;
  tone?: Tone;
  pad?: Pad;
  /** Hero uses the lighter resting shadow instead of the upward cascade lip. */
  hero?: boolean;
  /** Handwritten note pinned top-right of the card. */
  note?: string;
  sectionClassName?: string;
  cardClassName?: string;
  /** Classes for the `.stack-body` wrapper (layout of the card's content). */
  bodyClassName?: string;
  children: ReactNode;
  /** Rendered inside the section but outside the card (the footer). */
  after?: ReactNode;
}) {
  return (
    <>
    <section
      id={id}
      data-stack=""
      className={cn("stack", sectionClassName)}
      style={{ "--stack-top": `${top}px`, zIndex: z } as CSSProperties}
    >
      <div
        className={cn(
          "stack-card rounded-[32px] max-[860px]:rounded-[24px]",
          TONE[tone],
          hero && "shadow-[0_1px_2px_0_#0b0f140f,0_4px_12px_-2px_#0b0f1414]",
          PAD[pad],
          cardClassName,
        )}
      >
        <div className="stack-veil" aria-hidden="true" />
        {note && (
          <p
            aria-hidden="true"
            className={cn(noteClass, tone === "ink" ? "text-line" : "text-ink")}
          >
            {note}
          </p>
        )}
        <div className={cn("stack-body", bodyClassName)}>{children}</div>
      </div>
      {after}
    </section>
    {/* Scroll distance for a card taller than its slot (height set by
        StackController). Must be a sibling: extra height or margin on the
        sticky section itself would let the containment rule push it up. */}
    <div className="stack-spacer" aria-hidden="true" />
    </>
  );
}
