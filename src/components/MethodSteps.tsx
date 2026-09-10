"use client";

import { useEffect, useState } from "react";
import { STEPS } from "@/content/site";

/**
 * The three Prism Method columns. The active step advances every 2.8s and
 * jumps on hover or focus; the bar above each column fills in its colour and
 * the dot glows while the step is current. Auto-cycling pauses while the tab
 * is hidden and under reduced motion.
 */
export default function MethodSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const sync = () => {
      stop();
      if (reduced.matches || document.hidden) return;
      id = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2800);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="relative grid grid-cols-3 gap-x-8 max-[860px]:grid-cols-1 max-[860px]:gap-y-2">
      {STEPS.map((s, i) => {
        const reached = i <= step;
        const active = i === step;
        return (
          <div
            key={s.num}
            tabIndex={0}
            onMouseEnter={() => setStep(i)}
            onFocus={() => setStep(i)}
            className="relative cursor-default border-t border-white/[.14] pb-4 pt-10 outline-none"
          >
            <div
              className="method-fill absolute inset-x-0 -top-px h-[3px] origin-left"
              style={{ background: s.color, transform: `scaleX(${reached ? 1 : 0})` }}
            />
            <div
              className="absolute -top-[9px] left-0 h-[18px] w-[18px] rounded-full transition-all duration-500"
              style={{
                background: reached ? s.color : "#0b0f14",
                boxShadow: `0 0 0 6px #0b0f14, 0 0 28px ${active ? s.color : "transparent"}`,
              }}
            />
            <span className="font-mono text-[11px] tracking-[.2em]" style={{ color: s.color }}>
              STEP {s.num}
            </span>
            <h3 className="display mb-4 mt-3 text-[clamp(48px,6vw,88px)] text-paper">{s.title}</h3>
            <p
              className="m-0 max-w-[36ch] text-[17px] leading-[1.6] text-muted transition-opacity duration-500"
              style={{ opacity: reached ? 1 : 0.45 }}
            >
              {s.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
