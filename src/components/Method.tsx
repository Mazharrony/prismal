import MethodSteps from "@/components/MethodSteps";
import StackCard from "@/components/StackCard";
import { METHOD_HEAD } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Method() {
  const [t1, t2] = METHOD_HEAD.title;
  return (
    <StackCard id="method" top={120} z={5} tone="ink" note={METHOD_HEAD.note}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, #f9d20f2a, transparent 45%), radial-gradient(ellipse at 90% 100%, #0b0f14aa, transparent 50%)",
        }}
      />
      <div className="relative mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className={cn(eyebrow, "text-accent")}>{METHOD_HEAD.eyebrow}</span>
          <h2 className={cn(h2, "mt-3")}>
            {t1}
            <br />
            {t2}
          </h2>
        </div>
      </div>
      <MethodSteps />
    </StackCard>
  );
}
