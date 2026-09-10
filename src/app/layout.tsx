import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Inter, Jost } from "next/font/google";
import { SITE } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AE",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
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
      <body>{children}</body>
    </html>
  );
}
