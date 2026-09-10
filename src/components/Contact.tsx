import Band from "@/components/Band";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import { CONTACT, SITE } from "@/content/site";
import { eyebrow, h2 } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Contact() {
  return (
    <Band
      id="contact"
      tone="ink"
      wave={false}
      className="overflow-hidden !pb-8"
      innerClassName="grid grid-cols-[1.1fr_1fr] items-center gap-12 max-[1024px]:grid-cols-1"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.28),transparent_62%)]"
      />
      <div data-rv>
        <span className={cn(eyebrow, "text-accent")}>{CONTACT.eyebrow}</span>
        <h2 className={cn(h2, "mt-4 text-[clamp(56px,9vw,150px)]")}>{CONTACT.title}</h2>
        <p className="m-0 mt-6 max-w-[520px] text-[18px] leading-[1.6] text-paper/85">{CONTACT.intro}</p>
        <p className="m-0 mt-5 text-[14px] text-muted">{SITE.location}</p>
      </div>
      <div data-rv style={{ ["--d" as string]: ".15s" }}>
        <ContactPanel />
      </div>
      <div className="col-span-full mt-[clamp(48px,8vw,112px)]">
        <Footer />
      </div>
    </Band>
  );
}
