/**
 * Copy for /ad-creatives, the Ad Creative Engine offer. Same rules as
 * `site.ts`: the prism metaphor only in the display headline, plain benefit
 * language everywhere else, and no client outcome or metric — the page sells
 * the package, not a number nobody can check.
 *
 * Prices are the launch prices agreed 2026-10-24 (AED, excl. VAT).
 */

export const ADS_META = {
  title: "Ad Creative Engine — weekly video ads for Meta, TikTok & Snapchat",
  description:
    "Fresh short-form video ads every week for UAE and GCC brands on Meta, TikTok and Snapchat. Fixed monthly packages, a paid pilot to start, and every file is yours.",
  path: "/ad-creatives",
  /** The Behance profile that carries the motion work. */
  reel: "https://www.behance.net/maazharrony",
} as const;

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const ADS_HERO = {
  /** The page's h1: the offer and the place, in words a search engine can use. */
  eyebrow: "Ad creatives for Meta · TikTok · Snapchat · Dubai",
  headline: ["One brief in.", "A spectrum of ads out."],
  intro:
    "Short video ads that keep your paid social fresh: new concepts and new hooks every week, cut for every placement, so your ads never go stale.",
  primaryCta: { label: "Start with a pilot →", href: "#brief" },
  secondaryCta: { label: "See the packages ↓", href: "#packages" },
  stickers: ["Weekly drops", "Paid pilot first", "Every file is yours", "9:16 · 4:5 · 1:1"],
} as const;

/* ── 01 How it works ──────────────────────────────────────────────────── */

export const ADS_STEPS_HEAD = {
  eyebrow: "01 · HOW IT WORKS",
  title: "Fresh ads, every week.",
  intro:
    "Ads wear out. The fix is volume and variety: more concepts, more hooks, made on purpose and tested on purpose.",
} as const;

export type AdsStep = { num: string; title: string; body: string };

export const ADS_STEPS: readonly AdsStep[] = [
  {
    num: "01",
    title: "Brief",
    body: "Send us your products, your offers and the ads that already work. We write concepts and hooks for each audience.",
  },
  {
    num: "02",
    title: "Batch",
    body: "We cut short videos for every placement — 9:16 for Reels, TikTok and Snapchat, 4:5 for the feed — and drop new ones every week.",
  },
  {
    num: "03",
    title: "Learn",
    body: "From Growth up, we read your Ads Manager every month and tell you which hooks won, and what to make next.",
  },
];

/* ── 02 Packages ──────────────────────────────────────────────────────── */

export const ADS_PACKAGES_HEAD = {
  eyebrow: "02 · PACKAGES",
  title: "Start small. Scale what wins.",
  intro:
    "Every client starts with a paid pilot, credited to the first month. Monthly packages are billed in advance.",
  vat: "Prices in AED, excluding VAT.",
} as const;

export type AdsPackage = {
  name: string;
  price: string;
  /** Mono line under the price. */
  per: string;
  points: readonly string[];
  cta: string;
};

export const ADS_PACKAGES: readonly AdsPackage[] = [
  {
    name: "Pilot",
    price: "AED 1,800",
    per: "ONE-OFF · 7 WORKING DAYS",
    points: ["6 video ads", "3 concepts × 2 formats", "Credited to month one"],
    cta: "Run the pilot",
  },
  {
    name: "Starter",
    price: "AED 4,500",
    per: "PER MONTH",
    points: ["12 video ads a month", "4 concepts × 3 hooks", "Weekly drops"],
    cta: "Start here",
  },
  {
    name: "Growth",
    price: "AED 8,500",
    per: "PER MONTH",
    points: ["24 video ads + 10 static ads", "Weekly drops", "Monthly “what won and why” report"],
    cta: "Grow with us",
  },
  {
    name: "Scale",
    price: "AED 13,500",
    per: "PER MONTH",
    points: ["40 video ads + statics", "English and Arabic versions", "Weekly refresh and report"],
    cta: "Scale up",
  },
];

/* ── 03 What's included ───────────────────────────────────────────────── */

export const ADS_INCLUDED = {
  eyebrow: "03 · WHAT YOU GET",
  title: "In every package.",
  items: [
    "Concepts and hook writing",
    "Motion editing and sound",
    "Captions and subtitles",
    "Safe-zone checks for each platform",
    "One revision round per batch",
    "Final files are yours to keep",
  ],
  addonsTitle: "Add-ons",
  addons: [
    {
      name: "Paid-social management",
      body: "We run your Meta and Google ads as well, for spend up to AED 30,000 a month.",
      price: "+ AED 3,500 / MONTH",
    },
    {
      name: "UGC creator videos",
      body: "Real people on camera, filmed by creators we brief for you.",
      price: "CREATOR FEE AT COST + AED 250 EDIT",
    },
  ],
  terms: [
    "Not included: ad spend, creator fees, product shipping, and music beyond royalty-free libraries.",
    "Monthly packages run for two months minimum, then cancel with 30 days' notice.",
  ],
  reel: {
    label: "See the motion work on Behance ↗",
    note: "Recent motion and ad work, all in one place.",
  },
} as const;

/* ── 04 FAQ ───────────────────────────────────────────────────────────── */

export const ADS_FAQ_HEAD = {
  eyebrow: "04 · FAQ",
  title: "Before you ask.",
} as const;

export const ADS_FAQS = [
  {
    q: "Which platforms do you make ads for?",
    a: "Meta (Instagram and Facebook), TikTok and Snapchat. Every ad comes in 9:16 and 4:5, plus 1:1 when you need it.",
  },
  {
    q: "Do you shoot the footage?",
    a: "We work from your product photos, existing footage and brand assets, plus motion graphics. For real people on camera, we bring in UGC creators as an add-on.",
  },
  {
    q: "Do you run the ads too?",
    a: "If you want us to. Paid-social management for Meta and Google is an add-on; otherwise you get files ready to upload.",
  },
  {
    q: "Do you make Arabic ads?",
    a: "Yes. Arabic versions come with the Scale package, and every Arabic line is checked by a native speaker before it ships.",
  },
  {
    q: "How fast is the first batch?",
    a: "Seven working days for the pilot. After that, new ads land every week.",
  },
  {
    q: "Can we cancel?",
    a: "Yes. After the first two months, cancel with 30 days' notice. Everything we've delivered stays yours.",
  },
] as const;

/* ── 05 Brief ─────────────────────────────────────────────────────────── */

export const ADS_CONTACT = {
  eyebrow: "05 · START",
  title: "Run the pilot.",
  intro:
    "Tell us the product and the offer. We reply within the hour, and you get a pilot plan within 48.",
  pickLabel: "Which package?",
  /** Travels as `service`, so the brief email says which package was picked. */
  picks: [
    { label: "Ads · Pilot", prefill: "We'd like the 6-ad pilot for " },
    { label: "Ads · Starter", prefill: "We'd like 12 ads a month for " },
    { label: "Ads · Growth", prefill: "We'd like 24 ads a month for " },
    { label: "Ads · Scale", prefill: "We'd like 40 ads a month for " },
    { label: "Ads · Not sure", prefill: "We spend about AED ___ a month on ads and want " },
  ],
} as const;
