import Band from "@/components/Band";
import Headline from "@/components/Headline";
import { BUILD_HEAD, KITS, PILLARS } from "@/content/site";
import { eyebrow, focus, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Site kits: two pillar cards and six kit tiles on ink. */
export default function Build() {
  return (
    <Band id="build" tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div data-rv>
          <span className={cn(eyebrow, "text-accent")}>{BUILD_HEAD.eyebrow}</span>
          <Headline className={cn(h2, "mt-4")}>{BUILD_HEAD.title}</Headline>
        </div>
        <p className="m-0 max-w-[400px] text-[17px] leading-[1.55] text-muted" data-rv style={{ ["--d" as string]: ".1s" }}>
          {BUILD_HEAD.intro}
        </p>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)] grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
        {PILLARS.map((p, i) => {
          const ink = p.tone === "ink";
          return (
            <a
              key={p.title}
              href="#contact"
              data-rv
              data-tilt="5"
              data-cursor="Build"
              style={{ ["--d" as string]: `${i * 0.12}s` }}
              className={cn(
                "group relative grid content-start gap-4 overflow-hidden rounded-[28px] p-8",
                ink ? "border border-white/10 bg-ink-2 text-paper" : "bg-paper text-ink",
                focus,
              )}
            >
              <span className={cn(eyebrow, ink ? "text-accent" : "text-muted-2")}>{p.eyebrow}</span>
              <h3 className="m-0 font-brand text-[clamp(28px,3vw,40px)] font-medium leading-[1.05]">
                {p.title}
              </h3>
              <p className={cn("m-0 text-[16px] leading-[1.55]", ink ? "text-muted" : "text-muted-2")}>
                {p.body}
              </p>
              <span className={cn("mt-2 border-t pt-4 font-mono text-[11px] tracking-[.14em]", ink ? "border-white/10 text-accent" : "border-ink/15 text-ink")}>
                {p.stack}
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
        {KITS.map((k, i) => (
          <a
            key={k.num}
            href="#contact"
            data-rv
            style={{ ["--d" as string]: `${(i % 3) * 0.1}s` }}
            className={cn(
              "grid content-start gap-3 rounded-[24px] border border-white/10 bg-ink-2 p-6 text-paper transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent",
              focus,
            )}
          >
            <span className={cn(eyebrow, "text-muted")}>{k.num}</span>
            <h4 className="m-0 font-brand text-[24px] font-medium leading-[1.1]">{k.title}</h4>
            <p className="m-0 text-[15px] leading-[1.5] text-muted">{k.body}</p>
            <span className="border-t border-white/10 pt-3 font-mono text-[11px] tracking-[.14em] text-paper/80">
              {k.stack}
            </span>
          </a>
        ))}
      </div>
    </Band>
  );
}
