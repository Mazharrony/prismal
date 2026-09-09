# Handoff: Prismal.ae marketing site redesign

## Overview
A single-page marketing site for PRISMAL, a Dubai-based studio building websites, software, and AI/automation for the UAE and GCC. The page is one continuous scroll made of nine full-viewport "cards" that stack on top of each other as you scroll (a sticky card cascade), preceded by a 1.95s brand splash animation.

Sections in order: Splash → Header → Hero → 01 Services → 02 What we build → 03 Selected work → 02 The Prism Method → 03 How we work → 04 Results → 05 FAQ → 06 Contact + footer.

## About the Design Files
The files in `design/` are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. `Prismal Redesign v2.dc.html` runs on a small in-house component runtime (`support.js`, which provides `<x-dc>`, `<sc-for>`, `<sc-if>`, and `{{ }}` template holes) and is meant to be *read*, not shipped.

The task is to **recreate this design in the target codebase's environment** using its established patterns. If no codebase exists yet, Next.js (App Router) + Tailwind is the natural fit — the design already assumes a static marketing page with a handful of client-side interactions.

Translation notes:
- `<sc-for list="{{ x }}" as="item">` → a `.map()` over the array `x` defined in the logic class at the bottom of the file.
- `<sc-if value="{{ flag }}">` → conditional render.
- `style-hover="…"` → a `:hover` rule / Tailwind `hover:` variant with those declarations.
- All state lives in one component (`class Component`): `{ tab, ray, step, faq, spread }`.

## Fidelity
**High-fidelity.** Colors, typography, spacing, motion timings and copy are final. Recreate pixel-accurately. The one deliberately unfinished area is **Selected work** — client names, metrics and images are placeholders (see below).

## Design Tokens

### Color (the whole palette — five neutrals plus one accent)
| Token | Hex | Use |
|---|---|---|
| Ink | `#0b0f14` | Text, dark cards, primary buttons |
| Muted | `#64748b` | Secondary text, eyebrow labels, third ray |
| Border | `#e2e8f0` | 1px borders, dividers, inactive bars |
| Surface | `#f6f7f9` | Page background, tile backgrounds |
| White | `#ffffff` | Card backgrounds |
| Accent | `#f9d20f` | Yellow — CTA text on ink, ray 01, Results card |
| Slate-300 | `#cbd5e1` | Body copy inside the dark Method card |

Alpha variants used verbatim: `#0b0f140f`, `#0b0f1414`, `#0b0f1440`, `#0b0f1466`, `#0b0f14aa`, `#f9d20f2a`, `#f9d20f66`, `#ffffff2e`, `rgba(255,255,255,.14)`, `rgba(246,247,249,.85)`.

### Typography
- **Jost** 400/500/600 — all headings, wordmark, big numerals, buttons inside cards.
- **Inter** 400/500/600 — body copy, nav links, form labels.
- **IBM Plex Mono** 400/500 — eyebrow labels, step/kit numbers, metrics, footer line. Always uppercase with `letter-spacing:.2em` (or `.14em` for the tighter metric lines), size 10–12px, color `#64748b`.
- **Caveat** 500/600 — the handwritten "Keep scrollin'…" notes pinned top-right of each card, 20px, `rotate(-3deg)`, `pointer-events:none`. These are a deliberate device; keep them.

Loaded from Google Fonts:
`https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Caveat:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap`

Heading scale (all Jost 500, `letter-spacing:-.02em`, `line-height:1`):
- H1 hero: `clamp(48px,7vw,104px)`, `line-height:.95`, `letter-spacing:-.025em`
- H2 section: `clamp(36px,4.5vw,64px)`
- H2 contact: `clamp(44px,6vw,88px)`, `line-height:.95`
- H3 card title: `clamp(26px,2.6vw,36px)` (services) / `clamp(30px,3vw,44px)` (method) / `clamp(30px,3vw,40px)` (ways)
- H4 tile title: 21–22px, `line-height:1.15`
- Body: 15–17px, `line-height:1.5–1.65`

### Spacing / radius / shadow
- Page gutter: `max-width:1280px; margin:0 auto; padding:16px 28px 96px`
- Card radius: `32px` (24px on mobile); tiles `18–24px`; pills `999px`
- Card padding: `clamp(28px,4vw,48px)`; hero `clamp(36px,5vw,64px) clamp(24px,4vw,56px)`
- Hero card shadow: `0 1px 2px 0 #0b0f140f, 0 4px 12px -2px #0b0f1414`
- Stacked card shadow (the upward lip that sells the cascade): `0 -16px 48px -12px #0b0f1440` (light cards) / `#0b0f1466` (dark cards)
- Contact form card shadow: `0 24px 48px -12px #00000066`

## The card cascade (most important structural detail)
Every section is `position:sticky` with an increasing `top` and `z-index`, so each card pins 14px below the previous one and the next card slides over it:

| Section | `top` | `z-index` | `min-height` |
|---|---|---|---|
| header | 0 | 50 | — |
| Hero | 64px | 1 | `calc(100vh - 64px)` |
| Services `#services` | 78px | 2 | `calc(100vh - 78px)` |
| What we build `#build` | 92px | 3 | `calc(100vh - 92px)` |
| Selected work `#work` | 106px | 4 | `calc(100vh - 106px)` |
| Method `#method` | 120px | 5 | `calc(100vh - 120px)` |
| How we work `#engage` | 134px | 6 | `calc(100vh - 134px)` |
| Results `#results` | 148px | 7 | `calc(100vh - 148px)` |
| FAQ `#faq` | 162px | 8 | `calc(100vh - 162px)` |
| Contact `#contact` | 176px | 9 | `calc(100vh - 176px)` |

Each section is `display:flex; flex-direction:column` and its single child card is `flex:1 1 auto; overflow:hidden`.

**Known constraint the implementer must resolve:** `#build` and `#work` carry more content than fits a short viewport. Because a sticky element taller than the viewport pins and never advances, their lower content becomes unreachable below roughly 900px of viewport height. Recommended fix in the real build: apply the pin conditionally — `@media (min-height:900px) { position: sticky }` — and let those two sections scroll normally on short screens. This was left as-is in the prototype at the client's request.

Also fixed on the page: a 4px full-height scroll-progress rail on the left edge (`background:#e2e8f0`, fill `#0b0f14`), whose fill height is set to the scroll percentage on a passive scroll listener.

## Screens / Views

### Splash (`#splash`)
Full-screen `#0b0f14` overlay, `position:fixed; inset:0; z-index:200; pointer-events:none`, containing the prism mark drawn as inline SVG (`viewBox 0 0 232 160`, width `clamp(150px,17vw,232px)`), a 1px `#ffffff2e` rule, and the wordmark PRISMAL (Jost 400, 13px, white).

Choreography, all with `both` fill:
1. `sp-reveal` .62s `cubic-bezier(.66,0,.24,1)` — prism body wipes up via `clip-path: inset(100% 0 0 0) → inset(0)`.
2. `sp-ray` .5s `cubic-bezier(.2,.85,.25,1)` at delays .5s / .58s / .66s — the three rays (`#f9d20f`, `#fff`, `#64748b`) scale out from the prism's exit point (`transform-origin:92px 92px; transform-box:view-box`).
3. `sp-rule` .7s at .62s — the rule scales in from left.
4. `sp-word` .8s at .68s — wordmark fades in as letter-spacing tightens `.78em → .34em`.
5. `sp-lift` 1.95s `cubic-bezier(.76,0,.24,1)` on the panel — holds until 68%, then `translateY(-101%)`.

Dismissal: auto-hide at 2000ms (fade out .3s, then `display:none`); any `pointerdown`, `Escape`, or `Space` skips it early. `@media (prefers-reduced-motion:reduce)` hides the splash entirely.

### Header
Sticky, `rgba(246,247,249,.85)` + `backdrop-filter:blur(14px)`, `border-bottom:1px solid #e2e8f0`, inner `padding:14px 28px`. Left: 22px mark SVG + "PRISMAL" (Jost 500, 14px, `letter-spacing:.35em`). Right: pill nav links (`padding:9px 16px; border-radius:999px; background:#fff; border:1px solid #e2e8f0; 13px/600`; hover `background:#f6f7f9`), then the CTA pill "Start a project →" (`background:#0b0f14; color:#f9d20f; 13px/700; padding:9px 18px`; hover `background:#64748b`).

### Hero
Two-column flex (`gap:32px 40px`, wraps). Left (`flex:1 1 360px`, max 640px): eyebrow "NOISE IN" and an SVG scene (`viewBox 0 150 900 400`, max-height 340px) — six flickering noise phrases in IBM Plex Mono 21px `#64748b`, a horizontal beam (`#0b0f14`, with a `feGaussianBlur stdDeviation=5` glow copy at 35% opacity) with four dots animating along it on a 2.4s loop, the prism mark scaled 2.2×, and three rays popping out at 1.45/1.52/1.59s with a spectral gradient that settles over 2.2s. A burst circle fires at 1.4s at the prism's entry point.

Right (`flex:1 1 260px`): eyebrow "SPECTRUM OUT" and three ray cards, `padding:18px 22px; border-radius:16px`, Jost 500 26px, hover `translateX(8px)`:
- Website — `#f9d20f` on ink, label "RAY 01 →"
- Software — `#f6f7f9` + border, "RAY 02 →"
- AI & Automation — `#0b0f14`/white, "RAY 03 →"

Below, separated by `border-top:1px solid #e2e8f0; padding-top:28px`: H1 "Noise in. / *Spectrum out.*" — the italic line carries a yellow underline via `box-shadow: inset 0 -.14em 0 #f9d20f`. Right of it, the intro paragraph (17px) and two CTA pills.

### 01 Services (`#services`)
Eyebrow "01 · WHAT WE REFRACT", H2 "Three rays. One firm.", intro paragraph. Three full-width rows (`display:grid; gap:8px`), each a link with `grid-template-columns:48px minmax(0,1fr) 32px`, `padding:24px 28px`, `border-radius:18px`, hover `translateX(12px)`:
| # | Title | bg | fg |
|---|---|---|---|
| 01 | Website | `#f9d20f` | `#0b0f14` |
| 02 | Software | `#ffffff` | `#0b0f14` |
| 03 | AI & Automation | `#0b0f14` | `#fff` |

### 02 What we build (`#build`)
Eyebrow "02 / WHAT WE BUILD", H2 "Site kits, not site packages."

Two **pillar** cards (`repeat(auto-fit,minmax(min(100%,280px),1fr))`, `padding:clamp(24px,3vw,34px)`, `border-radius:22px`): "Next.js commerce" (ink card, yellow eyebrow + stack line) and "Shopify storefront" (white card, 1px ink border).

Then six **kit** tiles (`repeat(auto-fit,minmax(min(100%,230px),1fr))`, `padding:22px`, `border-radius:18px`, `background:#f6f7f9`, hover `translateY(-3px)` + `border-color:#0b0f14`): Real estate, Local business, Corporate & CMS, Web apps & portals, Campaign & landing, Replatform & rescue. Each has KIT 0n / H4 21px / 14px description / a mono stack line above a `border-top:1px solid #e2e8f0`.

### 03 Selected work (`#work`) — PLACEHOLDER CONTENT
Eyebrow "03 / SELECTED WORK", H2 "Six builds, one method." Six tiles, `repeat(auto-fit,minmax(min(100%,260px),1fr))`, `grid-template-rows:auto 1fr` so the text block never squeezes. Each tile: a `aspect-ratio:4/3` image area (`background:#e2e8f0`, `border-radius:19px 19px 0 0`, `overflow:hidden`) over a `padding:20px` text block (mono category / H4 22px / 14px description / mono metric line).

**All six client names, descriptions and metrics are invented placeholders** (Maison Dates, Aster Living, Marasi Properties, Clinica Nova, Falcon Freight, Sabaya Beauty). Replace with real work before launch. In the prototype the images are `<image-slot>` drag-and-drop placeholders (`image-slot.js`, persists drops to localStorage) — in production these are plain `<img>` / `next/image`.

### 02 The Prism Method (`#method`)
Dark card (`#0b0f14`) with a decorative overlay: `radial-gradient(ellipse at 15% 0%, #f9d20f2a, transparent 45%), radial-gradient(ellipse at 90% 100%, #0b0f14aa, transparent 50%)`. Three columns (`repeat(auto-fit,minmax(240px,1fr))`), each with a `border-top:1px solid rgba(255,255,255,.14)` that fills with a 3px colored bar (`transform:scaleX()` over `.7s cubic-bezier(.2,.8,.2,1)`) and an 18px dot with `box-shadow:0 0 0 6px #0b0f14, 0 0 24px <glow>`.

Steps: 01 Input (`#f9d20f`), 02 Refraction (`#e2e8f0`), 03 Spectrum (`#fff`). The active step advances automatically every 2800ms and on `mouseenter`; inactive steps drop to `opacity:.45`.

### 03 How we work (`#engage`)
Eyebrow "03 · HOW WE WORK TOGETHER", H2 "Three ways to start." Above the cards, a duration bar: `grid-template-columns: minmax(0,1fr) minmax(0,4fr) minmax(0,3fr)`, three 14px `border-radius:999px` bars (`#f9d20f`, `#e2e8f0`, a gradient fading out of `#0b0f14`) with mono labels "1–2 WEEKS / 4–12 WEEKS / ONGOING →".

Three cards (`minmax(260px,1fr)`, `padding:28px`, `border-radius:24px`): 01 Refraction Sprint (surface, yellow border), 02 Build (surface, border), 03 Run (ink, white text). Each ends with a bulleted list pushed to the bottom via `margin:auto 0 0` and separated by `border-top`; bullets are 18px×2px `currentColor` dashes at 50% opacity.

### 04 Results (`#results`)
Full yellow card (`#f9d20f`). Eyebrow "04 · WHAT COMES OUT THE OTHER SIDE", H2 "Systems, not slideware." Four stats in `repeat(auto-fit,minmax(200px,1fr))`, each `border-top:2px solid #0b0f14`, numeral Jost 500 `clamp(40px,5vw,80px)` `letter-spacing:-.03em`: −70%, Weeks, 24/7, 3 → 1.

### 05 FAQ (`#faq`)
Two columns (`repeat(auto-fit,minmax(300px,1fr))`, gap 32px): heading left, accordion right. Six items, each `border-top:1px solid #e2e8f0`, a full-width `<button>` (Jost 500 22px, `padding:18px 0`) with a 32px circular toggle — closed `#f6f7f9`/ink with `+`, open `#0b0f14`/`#f9d20f` with `−`. One item open at a time; item 0 open by default; clicking the open item closes all (`faq = -1`). Answer paragraph 15px/1.65 with `padding:0 48px 20px 0`.

### 06 Contact (`#contact`)
Ink card, two columns (`minmax(300px,1fr)`, gap 40px), with a 360px yellow radial glow bleeding off the top-right corner. Left: eyebrow, H2 "Refract your workflow.", 17px intro, location line. Right: a white form card (`border-radius:24px; padding:22px; max-width:460px; justify-self:end`) with a three-tab segmented control (`background:#f6f7f9; border-radius:14px; padding:4px`; active tab `#0b0f14` bg / `#f9d20f` text, inactive transparent / `#64748b`):
- **Brief** (default): Your name + Company inputs side by side, a textarea "What do you need built?" (min-height 96px), and a "Send the brief →" pill (`mailto:hello@prismal.ae`).
- **Email**: a row linking `hello@prismal.ae`.
- **WhatsApp**: a row linking `https://wa.me/971507217156`.

Labels are 11px/700 `letter-spacing:.14em` `#64748b` uppercase. The two text inputs use the **Storefront** design system's `Input` component; match that in the target codebase.

Footer sits inside the same section: mark + wordmark, five nav links (13px/600 `#64748b`), and "© 2026 PRISMAL — NOISE IN. SPECTRUM OUT." in mono 11px.

## Interactions & Behavior
| Behavior | Detail |
|---|---|
| Splash | Auto-dismiss 2000ms; skip on pointerdown / Escape / Space; hidden entirely under `prefers-reduced-motion` |
| Scroll rail | Left 4px rail fill height = `scrollY / (scrollHeight - innerHeight) * 100%`, passive listener |
| Hero rays | `spread` state derived from `min(1, scrollY / 400)`; only re-renders when it changes by >0.02 |
| Method steps | `setInterval` 2800ms cycles 0→1→2; `mouseenter` on a column sets it directly |
| FAQ | Single-open accordion, toggling the open one closes all |
| Contact tabs | Three mutually exclusive panels |
| Nav | Anchor links to section ids; `scroll-behavior:smooth` on `html` |
| Hover | Ray/service rows `translateX(8–12px)`; tiles `translateY(-3px)` + `border-color:#0b0f14`; dark pills → `#64748b`; light pills → `#f6f7f9`. All `transition: transform .2s` (services `.25s`) |

## State Management
One component holds everything:
```
{ tab: 0,      // contact tab (0 Brief, 1 Email, 2 WhatsApp)
  ray: 0,      // reserved, unused in current layout
  step: 0,     // active Prism Method step
  faq: 0,      // open FAQ index, -1 = all closed
  spread: 0 }  // 0–1 scroll-driven hero ray spread
```
Plus two refs: the scroll-rail fill (mutated directly, not via state) and the splash overlay. No data fetching — all copy is static. The brief form is not wired to a backend; the button is a `mailto:` link. Decide with the client whether to wire it to a real endpoint.

## Responsive behavior
- Single breakpoint at **860px**: `#work` and `#build` lose their viewport `min-height`, padding drops to `12px 16px 72px`, card padding to `24px 20px`, radius to `24px`, the Caveat notes are hidden, H2 becomes `clamp(28px,7.4vw,40px)`.
- A second at **520px**: `#build` card padding `20px 16px`, kit tiles `18px 16px`, mono stack lines get `word-break:break-word`.
- Everything else relies on `auto-fit` grids and `flex-wrap`, so it reflows without explicit queries.
- Mobile nav is not designed — the pill row currently wraps. Ask the client whether they want a drawer at mobile widths; the Storefront `Sheet` component is available for it.

## Assets
| File | Use |
|---|---|
| `assets/01-mark-primary.svg` | Header and footer mark (ink on light) |
| `assets/02-mark-reversed.svg` | Reversed mark for dark grounds (not currently placed) |
| `assets/05-icon-light.svg` | Light icon variant (not currently placed) |

The splash and hero prisms are **inline SVG paths**, not files — copy the path data out of the HTML: body `M0 160 L88 0 L112 45 L88 90 L176 160 Z`, rays `M92 92 L230 40 L230 62 Z`, `M92 92 L232 88 L232 100 Z`, `M92 92 L230 122 L230 144 Z`.

No photography exists yet. The six work tiles need real screenshots at 4:3.

## Design system
The prototype loads the **Storefront** design system bundle (`_ds/design-system-69b9501c-800b-408d-8d13-bf844992ff99/`) and uses its `Input` component in the contact form. Storefront is a Tailwind v4 + `cn()` library exposing `Button`, `Badge`, `Input`, `Separator`, `Sheet`, `Skeleton`. If the target codebase already has Storefront, use its components for the form controls and any future buttons; the bundle is not included in this zip since it is versioned separately.

## Files
```
design/Prismal Redesign v2.dc.html   the full design — read this alongside the README
design/support.js                    prototype runtime (reference only, do not ship)
design/image-slot.js                 drag-and-drop image placeholder used in Selected work (do not ship)
assets/*.svg                         brand marks
```
