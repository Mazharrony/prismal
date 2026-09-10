/**
 * Every word on the site, ported verbatim from the design handoff
 * (`docs/handoff/Prismal Redesign v2.dc.html`, the `renderVals()` arrays and
 * the hard-coded pillar / kit / work markup). Components read from here and
 * never carry copy of their own, so a copy change is a one-file edit.
 *
 * The six `WORK` entries are the handoff's invented placeholders — swap in real
 * clients, metrics and 4:3 screenshots before launch.
 */

export const SITE = {
  name: "PRISMAL",
  url: "https://prismal.ae",
  title: "PRISMAL — Websites, software and AI automation for the UAE & GCC",
  description:
    "We build custom websites and web platforms for businesses across the UAE and GCC — then wire in the AI and automation that make them run themselves.",
  location: "Dubai, UAE — working across the UAE & GCC",
  email: "hello@prismal.ae",
  whatsappNumber: "+971 50 721 7156",
  whatsappHref: "https://wa.me/971507217156",
  copyright: "© 2026 PRISMAL — NOISE IN. SPECTRUM OUT.",
} as const;

export type NavLink = { label: string; href: string };

export const NAV: readonly NavLink[] = [
  { label: "What we refract", href: "#services" },
  { label: "What we build", href: "#build" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "How we work", href: "#engage" },
  { label: "FAQ", href: "#faq" },
];

export const NAV_CTA: NavLink = { label: "Start a project →", href: "#contact" };

export const FOOTER_NAV: readonly NavLink[] = [
  { label: "What we refract", href: "#services" },
  { label: "Method", href: "#method" },
  { label: "How we work", href: "#engage" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const HERO = {
  noiseEyebrow: "NOISE IN",
  spectrumEyebrow: "SPECTRUM OUT",
  sceneLabel:
    "Operational noise entering a prism and refracting into three rays",
  /** The flickering phrases in the SVG scene, with their `x`/`y` in viewBox units. */
  noise: [
    { text: "manual everything", x: 26, y: 208 },
    { text: "copy · paste · repeat", x: 128, y: 268 },
    { text: "17 tools, zero answers", x: 16, y: 330 },
    { text: "final_v7_REAL.xlsx", x: 140, y: 396 },
    { text: "spreadsheets at midnight", x: 34, y: 462 },
    { text: "who owns this?", x: 150, y: 516 },
  ],
  rays: [
    { title: "Website", tag: "RAY 01 →", tone: "accent" },
    { title: "Software", tag: "RAY 02 →", tone: "surface" },
    { title: "AI & Automation", tag: "RAY 03 →", tone: "ink" },
  ],
  headline: ["Noise in.", "Spectrum out."],
  intro: SITE.description,
  primaryCta: { label: "Start a project →", href: "#contact" },
  secondaryCta: { label: "See what we refract ↓", href: "#services" },
} as const;

export type RayTone = (typeof HERO.rays)[number]["tone"];

/** Hero trust stickers. Only claims the site can back up. */
export const TRUST = [
  "12 live builds",
  "Reply within 48h",
  "Fixed-price sprint",
  "You own the code",
] as const;

/** The brand line on a loop above the contact band. */
export const MARQUEE = ["Noise in.", "Spectrum out.", "Prismal"] as const;

/* ── 01 Services ──────────────────────────────────────────────────────── */

export type Service = {
  num: string;
  title: string;
  body: string;
  bg: string;
  fg: string;
};

export const SERVICES_HEAD = {
  eyebrow: "01 · WHAT WE REFRACT",
  title: "Three rays. One firm.",
  intro:
    "Every engagement passes through the same prism and splits into the discipline it actually needs.",
  note: "Keep scrollin'…",
} as const;

export const SERVICES: readonly Service[] = [
  {
    num: "01",
    title: "Website",
    bg: "#f9d20f",
    fg: "#0b0f14",
    body: "Marketing sites and customer-facing web products built for how you actually work.",
  },
  {
    num: "02",
    title: "Software",
    bg: "#ffffff",
    fg: "#0b0f14",
    body: "Web platforms, internal tools, dashboards and the APIs that connect them.",
  },
  {
    num: "03",
    title: "AI & Automation",
    bg: "#0b0f14",
    fg: "#fff",
    body: "Copilots, pipelines and bots wired into your real data — work that runs itself.",
  },
];

/* ── 02 What we build ─────────────────────────────────────────────────── */

export const BUILD_HEAD = {
  eyebrow: "02 / WHAT WE BUILD",
  title: "Site kits, not site packages.",
  intro:
    "Every kit is a defined build with a fixed scope. Commerce is the pillar — the rest are the categories we ship most across the UAE and GCC.",
  note: "Pick your kit ↓",
} as const;

export type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  stack: string;
  tone: "ink" | "white";
};

export const PILLARS: readonly Pillar[] = [
  {
    eyebrow: "PILLAR · COMMERCE",
    title: "Next.js commerce",
    body: "A custom headless storefront built for speed and for catalogues that keep growing. Own the front end, the checkout flow and the data.",
    stack: "NEXT.JS · HEADLESS CMS · STRIPE / TAP",
    tone: "ink",
  },
  {
    eyebrow: "PILLAR · COMMERCE",
    title: "Shopify storefront",
    body: "Shopify keeps running payments, inventory and orders. We build the storefront on top of it, so the shop looks nothing like a theme.",
    stack: "SHOPIFY · HYDROGEN / LIQUID · METAOBJECTS",
    tone: "white",
  },
];

export type Kit = { num: string; title: string; body: string; stack: string };

export const KITS: readonly Kit[] = [
  {
    num: "KIT 01",
    title: "Real estate",
    body: "Listing portals with search, filters, map views and enquiry routing that reaches the right agent.",
    stack: "LISTINGS · MAPS · CRM HANDOFF",
  },
  {
    num: "KIT 02",
    title: "Local business",
    body: "Clinics, salons, garages, restaurants — a site that gets found, answers the obvious questions and takes the booking.",
    stack: "LOCAL SEO · BOOKINGS · WHATSAPP",
  },
  {
    num: "KIT 03",
    title: "Corporate & CMS",
    body: "Multi-page sites your team edits without calling us, with the structure to keep growing.",
    stack: "CMS · MULTI-PAGE · AR / EN",
  },
  {
    num: "KIT 04",
    title: "Web apps & portals",
    body: "Customer dashboards, quoting tools and internal portals — the site that does the work, not just the telling.",
    stack: "AUTH · DASHBOARDS · INTEGRATIONS",
  },
  {
    num: "KIT 05",
    title: "Campaign & landing",
    body: "Single-purpose pages built to convert one audience, shipped in days and measured from day one.",
    stack: "FAST BUILD · A/B · ANALYTICS",
  },
  {
    num: "KIT 06",
    title: "Replatform & rescue",
    body: "An existing site that is slow, unmaintainable or on the wrong stack. We migrate it without losing the rankings.",
    stack: "MIGRATION · SPEED · SEO KEPT",
  },
];

/* ── 03 Selected work ─────────────────────────────────────────────────── */

export const WORK_HEAD = {
  eyebrow: "03 / SELECTED WORK",
  title: "Twelve builds, one method.",
  intro: "Twelve live client sites. Every tile links to the real thing.",
  note: "All live — click through ↓",
  swipe: "SWIPE →",
} as const;

export type Capability = "websites" | "custom-software" | "ai-automation";

export const CAPABILITY_LABEL: Record<Capability, string> = {
  websites: "WEBSITE",
  "custom-software": "SOFTWARE",
  "ai-automation": "AI & AUTOMATION",
};

/**
 * Ported from the previous site's `content/portfolio.ts`, which carried three
 * rules worth keeping: `built` describes the work, not the client's industry,
 * and lists only features visible on the page; no outcome or metric appears
 * here because none are verified; and a dead link is worse than a short list,
 * so re-check a URL before trusting an entry again.
 */
export type WorkItem = {
  name: string;
  url: string;
  /** What we built, in features a visitor can see on the page. */
  built: string;
  /** Only where the site itself states one. Never inferred from a TLD. */
  location?: string;
  capability: Capability;
  /** 800×500 screenshot under /public/work. */
  image: string;
};

export const WORK: readonly WorkItem[] = [
  {
    name: "JNK Nutrition",
    url: "https://jnknutrition.com",
    built: "Bilingual supplement store with brand pages, blog and app sign-up",
    location: "Dubai",
    capability: "websites",
    image: "/work/jnk-nutrition.jpg",
  },
  {
    name: "Core Champs",
    url: "https://corechamps.us",
    built: "Authentication tool where buyers verify a code printed on the pack",
    capability: "custom-software",
    image: "/work/core-champs.jpg",
  },
  {
    name: "Avion Realty",
    // The apex avionrealty.ae does not resolve; only the www host does.
    url: "https://www.avionrealty.ae",
    built: "Property portal with search by type, bedrooms, price and currency",
    location: "Dubai",
    capability: "websites",
    image: "/work/avion-realty.jpg",
  },
  {
    name: "Shobkichu",
    url: "https://www.shobkichu.com.bd",
    built: "Bengali marketplace with category browsing, deals and cash on delivery",
    location: "Bangladesh",
    capability: "websites",
    image: "/work/shobkichu.jpg",
  },
  {
    name: "Glow & Lean",
    url: "https://www.glownlean.com",
    built: "Cosmetics store with category browsing, timed deals and a journal",
    location: "Bangladesh",
    capability: "websites",
    image: "/work/glow-n-lean.jpg",
  },
  {
    name: "Scoops Monster",
    url: "https://scoopsmonster.com",
    built: "Supplement brand site with a shop and pack verification",
    location: "United States",
    capability: "websites",
    image: "/work/scoops-monster.jpg",
  },
  {
    name: "HENJ Trading",
    // henj-uae.com serves a holding page; the finished site is on Vercel.
    url: "https://henj.vercel.app",
    built: "Product catalogue with call, WhatsApp and enquiry actions",
    location: "Dubai",
    capability: "websites",
    image: "/work/henj.jpg",
  },
  {
    name: "Distinct Solutions",
    url: "https://www.distinct-solutions.ae",
    built: "Maintenance and fit-out site with quote requests and WhatsApp contact",
    location: "Dubai",
    capability: "websites",
    image: "/work/distinct.jpg",
  },
  {
    name: "Eva Design Furniture",
    url: "https://www.evafurniture.ae",
    built: "Atelier site with collections, journal and consultation booking",
    location: "Dubai",
    capability: "websites",
    image: "/work/eva-furniture.jpg",
  },
  {
    name: "One Ton Pickup",
    url: "https://www.onetonpickup.com",
    built: "Rental site with vehicle specs, coverage areas, FAQ and one-tap calling",
    location: "Dubai",
    capability: "websites",
    image: "/work/one-ton-pickup.jpg",
  },
  {
    name: "Digital Point Real Estate",
    url: "https://digitalpointrealty-eight.vercel.app",
    built: "Property site covering leasing, management and sales enquiries",
    location: "Abu Dhabi",
    capability: "websites",
    image: "/work/digital-point.jpg",
  },
  {
    name: "Ravenala Beach Bungalows",
    url: "https://ravenala-tau.vercel.app",
    built: "Resort site with rooms, amenities, gallery and booking",
    location: "Moalboal, Cebu",
    capability: "websites",
    image: "/work/ravenala.jpg",
  },
];

/* ── The Prism Method ─────────────────────────────────────────────────── */

export const METHOD_HEAD = {
  eyebrow: "02 · THE PRISM METHOD",
  title: ["One beam through,", "three rays out."],
  note: "Keep scrollin' — follow the beam…",
} as const;

export type Step = { num: string; title: string; body: string; color: string };

export const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Input",
    color: "#f9d20f",
    body: "We embed in your operation and map the noise — every tool, every handoff, every hour that quietly leaks away.",
  },
  {
    num: "02",
    title: "Refraction",
    color: "#e2e8f0",
    body: "We split the problem into its spectrum: what becomes software, what becomes AI, and what disappears into automation.",
  },
  {
    num: "03",
    title: "Spectrum",
    color: "#fff",
    body: "You get running systems in weeks — shipped, measured, maintained, and compounding quietly in the background.",
  },
];

/* ── How we work ──────────────────────────────────────────────────────── */

export const ENGAGE_HEAD = {
  eyebrow: "03 · HOW WE WORK TOGETHER",
  title: "Three ways to start.",
  intro:
    "Fixed scope, clear price, no lock-in. Most partners begin with a Refraction Sprint and grow from there.",
  note: "Almost there… pick a way in",
  durations: ["1–2 WEEKS", "4–12 WEEKS", "ONGOING →"],
} as const;

export type Way = {
  num: string;
  title: string;
  body: string;
  points: readonly string[];
  bg: string;
  fg: string;
  border: string;
};

export const WAYS: readonly Way[] = [
  {
    num: "01",
    title: "Refraction Sprint",
    bg: "#f6f7f9",
    fg: "#0b0f14",
    border: "#f9d20f",
    body: "We map your operation, find the highest-leverage rays, and hand you a costed build plan you own — whether or not you build it with us.",
    points: ["Operational audit", "Solution blueprint", "Fixed price, fixed scope"],
  },
  {
    num: "02",
    title: "Build",
    bg: "#f6f7f9",
    fg: "#0b0f14",
    border: "#e2e8f0",
    body: "We design, build and ship the software, AI or automation — in tight weekly increments you can see running, not slideware.",
    points: ["Weekly shipping", "One accountable team", "Launch & handover"],
  },
  {
    num: "03",
    title: "Run",
    bg: "#0b0f14",
    fg: "#fff",
    border: "#0b0f14",
    body: "We keep your systems healthy, measured and improving — a retained partner on call as your operation and its noise keep changing.",
    points: ["Monitoring & support", "Continuous improvement", "Monthly retainer"],
  },
];

/* ── Results ──────────────────────────────────────────────────────────── */

export const RESULTS_HEAD = {
  eyebrow: "04 · WHAT COMES OUT THE OTHER SIDE",
  title: "Systems, not slideware.",
  note: "Still scrollin'? Good.",
} as const;

export type Stat = { value: string; label: string };

export const STATS: readonly Stat[] = [
  { value: "−70%", label: "manual work across the operations we automate" },
  { value: "Weeks", label: "from the first workshop to the first running system" },
  { value: "24/7", label: "your systems stay on duty while the team sleeps" },
  { value: "3 → 1", label: "three disciplines, one accountable partner" },
];

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export const FAQ_HEAD = {
  eyebrow: "05 · QUESTIONS",
  title: "Before you ask.",
  note: "Curious one, aren't you?",
} as const;

export type Faq = { q: string; a: string };

export const FAQS: readonly Faq[] = [
  {
    q: "Where are you based?",
    a: "PRISMAL is based in Dubai and works with businesses across the UAE and the wider GCC. We work on-site with clients in Dubai and Abu Dhabi, and remotely everywhere else.",
  },
  {
    q: "What does a project cost?",
    a: "Every engagement starts with a fixed-price Refraction Sprint so you know the full build cost before committing. Builds are then quoted as fixed scope — no open-ended hourly billing.",
  },
  {
    q: "How fast can you ship?",
    a: "A sprint takes one to two weeks. Most first systems are live within four to twelve weeks, shipped in weekly increments you can see running the whole way.",
  },
  {
    q: "Do you work in Arabic?",
    a: "Yes. We build bilingual Arabic / English interfaces and AI agents, with full right-to-left support where it's needed.",
  },
  {
    q: "Do we own what you build?",
    a: "Completely. You own the code, the models and the infrastructure. No lock-in, no per-seat licence on your own tools — even the sprint blueprint is yours to take elsewhere.",
  },
  {
    q: "Software, AI or automation — which do we need?",
    a: "That's exactly what the sprint answers. Most operations need a mix; we recommend the smallest combination that removes the most noise.",
  },
];

/* ── Contact ──────────────────────────────────────────────────────────── */

export const CONTACT = {
  eyebrow: "06 · CONTACT",
  title: "Refract your workflow.",
  intro:
    "Tell us where the noise is. Within 48 hours we come back with the first rays — a concrete read on what to build, what to automate, and what to delete.",
  note: "Last stop — say hello ↓",
  /** The contact rail beside the headline. */
  rail: {
    email: "Email",
    whatsapp: "WhatsApp",
    based: "Based in",
    hours: "We reply within 48 hours",
  },
  form: {
    pickLabel: "What do you need?",
    picks: [
      { label: "Website", prefill: "We need a website that " },
      { label: "Software", prefill: "We need software that " },
      { label: "AI & Automation", prefill: "We want to automate " },
      { label: "Not sure yet", prefill: "The noise we have is " },
    ],
    channelLabel: "How should we reply?",
    channels: [
      { value: "email", label: "Email" },
      { value: "whatsapp", label: "WhatsApp" },
      { value: "call", label: "Call" },
    ],
    name: "Your name",
    company: "Company",
    email: "Email address",
    phone: "Phone number",
    brief: "What needs building?",
    submit: "Send the brief",
    sending: "Sending…",
    sentTitle: "Received.",
    sent: "We read every brief ourselves and come back within 48 hours with a first read: what to build, what to automate, what to delete.",
    again: "Send another brief",
  },
} as const;

export type Channel = (typeof CONTACT.form.channels)[number]["value"];
