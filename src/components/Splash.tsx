"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SITE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";

const RAY_FILL = ["#f9d20f", "#f3efe6", "#98a2ae"];

/**
 * The 1.95s brand splash. Rendered on the server so it is in the first paint,
 * auto-dismissed at 2s, skipped early by any pointerdown, Escape or Space, and
 * not shown at all under prefers-reduced-motion. Choreography in globals.css.
 */
export default function Splash() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let done = false;
    let fade: number | undefined;
    const hide = () => {
      if (done) return;
      done = true;
      el.style.transition = "opacity .3s ease-in";
      el.style.opacity = "0";
      fade = window.setTimeout(() => setGone(true), 320);
      // Release the hero beam now rather than at its 2.05s fallback, so an
      // early skip isn't followed by a dead wait.
      document.documentElement.classList.add("hero-go");
      document
        .querySelectorAll<SVGAnimateMotionElement>(".hero-head animateMotion")
        .forEach((a) => a.beginElement());
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
          <svg viewBox={PRISM_VIEWBOX} className="block h-auto w-[clamp(150px,17vw,232px)] overflow-visible">
            <path className="sp-body" d={PRISM_BODY} fill="#f3efe6" />
            {PRISM_RAYS.map((d, i) => (
              <path key={d} className="sp-ray" d={d} fill={RAY_FILL[i]} style={{ "--i": i } as CSSProperties} />
            ))}
          </svg>
          <div className="grid justify-items-center gap-4">
            <span className="sp-rule h-px w-[clamp(150px,17vw,232px)] bg-paper/20" />
            <span className="sp-word whitespace-nowrap font-brand text-[13px] font-normal text-paper">{SITE.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
