import FaqList from "@/components/FaqList";
import StackCard from "@/components/StackCard";
import { FAQ_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Faq() {
  return (
    <StackCard
      id="faq"
      top={162}
      z={8}
      note={FAQ_HEAD.note}
      bodyClassName="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 max-[860px]:grid-cols-1"
    >
      <div>
        <span className={eyebrow}>{FAQ_HEAD.eyebrow}</span>
        <h2 className={cn(h2, "mb-4 mt-3 text-ink")}>{FAQ_HEAD.title}</h2>
      </div>
      <FaqList />
    </StackCard>
  );
}
