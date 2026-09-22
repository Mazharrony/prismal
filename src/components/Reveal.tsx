"use client";

import { useEffect } from "react";

/** The first sign of a person: any of these arms the reveal. */
const INPUT = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown"] as const;
/** Blocks this close under the fold stay visible rather than being hidden and shown again a moment later. */
const FOLD_SLACK = 24;

/**
 * Scroll reveal for anything carrying `data-rv`, arranged so the page is never
 * hidden from something that only reads it. The HTML paints fully visible.
 * Blocks already on the first screen get `rv-enter` and animate in from the
 * same start state. Everything else is hidden (`rv-armed`) only once a person
 * has moved, scrolled or typed, and only if it is still below the fold at that
 * moment; the observer then lifts each block as it enters. A crawler, a link
 * preview or a screenshot never sends input, so it sees every word. Under
 * prefers-reduced-motion nothing here runs and the CSS shows everything.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight + FOLD_SLACK;
    const arm = (el: Element) => {
      el.classList.add("rv-armed");
      io.observe(el);
    };
    const armBelowFold = (scope: ParentNode) => {
      scope.querySelectorAll("[data-rv]:not(.rv-enter):not(.rv-armed):not(.is-in)").forEach((el) => {
        if (belowFold(el)) arm(el);
      });
    };

    document.querySelectorAll("[data-rv]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("rv-enter");
    });

    let armed = false;
    const onInput = () => {
      if (armed) return;
      armed = true;
      armBelowFold(document);
    };
    INPUT.forEach((type) => window.addEventListener(type, onInput, { once: true, passive: true }));

    // Blocks added later (a remounted form) follow the same rule, and only
    // after a person has shown up; until then nothing is ever hidden.
    const mo = new MutationObserver((records) => {
      if (!armed) return;
      for (const r of records) {
        for (const n of r.addedNodes) {
          if (!(n instanceof Element)) continue;
          if (n.matches("[data-rv]") && belowFold(n)) arm(n);
          armBelowFold(n);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      INPUT.forEach((type) => window.removeEventListener(type, onInput));
    };
  }, []);
  return null;
}
