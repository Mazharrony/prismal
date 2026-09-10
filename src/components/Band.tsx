import type { ReactNode } from "react";
import Wave from "@/components/Wave";
import { cn } from "@/lib/utils";

export type Tone = "ink" | "paper" | "accent" | "violet";

const BG: Record<Tone, string> = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  accent: "bg-accent text-ink",
  violet: "bg-violet text-paper",
};

const WAVE: Record<Tone, string> = {
  ink: "text-ink",
  paper: "text-paper",
  accent: "text-accent",
  violet: "text-violet",
};

/**
 * A full-bleed section. The wave at its top is filled with the band's own
 * colour and hangs over the previous band, which is what makes the curved
 * seams between colours.
 */
export default function Band({
  id,
  tone,
  wave = true,
  flip = false,
  className,
  innerClassName,
  children,
}: {
  id?: string;
  tone: Tone;
  wave?: boolean;
  /** Mirror the wave so consecutive seams don't repeat. */
  flip?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("band", BG[tone], className)}>
      {wave && <Wave flip={flip} className={WAVE[tone]} />}
      <div
        className={cn(
          "relative mx-auto max-w-[1280px] px-7 max-[860px]:px-5",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
