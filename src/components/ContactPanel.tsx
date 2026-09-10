"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import BriefForm from "@/components/BriefForm";
import { CONTACT, SITE } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const rowLink =
  "flex items-center justify-between rounded-2xl border border-ink/10 bg-paper-2 p-5 font-brand text-[17px] font-semibold text-ink transition-colors hover:bg-accent";

/** The paper form card: a three-tab segmented control over Brief / Email / WhatsApp. */
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
    <div className="relative w-full rounded-[32px] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
      <div role="tablist" aria-label="How to reach us" className="mb-5 grid grid-cols-3 gap-1 rounded-full bg-paper-2 p-1">
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
                "cursor-pointer whitespace-nowrap rounded-full border-0 px-2 py-3 font-brand text-[15px] font-semibold leading-none transition-all duration-150",
                selected ? "bg-ink text-accent" : "bg-transparent text-muted-2 hover:text-ink",
                focus,
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="contact-panel-0" aria-labelledby="contact-tab-0" hidden={tab !== 0}>
        <BriefForm />
      </div>
      <div role="tabpanel" id="contact-panel-1" aria-labelledby="contact-tab-1" hidden={tab !== 1}>
        <a href={`mailto:${SITE.email}`} className={cn(rowLink, focus)}>
          {SITE.email} <span aria-hidden="true">→</span>
        </a>
      </div>
      <div role="tabpanel" id="contact-panel-2" aria-labelledby="contact-tab-2" hidden={tab !== 2}>
        <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className={cn(rowLink, focus)}>
          WhatsApp {SITE.whatsappNumber} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
