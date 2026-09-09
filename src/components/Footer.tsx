import Image from "next/image";
import { FOOTER_NAV, SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-2">
      <a href="#top" className="flex items-center gap-2.5 text-ink">
        <Image
          src="/01-mark-primary.svg"
          alt=""
          width={26}
          height={18}
          className="block h-[18px] w-auto"
        />
        <span className="font-display text-[13px] font-medium tracking-[.35em]">
          {SITE.name}
        </span>
      </a>
      <nav
        aria-label="Footer"
        className="flex flex-wrap gap-[18px] text-[13px] font-semibold"
      >
        {FOOTER_NAV.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="whitespace-nowrap text-muted hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <span className="whitespace-nowrap font-mono text-[11px] tracking-[.14em] text-muted max-[520px]:whitespace-normal">
        {SITE.copyright}
      </span>
    </footer>
  );
}
