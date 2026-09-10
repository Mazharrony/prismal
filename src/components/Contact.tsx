import Band from "@/components/Band";
import BriefForm from "@/components/BriefForm";
import Footer from "@/components/Footer";
import { CONTACT, SITE } from "@/content/site";
import { eyebrow, focus, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

const route = "group flex items-center justify-between gap-6 border-t border-white/10 py-5";
const routeLabel = "font-mono text-[11px] uppercase tracking-[.2em] text-muted";
const routeValue = "font-brand text-[clamp(18px,1.6vw,22px)] font-medium text-paper transition-colors group-hover:text-accent";

/** The last band: headline and contact rail on the left, the letter on the right. */
export default function Contact() {
  return (
    <Band
      id="contact"
      tone="ink"
      wave={false}
      className="overflow-hidden !pb-8"
      innerClassName="grid grid-cols-[1fr_minmax(0,560px)] items-start gap-x-20 gap-y-14 max-[1024px]:grid-cols-1"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.22),transparent_62%)]"
      />

      <div data-rv>
        <span className={cn(eyebrow, "text-accent")}>{CONTACT.eyebrow}</span>
        <h2 className={cn(h2, "mt-4 text-[clamp(56px,8.5vw,140px)]")}>{CONTACT.title}</h2>
        <p className="m-0 mt-6 max-w-[520px] text-[18px] leading-[1.6] text-paper/85">{CONTACT.intro}</p>

        <dl className="m-0 mt-12 max-w-[520px] border-b border-white/10">
          <div className={route}>
            <dt className={routeLabel}>{CONTACT.rail.email}</dt>
            <dd className="m-0">
              <a href={`mailto:${SITE.email}`} className={cn(routeValue, focus, "rounded")}>
                {SITE.email} <span aria-hidden="true">↗</span>
              </a>
            </dd>
          </div>
          <div className={route}>
            <dt className={routeLabel}>{CONTACT.rail.whatsapp}</dt>
            <dd className="m-0">
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className={cn(routeValue, focus, "rounded")}>
                {SITE.whatsappNumber} <span aria-hidden="true">↗</span>
              </a>
            </dd>
          </div>
          <div className={cn(route, "group-hover:text-paper")}>
            <dt className={routeLabel}>{CONTACT.rail.based}</dt>
            <dd className="m-0 font-brand text-[clamp(18px,1.6vw,22px)] font-medium text-paper">{SITE.location.split(" — ")[0]}</dd>
          </div>
        </dl>
        <p className="m-0 mt-4 font-mono text-[11px] uppercase tracking-[.2em] text-muted">{CONTACT.rail.hours}</p>
      </div>

      <div
        data-rv
        style={{ "--d": ".15s" } as React.CSSProperties}
        className="relative rounded-[32px] border border-white/10 bg-ink-2/70 p-[clamp(24px,3vw,44px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl"
      >
        <BriefForm />
      </div>

      <div className="col-span-full mt-[clamp(48px,8vw,112px)]">
        <Footer />
      </div>
    </Band>
  );
}
