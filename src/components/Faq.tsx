import Band from "@/components/Band";
import FaqList from "@/components/FaqList";
import { FAQ_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Faq() {
  return (
    <Band id="faq" tone="paper" flip innerClassName="grid grid-cols-[1fr_minmax(0,440px)] items-center gap-x-16 gap-y-12 max-[860px]:grid-cols-1">
      <div data-rv className="self-start min-[861px]:sticky min-[861px]:top-32">
        <span className={cn(eyebrow, "text-muted-2")}>{FAQ_HEAD.eyebrow}</span>
        <h2 className={cn(h2, "mt-4")}>{FAQ_HEAD.title}</h2>
        <p className="m-0 mt-6 max-w-[38ch] text-[17px] leading-[1.55] text-muted-2">
          The questions every client asks first, answered the way we answer them on WhatsApp.
        </p>
      </div>
      <FaqList />
    </Band>
  );
}
