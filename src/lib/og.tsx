import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";
import { PRISM_BODY, PRISM_RAYS, PRISM_VIEWBOX } from "@/lib/prism";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#0b0f14";
const PAPER = "#f3efe6";
const ACCENT = "#f9d20f";
const MUTED = "#98a2ae";
const RAY_FILL = [ACCENT, PAPER, MUTED];

type OgFont = { name: string; data: ArrayBuffer; weight: 500 | 800; style: "normal" };

/**
 * Fetches a Google Fonts family as TrueType, subset to the text it has to
 * draw. The CSS API serves TTF to a client without a browser user agent,
 * which is what Satori can read (it takes ttf/otf/woff, not woff2). Fonts are
 * fetched at build time, the same way `next/font/google` fetches the page
 * fonts; offline, the image falls back to Satori's built-in face rather than
 * failing the build.
 */
async function googleFont(family: string, weight: OgFont["weight"], text: string): Promise<OgFont | null> {
  const css = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  try {
    const sheet = await (await fetch(css)).text();
    const src = sheet.match(/src: url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/);
    if (!src) return null;
    const data = await (await fetch(src[1])).arrayBuffer();
    return { name: family, data, weight, style: "normal" };
  } catch {
    return null;
  }
}

/**
 * The share card: ink canvas, the mark with its three rays, a giant condensed
 * headline, the yellow rule and the domain — the site's own hero, at 1200×630.
 */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const footer = `${SITE.name} · ${SITE.url.replace(/^https?:\/\//, "")}`;
  const small = `${eyebrow} ${footer}`;
  const loaded = await Promise.all([
    googleFont("Big Shoulders", 800, title.toUpperCase()),
    googleFont("Jost", 500, small.toUpperCase() + small.toLowerCase()),
  ]);
  const fonts = loaded.filter((f): f is OgFont => f !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "60px 72px 56px",
          fontFamily: "Jost, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg viewBox={PRISM_VIEWBOX} width={116} height={80}>
            <path d={PRISM_BODY} fill={PAPER} />
            {PRISM_RAYS.map((d, i) => (
              <path key={d} d={d} fill={RAY_FILL[i]} />
            ))}
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 7, color: MUTED, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Big Shoulders, sans-serif",
            fontWeight: 800,
            fontSize: 172,
            lineHeight: 0.9,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: 240, height: 10, background: ACCENT, borderRadius: 5 }} />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: PAPER, textTransform: "uppercase" }}>
            {footer}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
