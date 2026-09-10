# prismal.ae

One-page marketing site for PRISMAL. Next.js 16 (App Router), React 19,
Tailwind v4, TypeScript.

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY for the Brief form
npm run dev                  # http://localhost:3000
npm run build                # production build; / prerenders as static
```

## Direction

Dark, full-bleed "spectrum" world: ink canvas, warm paper type, the yellow
beam, three sticker colours. Giant condensed headlines (Big Shoulders),
wave seams between bands, floating pill nav and bottom dock, a marquee, and
a cursor tag. The original handoff (light card cascade) is kept in
`docs/handoff/` for the copy, tokens and structure it still supplies.

- Copy lives in `src/content/site.ts`, including the twelve live builds in
  `WORK` and the hero trust stickers in `TRUST`.
- Sections are `Band`s (`src/components/Band.tsx`) with a `Wave` seam; tones
  are ink / paper / accent / violet.
- Motion is transform/opacity only, and everything has a reduced-motion
  fallback: no splash, no beam draw, no sticker float, no reveal, no marquee,
  no cursor tag. Without JS the page renders fully visible.
- The Brief form emails through Resend (`src/app/actions/send-brief.ts`); the
  quick-pick chips prefill the textarea and travel as `service`. The sender
  domain must be verified in Resend before `hello@prismal.ae` can send.
