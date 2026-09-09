import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { NAV, NAV_CTA, SITE } from "@/content/site";
import { pillDark, pillLight } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[rgba(246,247,249,.85)] backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-7 py-3.5 max-[860px]:px-4">
        <a href="#top" className="flex items-center gap-2.5 text-ink">
          <Image
            src="/01-mark-primary.svg"
            alt=""
            width={32}
            height={22}
            priority
            className="block h-[22px] w-auto"
          />
          <span className="font-display text-[14px] font-medium tracking-[.35em]">
            {SITE.name}
          </span>
        </a>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-2 max-[860px]:hidden"
        >
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(pillLight, "px-4 py-[9px] text-[13px]")}
            >
              {l.label}
            </a>
          ))}
          <a
            href={NAV_CTA.href}
            className={cn(pillDark, "px-[18px] py-[9px] text-[13px]")}
          >
            {NAV_CTA.label}
          </a>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
