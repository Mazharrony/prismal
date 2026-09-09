import type { Metadata, Viewport } from "next";
import { Caveat, IBM_Plex_Mono, Inter, Jost } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

// The handoff loads these from Google Fonts; next/font self-hosts the same
// families and exposes them as CSS variables that globals.css maps onto the
// Tailwind font tokens. Jost, Inter and Caveat are variable fonts, so one file
// each covers every weight the design uses; IBM Plex Mono is static and needs
// its two weights named.
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

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
  themeColor: "#f6f7f9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${inter.variable} ${plex.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
