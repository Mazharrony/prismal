# Prismal — mark & icon pack

Vector source for the Prismal symbol. Wordmark not included (see below).

## Files

| File | Use |
|---|---|
| `01-mark-primary.svg` | Symbol, light backgrounds. Black triangle + grey rays. |
| `02-mark-reversed.svg` | Symbol, dark backgrounds. White triangle + light grey rays. |
| `03-mark-mono.svg` | Single-colour. Rays vary by length, not shade — for one-colour print, embroidery, engraving, stamps. |
| `04-icon-dark.svg` | App icon, 512×512, dark tile. |
| `05-icon-light.svg` | App icon, 512×512, light tile with hairline border. |
| `06-favicon-32.svg` | Favicon, 32×32. |

All files are plain SVG with hardcoded hex — no external fonts, no CSS variables. Open directly in Figma, Illustrator, Sketch, or Inkscape.

## Colours

| Role | Hex |
|---|---|
| Primary (triangle, solid ray) | `#1C1C1A` |
| Secondary rays, light bg | `#9A9A96` |
| Secondary rays, dark bg | `#B8B8B4` |
| Reversed triangle | `#FFFFFF` |
| Icon light-tile border | `#E6E6E2` |

## Changes from the original concept

1. **Rays exit cleanly from the notch.** In the original, the centre ray crossed back into the triangle body, which read as an arrow or checkmark to cold viewers. The rays now originate at the notch tip so the prism/refraction idea reads first.
2. **Icons use one ray, not three.** The three-ray fan disappears below roughly 24px. `04`–`06` drop to a single bold ray. Verified legible at 32px.
3. **Single-colour variant added.** `03` encodes the fan by ray length instead of grey shades, so it survives contexts with no tonal range.

## Wordmark — not included

The wordmark in the original mockup uses a geometric sans (looks like Futura, Poppins, Montserrat, or Jost — confirm with whoever produced it). That font wasn't available when these files were generated, and substituting a different face would have changed the character of the lockup, so the wordmark was left out rather than shipped wrong.

### To complete the lockup

Set `PRISMAL` in the correct face and place it against `01-mark-primary.svg`:

**Horizontal lockup**
- Mark scaled so its height ≈ 1.6× the wordmark cap height
- Wordmark vertically centred on the ray axis (the centre ray), not on the triangle's baseline
- Gap between mark's rightmost ray tip and the wordmark's first letter ≈ 0.5× cap height
- Letterspacing ≈ 0.3–0.4em

**Stacked lockup**
- Wordmark optically centred under the mark — centre on the triangle's visual mass, not the full bounding box including rays, or it will look shifted left
- Baseline ≈ 0.55× mark height below the triangle's bottom edge

**Clear space**
Minimum clear space on all sides = the height of the triangle's notch. Nothing intrudes.

**Minimum sizes**
- Full mark with grey rays: 24px tall minimum
- Below 24px: use `03-mark-mono.svg` or the icon files

## Before you commit

Run a trademark and domain check. "Prism" plus tech is crowded — Prisma (ORM), Prismatic (integrations), and others exist in dev/data tooling. Worth confirming clearance in your registration class and market before spending on brand rollout.
