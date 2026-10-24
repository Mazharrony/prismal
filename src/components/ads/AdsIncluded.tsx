import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { ADS_INCLUDED, ADS_META } from "@/content/ad-creatives";
import { eyebrow, focus, h2, pillAccent } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** What every package carries, the two add-ons, the small print and the reel. */
export default function AdsIncluded() {
  return (
    <Band
      id="included"
      tone="ink"
      innerClassName="grid grid-cols-[1fr_minmax(0,520px)] items-start gap-x-20 gap-y-12 max-[1024px]:grid-cols-1"
    >
      <div data-rv>
        <span className={cn(eyebrow, "text-accent")}>{ADS_INCLUDED.eyebrow}</span>
        <Headline className={cn(h2, "mt-4")}>{ADS_INCLUDED.title}</Headline>
        <ul className="m-0 mt-10 grid list-none grid-cols-2 gap-x-8 p-0 max-[520px]:grid-cols-1">
          {ADS_INCLUDED.items.map((it) => (
            <li key={it} className="flex gap-3 border-t border-white/10 py-4 text-[16px] leading-[1.5] text-paper/90">
              <span aria-hidden="true" className="text-accent">✓</span>
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-2">
          {ADS_INCLUDED.terms.map((t) => (
            <p key={t} className="m-0 text-[14px] leading-[1.6] text-muted">
              {t}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-5" data-rv style={{ ["--d" as string]: ".12s" }}>
        <h3 className={cn(eyebrow, "m-0 text-muted")}>{ADS_INCLUDED.addonsTitle}</h3>
        {ADS_INCLUDED.addons.map((a) => (
          <article key={a.name} className="rounded-[28px] border border-white/10 bg-ink-2/70 p-7">
            <h4 className="m-0 font-brand text-[24px] font-medium leading-[1.15]">{a.name}</h4>
            <p className="m-0 mt-3 text-[15px] leading-[1.55] text-paper/80">{a.body}</p>
            <p className="m-0 mt-4 font-mono text-[11px] tracking-[.18em] text-accent">{a.price}</p>
          </article>
        ))}
        <a
          href={ADS_META.reel}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(pillAccent, focus, "mt-2 w-fit px-6 py-4 text-[15px]")}
        >
          {ADS_INCLUDED.reel.label}
        </a>
        <p className="m-0 text-[14px] text-muted">{ADS_INCLUDED.reel.note}</p>
      </div>
    </Band>
  );
}
