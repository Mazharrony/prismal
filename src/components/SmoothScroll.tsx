"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial smooth scrolling (Lenis) on fine-pointer devices. Touch keeps native
 * scrolling; reduced motion keeps everything native. Anchor links go through
 * Lenis so the nav, dock and in-page CTAs glide instead of jumping.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -8 },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
