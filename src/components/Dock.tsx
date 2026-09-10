"use client";

import { useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";
import { NAV_CTA } from "@/content/site";
import { focus, pillAccent } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * Floating bottom dock: Menu · Start a project · Work. Slides in once the hero
 * has scrolled away and hides while the contact band is on screen, so it
 * never covers the form it points to.
 */
export default function Dock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    let heroGone = false;
    let contactIn = false;
    const apply = () => setShow(heroGone && !contactIn);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroGone = !e.isIntersecting;
          if (e.target === contact) contactIn = e.isIntersecting;
        }
        apply();
      },
      { threshold: 0.15 },
    );
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-[opacity,translate] duration-500",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border border-white/10 bg-ink-2/85 p-1.5 shadow-[0_16px_48px_-12px_rgba(0,0,0,.8)] backdrop-blur-xl",
          show && "pointer-events-auto",
        )}
      >
        <MobileNav trigger="dock" />
        <a
          href={NAV_CTA.href}
          tabIndex={show ? 0 : -1}
          className={cn(pillAccent, focus, "px-4 py-2 text-[13px]")}
        >
          {NAV_CTA.label}
        </a>
        <a
          href="#work"
          tabIndex={show ? 0 : -1}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-paper/80 transition-colors hover:text-paper",
            focus,
          )}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky" />
          Work
        </a>
      </div>
    </div>
  );
}
