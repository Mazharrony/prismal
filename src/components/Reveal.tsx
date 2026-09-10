"use client";

import { useEffect } from "react";

/**
 * Scroll reveal for anything carrying `data-rv`. Marks the document as
 * scripted first, so the hidden initial state only ever applies when this
 * observer is there to lift it; without JS the page renders visible. Elements
 * added later (hot reload, remounted forms) are picked up by a MutationObserver
 * so nothing can be left hidden.
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
    const watch = (scope: ParentNode) =>
      scope.querySelectorAll("[data-rv]:not(.is-in)").forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        for (const n of r.addedNodes) {
          if (n instanceof Element) {
            if (n.matches("[data-rv]")) io.observe(n);
            watch(n);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("has-js");
    };
  }, []);
  return null;
}
