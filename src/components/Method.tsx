import Band from "@/components/Band";
import Headline from "@/components/Headline";
import MethodSteps from "@/components/MethodSteps";
import { METHOD_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Method() {
  const [t1, t2] = METHOD_HEAD.title;
  return (
    <Band id="method" tone="ink" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.18),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,.28),transparent_62%)]"
      />
      <div data-rv>
        <span className={cn(eyebrow, "text-accent")}>{METHOD_HEAD.eyebrow}</span>
        <Headline className={cn(h2, "mt-4")} lines={[t1, t2]} />
      </div>
      <div className="mt-[clamp(40px,6vw,80px)]" data-rv style={{ ["--d" as string]: ".15s" }}>
        <MethodSteps />
      </div>
    </Band>
  );
}
