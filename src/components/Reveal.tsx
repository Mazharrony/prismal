"use client";

import { useEffect } from "react";

/**
 * Scroll reveal for anything carrying `data-rv`. Marks the document as
 * scripted first, so the hidden initial state only ever applies when this
 * observer is there to lift it; without JS the page renders visible.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("has-js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-rv]").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("has-js");
    };
  }, []);
  return null;
}
