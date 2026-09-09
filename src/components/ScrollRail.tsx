"use client";

import { useEffect, useRef } from "react";

/** The 4px rail on the left edge whose fill tracks scroll progress. */
export default function ScrollRail() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fill.current;
    if (!el) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.height = `${p * 100}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-y-0 left-0 z-[60] w-1 bg-line"
    >
      <div ref={fill} className="h-0 w-full bg-ink" />
    </div>
  );
}
