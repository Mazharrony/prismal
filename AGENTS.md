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
- All copy lives in `src/content/site.ts`. Edit copy there, not in components.
- The sticky card cascade is driven by `src/components/StackController.tsx`;
  the CSS it relies on is in `globals.css` under "Card cascade".
- The Brief form emails through Resend via `src/app/actions/send-brief.ts`.
  Needs `RESEND_API_KEY` (see `.env.example`); without it, dev logs the payload.
