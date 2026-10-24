import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { ADS_FAQ_HEAD, ADS_FAQS } from "@/content/ad-creatives";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Six questions as a plain two-column list; the same text feeds the FAQPage JSON-LD. */
export default function AdsFaq() {
  return (
    <Band id="faq" tone="paper" flip>
      <div data-rv>
        <span className={cn(eyebrow, "text-muted-2")}>{ADS_FAQ_HEAD.eyebrow}</span>
        <Headline className={cn(h2, "mt-4")}>{ADS_FAQ_HEAD.title}</Headline>
      </div>
      <dl className="m-0 mt-[clamp(32px,4vw,56px)] grid grid-cols-2 gap-x-12 max-[860px]:grid-cols-1">
        {ADS_FAQS.map((f, i) => (
          <div key={f.q} data-rv style={{ ["--d" as string]: `${(i % 2) * 0.1}s` }} className="border-t border-ink/15 py-7">
            <dt className="font-brand text-[clamp(20px,1.8vw,24px)] font-medium leading-[1.25]">{f.q}</dt>
            <dd className="m-0 mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-muted-2">{f.a}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}
