import type { BreadcrumbList, FAQPage, Organization, WebSite } from "schema-dts";
import { HERO, SITE, type Faq } from "@/content/site";
import { ORG_ID, WEBSITE_ID, absolute } from "@/lib/seo";

/**
 * JSON-LD builders. Every value here is something the site already states in
 * words; nothing is inferred. In particular there is no PostalAddress (none is
 * public), no AggregateRating, and no client outcome — see the copy rules at
 * the top of `src/content/site.ts`.
 */

/** The studio, once, from the root layout. Pages point at it with `{ "@id": ORG_ID }`. */
export function organization(): Organization {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.brand,
    alternateName: SITE.name,
    url: `${SITE.url}/`,
    logo: { "@type": "ImageObject", url: absolute("/brand/logo-512.png"), width: "512", height: "512" },
    image: absolute("/opengraph-image"),
    description: SITE.description,
    slogan: HERO.headline.join(" "),
    email: SITE.email,
    telephone: SITE.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        url: SITE.whatsappHref,
        availableLanguage: ["en", "ar"],
        areaServed: "AE",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Place", name: "Gulf Cooperation Council" },
    ],
    foundingLocation: { "@type": "City", name: "Dubai" },
    knowsAbout: [
      "AI automation",
      "WhatsApp automation",
      "Custom software",
      "Web development",
      "Next.js",
      "Shopify",
      "Arabic and English websites",
    ],
  };
}

export function webSite(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.brand,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** The visible Q&A of a page, verbatim. Only for questions the page actually shows. */
export function faqPage(faqs: readonly Faq[]): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Home first, current page last; `path` is site-relative. */
export function breadcrumbs(items: readonly { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}
