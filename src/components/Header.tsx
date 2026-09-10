import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { NAV, NAV_CTA, SITE } from "@/content/site";
import { focus, pillAccent } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Floating pill nav, centred at the top of the viewport. */
export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5 pl-4">
        <a href="#top" className={cn("mr-2 flex items-center gap-2.5 rounded-full", focus)}>
          <Image
            src="/02-mark-reversed.svg"
            alt=""
            width={29}
            height={20}
            priority
            className="block h-5 w-auto"
          />
          <span className="font-brand text-[13px] font-medium tracking-[.35em] text-paper">
            {SITE.name}
          </span>
        </a>
        <nav aria-label="Primary" className="flex items-center max-[860px]:hidden">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-semibold text-paper/80 transition-colors hover:bg-white/8 hover:text-paper",
                focus,
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={NAV_CTA.href}
          className={cn(pillAccent, focus, "ml-1 px-4 py-2 text-[13px] max-[860px]:hidden")}
        >
          {NAV_CTA.label}
        </a>
        <MobileNav />
      </div>
    </header>
  );
}
