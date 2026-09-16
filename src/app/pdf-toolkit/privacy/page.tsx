import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  PDF_TOOLKIT_PRIVACY as POLICY,
  type PolicyTable,
} from "@/content/pdf-toolkit-privacy";
import { SITE } from "@/content/site";
import { eyebrow, focus } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${POLICY.metaTitle} — ${SITE.name}`,
  description: POLICY.metaDescription,
  alternates: { canonical: "/pdf-toolkit/privacy" },
  openGraph: {
    type: "article",
    siteName: SITE.name,
    locale: "en_AE",
    url: `${SITE.url}/pdf-toolkit/privacy`,
    title: `${POLICY.metaTitle} — ${SITE.name}`,
    description: POLICY.metaDescription,
  },
  twitter: {
    card: "summary",
    title: `${POLICY.metaTitle} — ${SITE.name}`,
    description: POLICY.metaDescription,
  },
  robots: { index: true, follow: true },
};

/** Two-digit section index: 01, 02, … */
const n = (i: number) => String(i + 1).padStart(2, "0");

const heading = "display m-0 text-[clamp(30px,3.6vw,46px)]";
const para = "m-0 text-[17px] leading-[1.75] text-paper/85";

/** A policy table. Every cell carries its column name for the stacked
 *  mobile layout in `globals.css`. */
function Table({ head, rows }: PolicyTable) {
  return (
    <table className="legal-table mt-8">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, c) => (
              <td key={cell} data-label={head[c]}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * The PDF Toolkit privacy policy — a plain, readable document on the site's
 * ink canvas. Static: no splash, no smooth scroll, no reveal, nothing that
 * needs JavaScript to read.
 */
export default function Page() {
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
          <Image
            src="/02-mark-reversed.svg"
            alt=""
            width={26}
            height={18}
            className="block h-[16px] w-auto"
          />
          {POLICY.backLabel}
        </Link>

        <header className="mt-[clamp(40px,6vw,72px)]">
          <span className={cn(eyebrow, "text-accent")}>{POLICY.eyebrow}</span>
          <h1 className="display m-0 mt-4 text-[clamp(48px,8vw,104px)]">
            {POLICY.title}
          </h1>
          <p className="m-0 mt-5 font-mono text-[11px] uppercase tracking-[.2em] text-muted">
            {POLICY.updatedLabel} — {POLICY.updated}
          </p>
          <p className={cn(para, "mt-8 max-w-[640px]")}>{POLICY.intro}</p>
        </header>

        <section className="mt-[clamp(36px,5vw,56px)] rounded-[28px] border border-accent/25 bg-ink-2/70 p-[clamp(22px,3vw,36px)]">
          <h2 className={cn(eyebrow, "m-0 text-accent")}>{POLICY.summary.title}</h2>
          <p className={cn(para, "mt-4 text-paper")}>{POLICY.summary.body}</p>
        </section>

        {POLICY.sections.map((section, i) => (
          <section key={section.title} className="mt-[clamp(44px,6vw,80px)]">
            <p className={cn(eyebrow, "m-0 text-muted-2")}>{n(i)}</p>
            <h2 className={cn(heading, "mt-3")}>{section.title}</h2>

            {section.body?.map((p) => (
              <p key={p} className={cn(para, "mt-5")}>
                {p}
              </p>
            ))}

            {section.table && <Table {...section.table} />}

            {section.after?.map((p) => (
              <p key={p} className={cn(para, "mt-6")}>
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-[clamp(44px,6vw,80px)]">
          <p className={cn(eyebrow, "m-0 text-muted-2")}>{n(POLICY.sections.length)}</p>
          <h2 className={cn(heading, "mt-3")}>{POLICY.contact.title}</h2>
          <p className={cn(para, "mt-5")}>
            {POLICY.contact.body}{" "}
            <a
              href={`mailto:${POLICY.contact.email}`}
              className={cn(
                "rounded font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent",
                focus,
              )}
            >
              {POLICY.contact.email}
            </a>
          </p>
        </section>

        <div className="mt-[clamp(56px,8vw,112px)]">
          <Footer base="/" />
        </div>
      </div>
    </main>
  );
}
