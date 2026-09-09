"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import BriefForm from "@/components/BriefForm";
import { CONTACT, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

const rowLink =
  "flex items-center justify-between rounded-[14px] border border-line bg-surface p-[18px] font-bold text-ink transition-colors hover:bg-line";

/** The white form card: a three-tab segmented control over Brief / Email / WhatsApp. */
export default function ContactPanel() {
  const [tab, setTab] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = CONTACT.tabs.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setTab(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="relative w-full max-w-[460px] justify-self-end rounded-[24px] bg-white p-[22px] text-ink shadow-[0_24px_48px_-12px_#00000066] max-[860px]:max-w-none">
      <div
        role="tablist"
        aria-label="How to reach us"
        className="mb-[18px] grid grid-cols-3 gap-1 rounded-[14px] bg-surface p-1"
      >
        {CONTACT.tabs.map((label, i) => {
          const selected = tab === i;
          return (
            <button
              key={label}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`contact-tab-${i}`}
              aria-selected={selected}
              aria-controls={`contact-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-[10px] border-0 px-2 py-[11px] font-display text-[16px] font-medium leading-none transition-all duration-150",
                selected ? "bg-ink text-accent" : "bg-transparent text-muted",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="contact-panel-0"
        aria-labelledby="contact-tab-0"
        hidden={tab !== 0}
      >
        <BriefForm />
      </div>
      <div
        role="tabpanel"
        id="contact-panel-1"
        aria-labelledby="contact-tab-1"
        hidden={tab !== 1}
      >
        <a href={`mailto:${SITE.email}`} className={rowLink}>
          {SITE.email} <span aria-hidden="true">→</span>
        </a>
      </div>
      <div
        role="tabpanel"
        id="contact-panel-2"
        aria-labelledby="contact-tab-2"
        hidden={tab !== 2}
      >
        <a
          href={SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={rowLink}
        >
          WhatsApp {SITE.whatsappNumber} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
