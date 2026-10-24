import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { ADS_PACKAGES, ADS_PACKAGES_HEAD } from "@/content/ad-creatives";
import { eyebrow, focus, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const CARD = [
  "bg-paper text-ink",
  "bg-ink text-paper",
  "bg-violet text-paper",
  "bg-ink text-paper",
];
const CTA = [
  "bg-ink text-paper hover:bg-ink-3",
  "bg-accent text-ink hover:bg-paper",
  "bg-paper text-ink hover:bg-accent",
  "bg-accent text-ink hover:bg-paper",
];

/** Pilot plus three monthly packages, on the yellow band. */
export default function AdsPackages() {
  return (
    <Band id="packages" tone="accent" flip>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-ink/70")}>{ADS_PACKAGES_HEAD.eyebrow}</span>
          <Headline className={cn(h2, "mt-4")}>{ADS_PACKAGES_HEAD.title}</Headline>
        </div>
        <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-ink/80" data-rv style={{ ["--d" as string]: ".1s" }}>
          {ADS_PACKAGES_HEAD.intro}
        </p>
      </div>

      <div className="mt-[clamp(32px,4vw,48px)] grid grid-cols-4 gap-5 max-[1180px]:grid-cols-2 max-[620px]:grid-cols-1">
        {ADS_PACKAGES.map((p, i) => (
          <article
            key={p.name}
            data-rv
            style={{ ["--d" as string]: `${i * 0.1}s` }}
            className={cn("flex flex-col gap-4 rounded-[28px] p-7", CARD[i])}
          >
            <span className="font-mono text-[11px] tracking-[.2em] opacity-70">0{i + 1}</span>
            <h3 className="display m-0 text-[clamp(44px,4vw,60px)]">{p.name}</h3>
            <div>
              <p className="m-0 font-brand text-[clamp(26px,2.2vw,32px)] font-semibold leading-none">{p.price}</p>
              <p className="m-0 mt-2 font-mono text-[11px] tracking-[.18em] opacity-75">{p.per}</p>
            </div>
            <ul className="m-0 grid list-none gap-2 border-t border-current/20 p-0 pt-5">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-[1.5]">
                  <span aria-hidden="true" className="mt-2.5 h-0.5 w-[18px] flex-none bg-current opacity-60" />
                  {pt}
                </li>
              ))}
            </ul>
            <a
              href="#brief"
              className={cn(
                "group mt-auto inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-brand text-[15px] font-semibold transition-colors",
                CTA[i],
                focus,
              )}
            >
              {p.cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </article>
        ))}
      </div>

      <p className={cn(eyebrow, "mt-6 normal-case tracking-[.14em] text-ink/70")} data-rv>
        {ADS_PACKAGES_HEAD.vat}
      </p>
    </Band>
  );
}
