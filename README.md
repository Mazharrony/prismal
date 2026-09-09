# prismal.ae

One-page marketing site for PRISMAL, built from the design handoff in
`docs/handoff/`. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript.

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY for the Brief form
npm run dev                  # http://localhost:3000
npm run build                # production build; / prerenders as static
```

- Copy lives in `src/content/site.ts`. The six Selected-work tiles are placeholders.
- The card cascade is driven by `src/components/StackController.tsx`; its CSS is
  the "Card cascade" block in `src/app/globals.css`.
- Departures from the handoff are listed at the top of `src/app/globals.css`.
- The Brief form emails through Resend (`src/app/actions/send-brief.ts`). The
  sender domain must be verified in Resend before `hello@prismal.ae` can send.
