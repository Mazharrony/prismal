"use client";

import { useEffect } from "react";

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

/**
 * Pointer and scroll behaviours that don't belong to one component:
 *
 * - `[data-magnetic]` pills lean a few pixels toward the pointer.
 * - `[data-tilt]` cards tilt in 3D under the pointer.
 * - `[data-parallax]` elements inside `#hero` drift with the pointer by
 *   `data-depth`.
 * - The header tucks away on scroll down and returns on scroll up.
 * - `#scroll-progress` tracks page position.
 * - The marquee takes its speed, direction and lean from scroll velocity.
 *
 * Everything is transform-only and skipped under reduced motion; pointer
 * effects run on fine pointers only.
 */
export default function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    /* ── scroll: header + progress ────────────────────────────────────── */
    const header = document.querySelector<HTMLElement>("header[data-header]");
    const bar = document.getElementById("scroll-progress");
    const heroEl = document.getElementById("hero");
    let last = window.scrollY;
    let raf = 0;

    // Scrollable height, measured when the page changes size rather than on
    // every frame: reading scrollHeight inside the scroll loop forces layout.
    let max = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    cleanups.push(() => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    });

    /* ── marquee: velocity → playback rate and lean ───────────────────── */
    // The marquee keeps its CSS animation; scrolling down speeds it up,
    // scrolling up runs it backwards, and the strip leans into the motion.
    // `dy` is the latest per-frame delta and decays once scrolling stops, so
    // the strip eases back to its idle drift instead of snapping.
    const marquee = document.querySelector<HTMLElement>(".marquee");
    let anims: Animation[] = [];
    let dy = 0;
    let vel = 0;
    let vr = 0;
    // Gains are deliberately soft: a hard flick under Lenis is ~40px a frame,
    // which lands around 3x and 7deg, well short of the clamps. Louder than
    // that reads as frantic rather than responsive.
    const lean = () => {
      vel += (dy - vel) * 0.15;
      dy *= 0.8;
      if (!anims.length && marquee) anims = Array.from(marquee.children).flatMap((c) => c.getAnimations());
      const rate = clamp(1 + vel * 0.05, -4, 4);
      for (const a of anims) a.playbackRate = rate;
      const settled = Math.abs(vel) <= 0.05 && Math.abs(dy) <= 0.05;
      if (marquee) {
        marquee.style.transform = settled ? "" : `skewX(${clamp(-vel * 0.12, -8, 8).toFixed(2)}deg)`;
        // Promote the strip to its own layer only while it is actually moving.
        marquee.style.willChange = settled ? "" : "transform";
      }
      vr = settled ? 0 : requestAnimationFrame(lean);
    };
    cleanups.push(() => cancelAnimationFrame(vr));

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Scroll offset for the hero beam's parallax, capped at one screen.
        if (heroEl && !reduced) heroEl.style.setProperty("--sy", String(Math.min(y, 1200)));
        if (header && !reduced) {
          const down = y > last + 2 && y > 160;
          const up = y < last - 2 || y < 80;
          if (down) header.dataset.hidden = "";
          else if (up) delete header.dataset.hidden;
        }
        if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        if (marquee && !reduced) {
          dy = y - last;
          if (!vr) vr = requestAnimationFrame(lean);
        }
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (!fine || reduced) return () => cleanups.forEach((f) => f());

    /* ── magnetic pills ───────────────────────────────────────────────── */
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transition = "transform .12s";
        el.style.transform = `translate(${clamp(dx, -1, 1) * 6}px, ${clamp(dy, -1, 1) * 5}px)`;
      };
      const leave = () => {
        el.style.transition = "transform .45s cubic-bezier(.2,.8,.2,1)";
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    /* ── tilt cards ───────────────────────────────────────────────────── */
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const max = Number(el.dataset.tilt) || 6;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform .1s";
        el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
      };
      const leave = () => {
        el.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    /* ── hero pointer parallax ────────────────────────────────────────── */
    const hero = document.getElementById("hero");
    if (hero) {
      const layers = Array.from(hero.querySelectorAll<HTMLElement>("[data-parallax]"));
      let tx = 0, ty = 0, cx = 0, cy = 0, pr = 0;
      const tick = () => {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        for (const l of layers) {
          const d = Number(l.dataset.depth) || 20;
          l.style.translate = `${(cx * d).toFixed(1)}px ${(cy * d).toFixed(1)}px`;
        }
        pr = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0;
      };
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        if (!pr) pr = requestAnimationFrame(tick);
      };
      const leave = () => {
        tx = 0;
        ty = 0;
        if (!pr) pr = requestAnimationFrame(tick);
      };
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        cancelAnimationFrame(pr);
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
