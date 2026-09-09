"use client";

import { useState } from "react";
import { FAQS } from "@/content/site";
import { cn } from "@/lib/utils";

/** Single-open accordion: item 0 starts open; toggling the open item closes all. */
export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid content-start">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={f.q} className="border-t border-line">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent py-[18px] text-left font-display text-[22px] font-medium leading-[1.3] text-ink"
            >
              <span className="block min-w-0 flex-auto">{f.q}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-8 w-8 flex-none place-items-center rounded-full font-sans text-[18px] transition-all duration-200",
                  isOpen ? "bg-ink text-accent" : "bg-surface text-ink",
                )}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="m-0 pb-5 pr-12 text-[15px] leading-[1.65] text-ink">
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
