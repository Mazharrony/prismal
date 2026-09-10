import Band from "@/components/Band";
import FaqList from "@/components/FaqList";
import { FAQ_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Faq() {
  return (
    <Band id="faq" tone="paper" flip innerClassName="grid grid-cols-[2fr_3fr] gap-12 max-[860px]:grid-cols-1">
      <div data-rv>
        <span className={cn(eyebrow, "text-muted-2")}>{FAQ_HEAD.eyebrow}</span>
        <h2 className={cn(h2, "mt-4")}>{FAQ_HEAD.title}</h2>
      </div>
      <div data-rv style={{ ["--d" as string]: ".1s" }}>
        <FaqList />
      </div>
    </Band>
  );
}
