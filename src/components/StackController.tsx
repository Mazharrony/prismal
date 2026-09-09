"use client";

import { useEffect } from "react";

const MOBILE = "(max-width: 860px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
/** The vertical step between consecutive pinned cards (64 → 78 → 92 …). */
const STEP = 14;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Drives the card cascade. Renders nothing; it owns three behaviours on the
 * `[data-stack]` sections that StackCard renders:
 *
 * 1. Pinning by measurement — every section pins at its designed offset. One
 *    whose card fits the slot below that offset is `data-pinned="true"` and
 *    stretches to the viewport. One whose card is taller is `data-pinned="tall"`:
 *    the section is clamped to the slot, its card clips, and the extra content
 *    height becomes a spacer after the section — scroll distance during which
 *    the card's body is translated up (`--stack-shift`) so every line is
 *    reachable (a margin on the sticky section would instead let the sticky
 *    containment rule push the card off the top at the page end) — then the
 *    next card slides over as usual. The card's top edge and the lips of the
 *    cards behind it never move. This replaces the handoff's fixed
 *    `min-height: 900px` media query, under which a tall card hid its own
 *    lower half.
 * 2. Depth — as the next card slides over a pinned one, `--stack-progress`
 *    goes 0 → 1 and the CSS scales and dims the covered card. One passive
 *    scroll listener, one rAF per frame, transform/opacity only.
 * 3. Mobile reveal — below 860px nothing pins; instead each card fades and
 *    rises in once when it enters the viewport.
 */
export default function StackController() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stack]"),
    );
    if (!sections.length) return;
    const cards = sections.map(
      (s) => s.querySelector<HTMLElement>(".stack-card") ?? s,
    );
    const bodies = sections.map(
      (s) => s.querySelector<HTMLElement>(".stack-body") ?? s,
    );
    const spacers = sections.map((s) => {
      const n = s.nextElementSibling as HTMLElement | null;
      return n?.classList.contains("stack-spacer") ? n : null;
    });
    const flow = sections[0].parentElement as HTMLElement;

    const mobile = window.matchMedia(MOBILE);
    const reduced = window.matchMedia(REDUCED);
    const topOf = (s: HTMLElement) =>
      parseFloat(getComputedStyle(s).getPropertyValue("--stack-top")) || 0;
    /** Extra scroll distance per section (0 unless tall). */
    const extra = sections.map(() => 0);

    /* ── 1. pinning ──────────────────────────────────────────────────── */
    const measure = () => {
      const vh = window.innerHeight;
      sections.forEach((s, i) => {
        const setExtra = (px: number) => {
          extra[i] = px;
          const sp = spacers[i];
          if (sp) sp.style.height = px ? `${px}px` : "";
          if (px) s.style.setProperty("--stack-extra", String(px));
          else {
            s.style.removeProperty("--stack-extra");
            s.style.removeProperty("--stack-shift");
          }
        };
        if (mobile.matches) {
          delete s.dataset.pinned;
          setExtra(0);
          return;
        }
        const card = cards[i];
        const cs = getComputedStyle(card);
        const chrome =
          parseFloat(cs.paddingTop) +
          parseFloat(cs.paddingBottom) +
          parseFloat(cs.borderTopWidth) +
          parseFloat(cs.borderBottomWidth);
        // The body's layout height is the card's real content height whatever
        // state the card is in (stretched, clipped, or natural), so swapping it
        // for the card's current height gives the section's natural height.
        const naturalCard = bodies[i].offsetHeight + chrome;
        const natural = s.offsetHeight - card.offsetHeight + naturalCard;
        const slot = vh - topOf(s);
        if (natural <= slot + 1) {
          s.dataset.pinned = "true";
          setExtra(0);
        } else {
          s.dataset.pinned = "tall";
          setExtra(Math.round(natural - slot));
        }
      });
    };

    /* ── 2. depth + tall-card body shift ─────────────────────────────── */
    let raf = 0;
    const setVar = (s: HTMLElement, name: string, v: number) =>
      s.style.setProperty(name, v.toFixed(3));
    const update = () => {
      raf = 0;
      if (mobile.matches) return;
      // Static (unstuck) top of each section: the flow container's document
      // position plus the heights of everything before it (sections and their
      // spacers). offsetTop can't be used — browsers report a sticky element's
      // current stuck position.
      let cursor = flow.getBoundingClientRect().top + window.scrollY;
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        const staticTop = cursor;
        cursor += s.offsetHeight + (spacers[i]?.offsetHeight ?? 0);

        if (s.dataset.pinned === "tall") {
          const stuckFor = window.scrollY + topOf(s) - staticTop;
          setVar(s, "--stack-shift", Math.min(extra[i], Math.max(0, stuckFor)));
        }

        if (i === sections.length - 1 || !s.dataset.pinned || reduced.matches) {
          setVar(s, "--stack-progress", 0);
          continue;
        }
        const card = cards[i];
        const cardTop = s.getBoundingClientRect().top + card.offsetTop;
        const cardBottom = cardTop + card.offsetHeight;
        const next = sections[i + 1];
        const nextTop = next.getBoundingClientRect().top + cards[i + 1].offsetTop;
        const range = Math.max(1, card.offsetHeight - STEP);
        setVar(s, "--stack-progress", clamp01((cardBottom - nextTop) / range));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    /* ── 3. mobile reveal ────────────────────────────────────────────── */
    let io: IntersectionObserver | undefined;
    const reveal = () => {
      io?.disconnect();
      io = undefined;
      if (!mobile.matches || reduced.matches) {
        cards.forEach((c) => delete c.dataset.reveal);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const c = e.target as HTMLElement;
            if (e.isIntersecting) {
              c.dataset.reveal = "in";
              io?.unobserve(c);
            } else if (!c.dataset.reveal) {
              // Off-screen and never shown: hide it until it scrolls in.
              c.dataset.reveal = "pending";
            }
          }
        },
        { threshold: 0.15 },
      );
      cards.forEach((c) => io?.observe(c));
    };

    const refresh = () => {
      measure();
      update();
      reveal();
    };

    refresh();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    bodies.forEach((b) => ro.observe(b));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    mobile.addEventListener("change", refresh);
    reduced.addEventListener("change", refresh);

    return () => {
      ro.disconnect();
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refresh);
      mobile.removeEventListener("change", refresh);
      reduced.removeEventListener("change", refresh);
    };
  }, []);

  return null;
}
