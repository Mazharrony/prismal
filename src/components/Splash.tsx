"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SITE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";

const RAY_FILL = ["#f9d20f", "#fff", "#64748b"];

/**
 * The 1.95s brand splash. Rendered on the server so it is in the first paint,
 * auto-dismissed at 2s, skipped early by any pointerdown, Escape or Space, and
 * not shown at all under prefers-reduced-motion (CSS hides it and this bails
 * out immediately). The choreography is in globals.css under "Splash".
 */
export default function Splash() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Under reduced motion the CSS already hides the overlay; nothing to time.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let done = false;
    let fade: number | undefined;
    const hide = () => {
      if (done) return;
      done = true;
      el.style.transition = "opacity .3s ease-in";
      el.style.opacity = "0";
      fade = window.setTimeout(() => setGone(true), 320);
    };
    const skip = (e: Event) => {
      if (e.type !== "keydown") return hide();
      const k = (e as globalThis.KeyboardEvent).key;
      if (k === "Escape" || k === " ") hide();
    };
    const auto = window.setTimeout(hide, 2000);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(auto);
      if (fade !== undefined) window.clearTimeout(fade);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="sp-root" aria-hidden="true">
      <div className="sp-panel">
        <div className="grid -translate-y-[4%] justify-items-center gap-[26px] px-6">
          <svg
            viewBox={PRISM_VIEWBOX}
            className="block h-auto w-[clamp(150px,17vw,232px)] overflow-visible"
          >
            <path className="sp-body" d={PRISM_BODY} fill="#fff" />
            {PRISM_RAYS.map((d, i) => (
              <path
                key={d}
                className="sp-ray"
                d={d}
                fill={RAY_FILL[i]}
                style={{ "--i": i } as CSSProperties}
              />
            ))}
          </svg>
          <div className="grid justify-items-center gap-4">
            <span className="sp-rule h-px w-[clamp(150px,17vw,232px)] bg-white/[.18]" />
            <span className="sp-word whitespace-nowrap font-display text-[13px] font-normal text-white">
              {SITE.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
