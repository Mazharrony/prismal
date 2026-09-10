import Image from "next/image";
import { FOOTER_NAV, SITE } from "@/content/site";
import { focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 text-paper">
      <a href="#top" className={cn("flex items-center gap-2.5 rounded-full", focus)}>
        <Image src="/02-mark-reversed.svg" alt="" width={26} height={18} className="block h-[18px] w-auto" />
        <span className="font-brand text-[13px] font-medium tracking-[.35em]">{SITE.name}</span>
      </a>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold">
        {FOOTER_NAV.map((l) => (
          <a key={l.href} href={l.href} className={cn("whitespace-nowrap rounded text-muted transition-colors hover:text-accent", focus)}>
            {l.label}
          </a>
        ))}
      </nav>
      <span className="font-mono text-[11px] tracking-[.14em] text-muted max-[520px]:whitespace-normal">
        {SITE.copyright}
      </span>
    </footer>
  );
}
