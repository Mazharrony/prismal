"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * The conversions this site actually has: a WhatsApp tap, a call, an email,
 * or a click through to a client's live site. One delegated listener, so
 * links rendered later (the deck, the mobile menu) are covered too.
 * `placement` is the nearest ancestor id — a section, or `top` for the main
 * element — so the dock and the contact band can be told apart.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href") ?? "";
      const placement = a.closest("[id]")?.id || "page";
      if (href.startsWith("https://wa.me/") || href.startsWith("whatsapp:")) track("WhatsApp click", { placement });
      else if (href.startsWith("tel:")) track("Call click", { placement });
      else if (href.startsWith("mailto:")) track("Email click", { placement });
      else if (/^https?:\/\//.test(href) && new URL(href).hostname !== location.hostname) {
        track("Outbound click", { url: href, placement });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
