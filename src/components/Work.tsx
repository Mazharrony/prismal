import Band from "@/components/Band";
import Headline from "@/components/Headline";
import WorkStrip from "@/components/WorkStrip";
import { WORK_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Selected work: the twelve live builds as a tilted card strip. */
export default function Work() {
  return (
    <Band id="work" tone="paper" flip>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-muted-2")}>{WORK_HEAD.eyebrow}</span>
          <Headline className={cn(h2, "mt-4")}>{WORK_HEAD.title}</Headline>
        </div>
        <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-muted-2" data-rv style={{ ["--d" as string]: ".1s" }}>
          {WORK_HEAD.intro}
        </p>
      </div>
      <WorkStrip />
    </Band>
  );
}
