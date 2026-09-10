import { FAQS, SITE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

const Avatar = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn("grid h-7 w-7 flex-none place-items-center rounded-full bg-ink", className)}
  >
    <svg viewBox={PRISM_VIEWBOX} className="h-2.5 w-auto">
      <path d={PRISM_BODY} fill="#f3efe6" />
      {PRISM_RAYS.map((d) => (
        <path key={d} d={d} fill="#f9d20f" />
      ))}
    </svg>
  </span>
);

/**
 * The FAQ as a chat thread inside a phone. Questions are outgoing bubbles,
 * answers are Prismal's replies, the thread scrolls inside the screen, and the
 * message bar at the bottom links to the brief. Semantically a definition
 * list; the device chrome is decorative.
 */
export default function FaqList() {
  return (
    <div className="phone mx-auto w-full max-w-[400px]" data-rv>
      {/* Frame */}
      <div className="relative rounded-[54px] bg-ink p-[10px] shadow-[0_50px_100px_-30px_rgba(11,15,20,.6),inset_0_0_0_1px_rgba(255,255,255,.08)]">
        <span aria-hidden="true" className="absolute -left-[3px] top-[120px] h-8 w-[3px] rounded-l bg-ink-3" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[168px] h-14 w-[3px] rounded-l bg-ink-3" />
        <span aria-hidden="true" className="absolute -left-[3px] top-[236px] h-14 w-[3px] rounded-l bg-ink-3" />
        <span aria-hidden="true" className="absolute -right-[3px] top-[190px] h-20 w-[3px] rounded-r bg-ink-3" />

        {/* Screen */}
        <div className="relative flex h-[740px] flex-col overflow-hidden rounded-[44px] bg-paper max-[420px]:h-[680px]">
          {/* Status bar + island */}
          <div className="relative flex items-center justify-between px-8 pb-2 pt-4 font-brand text-[14px] font-semibold text-ink" aria-hidden="true">
            <span>9:41</span>
            <span className="absolute left-1/2 top-3 h-[30px] w-[108px] -translate-x-1/2 rounded-full bg-ink" />
            <span className="flex items-center gap-1.5">
              <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="3" height="4" rx=".6" fill="currentColor" /><rect x="4.5" y="5" width="3" height="6" rx=".6" fill="currentColor" /><rect x="9" y="2.5" width="3" height="8.5" rx=".6" fill="currentColor" /><rect x="13.5" y="0" width="2.5" height="11" rx=".6" fill="currentColor" /></svg>
              <svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="3" fill="none" stroke="currentColor" /><rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" /><rect x="21.5" y="3.5" width="2" height="4" rx="1" fill="currentColor" opacity=".5" /></svg>
            </span>
          </div>

          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-ink/10 px-5 pb-3 pt-1">
            <Avatar className="h-9 w-9" />
            <div className="grid leading-tight">
              <span className="font-brand text-[14px] font-semibold tracking-[.2em] text-ink">{SITE.name}</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-muted-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                Online · replies in 1h
              </span>
            </div>
          </div>

          {/* Thread */}
          <dl className="phone-thread m-0 grid flex-1 content-start gap-5 overflow-y-auto overscroll-contain px-4 py-5">
            <span className="justify-self-center font-mono text-[10px] uppercase tracking-[.16em] text-muted-2" aria-hidden="true">
              Today
            </span>
            {FAQS.map((f) => (
              <div key={f.q} className="grid gap-2">
                <dt className="flex justify-end">
                  <span className="max-w-[82%] rounded-[20px] rounded-br-[6px] bg-ink px-4 py-2.5 font-brand text-[15px] font-medium leading-[1.3] text-paper">
                    {f.q}
                  </span>
                </dt>
                <dd className="m-0 flex items-end gap-2">
                  <Avatar />
                  <span className="max-w-[86%] rounded-[20px] rounded-bl-[6px] bg-paper-2 px-4 py-3 text-[14px] leading-[1.55] text-ink">
                    {f.a}
                  </span>
                </dd>
              </div>
            ))}
            <div className="flex items-end gap-2" aria-hidden="true">
              <Avatar />
              <span className="flex items-center gap-1 rounded-[20px] rounded-bl-[6px] bg-paper-2 px-3.5 py-3">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/50" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/50" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/50" />
              </span>
            </div>
          </dl>

          {/* Message bar */}
          <div className="border-t border-ink/10 px-4 pb-6 pt-3">
            <a
              href="#contact"
              data-cursor="Ask"
              className={cn(
                "flex items-center justify-between rounded-full border border-ink/15 bg-white py-2 pl-4 pr-1.5 font-sans text-[14px] text-muted-2 transition-colors hover:border-ink",
                focus,
              )}
            >
              Ask your own question…
              <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-accent text-ink">
                ↑
              </span>
            </a>
            <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-28 rounded-full bg-ink/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
