# Prismal

Marketing site for Prismal — a Dubai software firm delivering product builds,
workflow automation, and applied AI for SME and startup clients.

The homepage is a single scroll-driven Three.js world; every other route is a
static, fast, crawlable page sharing the same design tokens.

## Stack

- **Next.js 15** (App Router, TypeScript), static-first
- **Three.js** — homepage only, loaded via `next/dynamic` so it never reaches other routes
- **MDX** case studies in `content/work/`, no CMS
- First-party contact handling via a route handler

## Run locally

```bash
npm install
npm run dev
```

Then visit http://localhost:3000

```bash
npm run build && npm run start   # production build
npm run analyze                  # bundle breakdown
```

## Structure

```
app/            routes — homepage (the world), services, work, contact, legal
world/          three.js: conductor, chapter ledger, towers, grid, scene
content/        services.ts, site.ts, work/*.mdx
components/     nav, footer, contact form, placeholder marker
styles/         tokens.css — single source of truth for the palette
```

## The scroll world

`app/page.tsx` renders seven chapters as ordinary server-rendered HTML tagged
`data-cam="0".."6"`. The world binds to those sections and layers over them — it
never replaces them. That same markup is the SEO surface, the reduced-motion
fallback, and the WebGL-failure fallback. If the world never loads, the page
still sells.

Chapters follow a maturity ladder — **Ship it → Run it without you → Make it
decide** — which is simultaneously the camera journey and the sales argument.

The camera and world contract lives as data in `world/chapters.ts`, not as
thresholds scattered through the render loop.

## Design tokens

`styles/tokens.css` is the single source of truth, and the world reads it at
runtime via `getComputedStyle`. Changing `--accent` and `--accent-dim` reskins
the site *and* the 3D world together.

## Unfilled content

Content Prismal has not supplied yet is marked `TODO(prismal):` in the data and
renders as a visible dashed marker — never an invented metric. Replacing the
string removes the marker automatically.

Still required before launch:

- Prismal wordmark (drives the accent and type pairing)
- Verified metrics and real case studies
- Indicative pricing per service
- `CONTACT_WEBHOOK_URL` — see `.env.example`

## Contact form

`app/api/contact/route.ts` validates, applies a honeypot and a rate limit, then
forwards to `CONTACT_WEBHOOK_URL`. If that variable is unset it returns 503 by
design — a form that silently drops leads is worse than one visibly broken.

The rate limit is in-memory, so it is per-instance on serverless. It stops
casual abuse, not a determined attacker; move it to KV if that becomes a real
problem.

## Performance budgets

| Target | Budget | Current |
| --- | --- | --- |
| Homepage first-load JS | ≤ 110 kB | 109 kB |
| Other routes first-load JS | ≤ 110 kB | 103–107 kB |
| Draw calls | < 150 | 5 |

## Credits

The scroll-conductor in `world/conductor.ts` is a TypeScript port of the
portable conductor published under MIT with the `build-threejs-scroll-worlds`
agent skill (Copyright (c) 2026 Meng To).
