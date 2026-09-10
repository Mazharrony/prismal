"use client";

import { useState } from "react";
import { FAQS } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Single-open accordion: item 0 starts open; toggling the open item closes all. */
export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid content-start border-b border-ink/15">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={f.q} className="border-t border-ink/15">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-5 text-left font-brand text-[clamp(20px,2vw,26px)] font-medium leading-[1.25] text-ink",
                focus,
              )}
            >
              <span className="block min-w-0 flex-auto">{f.q}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-9 w-9 flex-none place-items-center rounded-full font-sans text-[20px] transition-all duration-200",
                  isOpen ? "rotate-45 bg-ink text-accent" : "bg-ink/10 text-ink",
                )}
              >
                +
              </span>
            </button>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="m-0 max-w-[60ch] pb-6 text-[16px] leading-[1.65] text-muted-2">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
