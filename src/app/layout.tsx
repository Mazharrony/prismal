import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Inter, Jost } from "next/font/google";
import Analytics from "@/components/analytics/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/content/site";
import { organization, webSite } from "@/lib/schema";
import "./globals.css";

// Self-hosted through next/font. Big Shoulders carries the giant uppercase
// headlines; Jost the wordmark, card titles and stickers; Inter the body;
// IBM Plex Mono the labels. All variable except Plex, which needs its two
// weights named.
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-shoulders",
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

/**
 * What every page shares. Each route sets its own title, description,
 * canonical and Open Graph through `pageMetadata()` (src/lib/seo.ts). No
 * canonical at this level on purpose: a layout's canonical is inherited by
 * every child route, which would point them all at the homepage.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.brand}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.brand, locale: "en_AE" },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${shoulders.variable} ${jost.variable} ${inter.variable} ${plex.variable}`}
    >
      <body>
        {/* The studio and the site, once; every page's own graph points at these by @id. */}
        <JsonLd data={[organization(), webSite()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
