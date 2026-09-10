"use client";

import { useEffect, useRef } from "react";

/**
 * The small tag that trails the pointer. It reads "You" by default and takes
 * the label of any `[data-cursor]` target underneath ("View", "Build",
 * "Send"…), growing slightly over anything interactive. The native cursor
 * stays; this only annotates it. Fine pointers only, off under reduced motion.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const label = el.firstElementChild as HTMLElement;

    let x = -100, y = -100, tx = x, ty = y, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add("is-on");
      const t = e.target as Element | null;
      const named = t?.closest<HTMLElement>("[data-cursor]");
      const hot = named ?? t?.closest("a, button, [role=tab], [role=radio], input, textarea, label, .strip");
      const text = named?.dataset.cursor || (t?.closest(".strip") ? "Drag" : "You");
      if (label.textContent !== text) label.textContent = text;
      el.style.setProperty("--s", hot ? "1.15" : "1");
      el.classList.toggle("is-hot", !!named);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-tag" aria-hidden="true">
      <span>You</span>
    </div>
  );
}
