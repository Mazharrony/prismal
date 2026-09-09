import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import StackCard from "@/components/StackCard";
import { CONTACT, SITE } from "@/content/site";
import { eyebrow } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Contact() {
  return (
    <StackCard
      id="contact"
      top={176}
      z={9}
      tone="ink"
      pad="contact"
      note={CONTACT.note}
      sectionClassName="gap-6 pb-6"
      bodyClassName="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] content-center items-center gap-10 max-[860px]:grid-cols-1"
      after={<Footer />}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#f9d20f66,transparent_70%)]"
      />
      <div className="relative">
        <span className={cn(eyebrow, "text-line")}>{CONTACT.eyebrow}</span>
        <h2 className="mb-[18px] mt-3.5 font-display text-[clamp(44px,6vw,88px)] font-medium leading-[.95] tracking-[-.025em]">
          {CONTACT.title}
        </h2>
        <p className="m-0 max-w-[520px] text-[17px] leading-[1.65] text-line">
          {CONTACT.intro}
        </p>
        <p className="m-0 mt-[22px] text-[14px] text-line">{SITE.location}</p>
      </div>
      <ContactPanel />
    </StackCard>
  );
}
