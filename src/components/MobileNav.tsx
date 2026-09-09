"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, NAV_CTA, SITE } from "@/content/site";

/**
 * Hamburger + full-height ink drawer for viewports ≤860px, where the pill nav
 * would wrap onto three lines. Uses a native <dialog> opened modally so the
 * browser provides the focus trap, Escape handling and focus return.
 */
export default function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape (or any other native close) must sync React state; and if the
  // viewport grows past the breakpoint the drawer is meaningless, so close it.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener("close", onClose);
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      d.removeEventListener("close", onClose);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink max-[860px]:inline-flex"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
          <path
            d="M0 1h18M0 6h18M0 11h18"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <dialog ref={dialog} id="mobile-nav" aria-label="Menu" className="mnav">
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[14px] font-medium tracking-[.35em] text-white">
              {SITE.name}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <nav aria-label="Primary" className="mt-10 grid gap-1">
            {NAV.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-white/[.14] py-4 font-display text-[28px] font-medium leading-none text-white"
              >
                {l.label}
                <span className="font-mono text-[11px] tracking-[.2em] text-muted">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>
          <a
            href={NAV_CTA.href}
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-[15px] font-bold text-ink"
          >
            {NAV_CTA.label}
          </a>
        </div>
      </dialog>
    </>
  );
}
