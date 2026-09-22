"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, NAV_CTA, SITE } from "@/content/site";
import { focus, pillAccent } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * Full-screen ink drawer. Opened from the header's hamburger below 860px and
 * from the dock's "Menu" at any size. A native <dialog> opened modally gives
 * the focus trap, Escape handling and focus return for free. `base` prefixes
 * the in-page links away from the one-pager, as in Header and Footer.
 */
export default function MobileNav({
  trigger = "header",
  base = "",
}: {
  trigger?: "header" | "dock";
  base?: string;
}) {
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

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const id = `site-menu-${trigger}`;

  return (
    <>
      {trigger === "header" ? (
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(true)}
          className={cn(
            "hidden h-9 w-9 items-center justify-center rounded-full bg-accent text-ink max-[860px]:inline-flex",
            focus,
          )}
        >
          <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
            <path d="M0 1h16M0 5.5h16M0 10h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(true)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold text-paper/80 transition-colors hover:text-paper",
            focus,
          )}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Menu
        </button>
      )}

      <dialog ref={dialog} id={id} aria-label="Menu" className="mnav">
        <div className="mx-auto flex h-full max-w-[1280px] flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-brand text-[14px] font-medium tracking-[.35em] text-paper">
              {SITE.name}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper",
                focus,
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <nav aria-label="Primary" className="mt-12 grid gap-0">
            {NAV.map((l, i) => (
              <a
                key={l.href}
                href={`${base}${l.href}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "display flex items-center justify-between border-t border-white/[.12] py-4 text-[clamp(40px,8vw,88px)] text-paper transition-colors hover:text-accent",
                  focus,
                )}
              >
                {l.label}
                <span className="font-mono text-[11px] tracking-[.2em] text-muted">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>
          <a
            href={`${base}${NAV_CTA.href}`}
            onClick={() => setOpen(false)}
            className={cn(pillAccent, focus, "mt-auto px-6 py-4 text-[16px]")}
          >
            {NAV_CTA.label}
          </a>
        </div>
      </dialog>
    </>
  );
}
