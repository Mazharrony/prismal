/**
 * Every word on the site. Components read from here and never carry copy of
 * their own, so a copy change is a one-file edit.
 *
 * Copy rules (agreed 2026-09-10): the prism metaphor lives in the display
 * headlines only ("Noise in. Spectrum out.", "Three rays. One firm.", "The
 * Prism Method", "Refraction Sprint", "Refract your workflow."); everything
 * else is plain benefit language in a playful voice. The only numbers on the
 * page are the four claims the studio backs: −70% manual work, replies within
 * 1 hour, a first read within 48 hours, fixed-price sprints with full code
 * ownership. Arrows: → action, ↗ external link, ↓ scroll.
 */

export const SITE = {
  name: "PRISMAL",
  url: "https://prismal.ae",
  title: "Prismal — Websites, software & AI automation, Dubai",
  description:
    "Websites that win clients. Software that does the admin. AI that keeps both running while you sleep. Built in Dubai for the UAE and GCC.",
  location: "Dubai, UAE — working across the UAE & GCC",
  email: "hello@prismal.ae",
  whatsappNumber: "+971 50 721 7156",
  whatsappHref: "https://wa.me/971507217156",
  copyright: "© 2026 PRISMAL — NOISE IN. SPECTRUM OUT.",
} as const;

export type NavLink = { label: string; href: string };

export const NAV: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Pricing", href: "#engage" },
  { label: "FAQ", href: "#faq" },
];

export const NAV_CTA: NavLink = { label: "Start a project →", href: "#contact" };

export const FOOTER_NAV: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Site kits", href: "#build" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Pricing", href: "#engage" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const HERO = {
  /** The offer in three words, so the label above the headline doesn't just repeat it. */
  eyebrow: "Websites · Software · AI automation",
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
  secondaryCta: { label: "See the work ↓", href: "#work" },
} as const;

export type RayTone = (typeof HERO.rays)[number]["tone"];

/** The brand line on a loop above the contact band. */
export const MARQUEE = ["Noise in.", "Spectrum out.", "Prismal"] as const;

/* ── 01 Services ──────────────────────────────────────────────────────── */

export type Service = {
  num: string;
  title: string;
  body: string;
  cta: string;
  bg: string;
  fg: string;
};

export const SERVICES_HEAD = {
  eyebrow: "01 · WHAT WE DO",
  title: "Three rays. One firm.",
  intro:
    "Tell us the problem. We'll tell you which of the three it needs — usually a mix.",
  note: "Keep scrollin'…",
} as const;

export const SERVICES: readonly Service[] = [
  {
    num: "01",
    title: "Website",
    bg: "#f9d20f",
    fg: "#0b0f14",
    body: "Sites that load fast, get found, and turn visitors into enquiries.",
    cta: "I need a site",
  },
  {
    num: "02",
    title: "Software",
    bg: "#ffffff",
    fg: "#0b0f14",
    body: "Portals, dashboards and internal tools that retire the spreadsheet everyone hates.",
    cta: "I need software",
  },
  {
    num: "03",
    title: "AI & Automation",
    bg: "#0b0f14",
    fg: "#fff",
    body: "Bots and pipelines wired into your real data, so the repetitive work does itself.",
    cta: "Automate this",
  },
];

/* ── 02 What we build ─────────────────────────────────────────────────── */

export const BUILD_HEAD = {
  eyebrow: "02 · SITE KITS",
  title: "Site kits, not site packages.",
  intro:
    "Fixed scope, fixed price, known timeline. Commerce is the pillar; the rest are the kits we ship most across the UAE and GCC.",
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
    body: "Clinics, salons, garages, restaurants: a site that gets found, answers the obvious questions and takes the booking.",
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
  eyebrow: "03 · SELECTED WORK",
  title: "Thirteen builds, one method.",
  intro: "All live, all clickable. Go and poke around.",
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
  /** Spans the full grid width. Keep to one, at the end, or the grid goes ragged. */
  featured?: boolean;
  /** A second paragraph, shown on a featured card only. Same rule as `built`:
   *  only what the linked page actually shows. */
  detail?: string;
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
  {
    name: "Mali the FirmBot",
    // Mali itself is not public yet, so the link goes to the Bangla language
    // model it runs on — the only part a visitor can actually inspect today.
    // Swap this for Mali's own URL once it ships, per the `built` rule above.
    url: "https://github.com/Mazharrony/BanglaLM",
    // Client-supplied positioning. Unlike every other `built` line, the "up to
    // 70%" figure is not shown on the linked page and is not verified here —
    // it is an exception to the no-metric rule above, kept at the client's ask.
    built: "Firm automation that takes on up to 70% of routine admin, in Bangla",
    capability: "ai-automation",
    image: "/work/mali-firmbot.jpg",
    featured: true,
    // Every number here is stated in the BanglaLM README; nothing is inferred.
    detail:
      "Mali runs on BanglaLM: a 27M-parameter decoder-only Transformer written from first principles — attention, causal masking and rotary embeddings in roughly 600 lines — with its own Bangla sub-word tokenizer, a full training loop and 255 tests. Nothing pretrained, no external API.",
  },
];

/**
 * Hero trust stickers, in shape order: burst · pill · tag · burst. The two
 * bursts are ~120px discs, so their lines stay at two short words. No hard
 * numbers here by choice: a count or an SLA on a sticker has to be kept true
 * forever, and "12 live builds" had already drifted once.
 */
export const TRUST = [
  "Weekly releases",
  "Fast response times",
  "Fixed price, no hidden fees",
  "Full code ownership",
] as const;

/* ── The Prism Method ─────────────────────────────────────────────────── */

export const METHOD_HEAD = {
  eyebrow: "04 · THE PRISM METHOD",
  title: ["One beam through,", "three rays out."],
  note: "Keep scrollin' — follow the beam…",
} as const;

export type Step = { num: string; title: string; body: string; color: string };

export const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Input",
    color: "#f9d20f",
    body: "We sit inside your operation for a week and list every tool, hand-off and hour that leaks.",
  },
  {
    num: "02",
    title: "Refraction",
    color: "#e2e8f0",
    body: "We split it into what becomes software, what becomes AI, and what simply gets deleted.",
  },
  {
    num: "03",
    title: "Spectrum",
    color: "#fff",
    body: "You get running systems in weeks, shipped in pieces you can use from day one.",
  },
];

/* ── Pricing ──────────────────────────────────────────────────────────── */

export const ENGAGE_HEAD = {
  eyebrow: "05 · PRICING",
  title: "Three ways to start.",
  intro:
    "Fixed scope. Clear price. No lock-in. Most clients start with a sprint and grow from there.",
  note: "Almost there… pick a way in",
  durations: ["1–2 WEEKS", "4–12 WEEKS", "ONGOING →"],
} as const;

export type Way = {
  num: string;
  title: string;
  /** Mono price framing under the title. No AED figures until they're agreed. */
  price: string;
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
    price: "FIXED PRICE · 1–2 WEEKS",
    bg: "#f6f7f9",
    fg: "#0b0f14",
    border: "#f9d20f",
    body: "We map the operation, find the highest-leverage fixes, and hand you a costed plan you own — build it with us or not.",
    points: ["Operational audit", "Solution blueprint", "Fixed price, fixed scope"],
  },
  {
    num: "02",
    title: "Build",
    price: "FIXED SCOPE · 4–12 WEEKS",
    bg: "#f6f7f9",
    fg: "#0b0f14",
    border: "#e2e8f0",
    body: "We design, build and ship in weekly increments you can see running. No slideware.",
    points: ["Weekly shipping", "One accountable team", "Launch & handover"],
  },
  {
    num: "03",
    title: "Run",
    price: "MONTHLY RETAINER",
    bg: "#0b0f14",
    fg: "#fff",
    border: "#0b0f14",
    body: "We keep it healthy, measured and improving, on call as your business changes.",
    points: ["Monitoring & support", "Continuous improvement", "Monthly retainer"],
  },
];

/* ── Results ──────────────────────────────────────────────────────────── */

export const RESULTS_HEAD = {
  eyebrow: "06 · RESULTS",
  title: "Systems, not slideware.",
  note: "Still scrollin'? Good.",
  footnote: "Measured on client projects. Ask us for the numbers.",
} as const;

export type Stat = { value: string; label: string };

export const STATS: readonly Stat[] = [
  { value: "−70%", label: "less manual work in the operations we automate" },
  { value: "Weeks", label: "from first workshop to first running system" },
  { value: "24/7", label: "on duty while your team sleeps" },
  { value: "3 → 1", label: "three disciplines, one accountable partner" },
];

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export const FAQ_HEAD = {
  eyebrow: "07 · FAQ",
  title: "Before you ask.",
  intro:
    "The questions every client asks first, answered the way we answer them on WhatsApp.",
  note: "Curious one, aren't you?",
  chat: {
    status: "Online · replies in 1h",
    divider: "Today",
    ask: "Type your question…",
  },
} as const;

export type Faq = { q: string; a: string };

export const FAQS: readonly Faq[] = [
  {
    q: "Where are you based?",
    a: "Dubai. We work on-site across Dubai and Abu Dhabi, and remotely everywhere else in the GCC.",
  },
  {
    q: "What does a project cost?",
    a: "Every project starts with a fixed-price sprint, so you know the full build cost before you commit. No hourly billing.",
  },
  {
    q: "How fast can you ship?",
    a: "A sprint is one to two weeks. Most first systems are live in four to twelve, shipped weekly so you see it running.",
  },
  {
    q: "Do you work in Arabic?",
    a: "Yes. Bilingual Arabic/English interfaces and agents, with proper right-to-left support.",
  },
  {
    q: "Do we own what you build?",
    a: "Completely. Code, models, infrastructure. No lock-in, no per-seat licence — even the sprint plan is yours to take elsewhere.",
  },
  {
    q: "Software, AI or automation — which do we need?",
    a: "That's what the sprint answers. Most operations need a mix; we recommend the smallest one that removes the most noise.",
  },
];

/* ── Contact ──────────────────────────────────────────────────────────── */

export const CONTACT = {
  eyebrow: "08 · SAY HELLO",
  title: "Refract your workflow.",
  intro:
    "Tell us what's slow, manual or ugly. Within 48 hours you get a straight answer: what to build, what to automate, what to delete.",
  note: "Last stop — say hello ↓",
  /** The contact rail beside the headline. */
  rail: {
    email: "Email",
    whatsapp: "WhatsApp",
    based: "Based in",
    hours: "We reply within 1 hour",
  },
  form: {
    pickLabel: "What are we fixing?",
    picks: [
      { label: "Website", prefill: "We need a website that " },
      { label: "Software", prefill: "We need software that " },
      { label: "AI & Automation", prefill: "We want to stop doing " },
      { label: "No idea yet", prefill: "Honestly, the mess is " },
    ],
    channelLabel: "Where do we reach you?",
    channels: [
      { value: "email", label: "Email" },
      { value: "whatsapp", label: "WhatsApp" },
      { value: "call", label: "Call" },
    ],
    name: "Your name",
    company: "Company",
    email: "Email",
    phone: "WhatsApp or phone number",
    brief: "What's the noise?",
    submit: "Send the brief",
    sending: "Sending…",
    sentTitle: "Received.",
    sent: "We read every brief ourselves. Expect a reply within the hour, and a proper read within 48.",
    again: "Send another brief",
  },
} as const;

export type Channel = (typeof CONTACT.form.channels)[number]["value"];
