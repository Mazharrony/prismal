import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { NOT_FOUND } from "@/content/pages";
import { SITE } from "@/content/site";
import { eyebrow, focus, pillAccent, pillGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: NOT_FOUND.metaTitle,
  robots: { index: false, follow: true },
};

/**
 * The missing-page screen, in the same plain style as the privacy page: no
 * splash, no smooth scroll, no reveal. Nothing here streams, so the response
 * carries a real 404 status.
 */
export default function NotFound() {
  return (
    <main id="top" className="relative overflow-hidden pt-8 pb-[clamp(48px,7vw,88px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 -top-64 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,210,15,.16),transparent_62%)]"
      />

      <div className="relative mx-auto max-w-[820px] px-7 max-[860px]:px-5">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full font-mono text-[11px] uppercase tracking-[.2em] text-muted transition-colors hover:text-accent",
            focus,
          )}
        >
          <Image src="/02-mark-reversed.svg" alt="" width={26} height={18} className="block h-[16px] w-auto" />
          {SITE.name}
        </Link>

        <header className="mt-[clamp(40px,6vw,72px)]">
          <span className={cn(eyebrow, "text-accent")}>{NOT_FOUND.eyebrow}</span>
          <h1 className="display m-0 mt-4 text-[clamp(48px,8vw,104px)]">{NOT_FOUND.title}</h1>
          <p className="m-0 mt-8 max-w-[560px] text-[17px] leading-[1.75] text-paper/85">{NOT_FOUND.intro}</p>
        </header>

        <ul className="m-0 mt-10 flex list-none flex-wrap gap-3 p-0">
          {NOT_FOUND.links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className={cn(i === 0 ? pillAccent : pillGhost, focus, "px-6 py-3.5 text-[15px]")}>
                {l.label} <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(56px,8vw,112px)]">
          <Footer base="/" />
        </div>
      </div>
    </main>
  );
}
