<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PRISMAL marketing site

One-page marketing site for prismal.ae, built from the design handoff in
`docs/handoff/` (README + `Prismal Redesign v2.dc.html`). The handoff is the
source of truth for copy, tokens, spacing and motion; departures from it are
listed at the top of `src/app/globals.css`.

- Next.js 16 App Router, React 19, Tailwind v4, TypeScript, npm.
- All copy lives in `src/content/`. Edit copy there, not in components.
- Sections are `Band`s (`src/components/Band.tsx`) with a `Wave` seam. The
  scroll reveal is `src/components/Reveal.tsx` plus the "Scroll reveal" block
  of `globals.css`: nothing is hidden until a person moves, scrolls or types,
  so crawlers and link previews always read the full page. Keep it that way.
- The Brief form emails through Resend via `src/app/actions/send-brief.ts`.
  Needs `RESEND_API_KEY` (see `.env.example`); without it, dev logs the payload.

## SEO conventions

- Every route builds its metadata with `pageMetadata()` from `src/lib/seo.ts`
  (canonical, og:url and twitter card all from one `path`). The root layout
  owns `metadataBase`, the title template and the Organization/WebSite JSON-LD;
  it deliberately sets no canonical, because a layout canonical is inherited
  by every child route.
- Structured data goes through `<JsonLd data={[...]} />`
  (`src/components/seo/JsonLd.tsx`) with builders in `src/lib/schema.ts`.
  Never invent an address, a rating or a metric; the site publishes none.
- The sitemap is generated from `src/lib/routes.ts`. Add new routes there with
  a real `updated` date; routes marked `noindex` stay out of it.
- The homepage h1 is the small eyebrow line above the slogan (the offer and
  "Dubai", in words a search engine can use); the slogan is display copy.
- `npm run seo:check`, against a running `npm run start`, checks every sitemap
  URL's title, canonical, OG image, JSON-LD and h1, then proves the reveal
  hides nothing from a renderer that never scrolls. `npm run seo:indexnow`
  tells Bing which URLs changed after a content deploy.
