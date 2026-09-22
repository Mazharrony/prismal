import type { Metadata } from "next";
import { SITE } from "@/content/site";

/** Stable identifiers other JSON-LD nodes point at with `@id`. */
export const ORG_ID = `${SITE.url}/#org`;
export const WEBSITE_ID = `${SITE.url}/#website`;

/** Absolute URL for a site path. "/" is the bare origin, which is what the canonical has always been. */
export const absolute = (path: string) =>
  path === "/" ? SITE.url : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export type PageMeta = {
  /** Page title without the brand; the root layout's template adds " — Prismal". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/websites". Becomes the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  /** Keep the page out of search engines (it still resolves). */
  noindex?: boolean;
  /** Site-relative OG image. Without one the root `opengraph-image.tsx` applies. */
  image?: string;
  /** Use the title exactly as given, without the layout's " — Prismal" suffix. */
  absoluteTitle?: boolean;
};

/**
 * Every route builds its metadata through here so the canonical, og:url and
 * twitter card always agree with the page itself. The root layout owns
 * `metadataBase`, the title template and the site-wide JSON-LD; a key set here
 * replaces the layout's value for that key outright (Next merges shallowly),
 * which is why openGraph and twitter are given in full rather than partially.
 * Next applies the title template to og and twitter titles too, so an
 * absolute title is absolute in all three places.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  image,
  absoluteTitle = false,
}: PageMeta): Metadata {
  const images = image ? [image] : undefined;
  const resolvedTitle = absoluteTitle ? { absolute: title } : title;
  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.brand,
      locale: "en_AE",
      url: path,
      title: resolvedTitle,
      description,
      ...(images && { images }),
    },
    twitter: { card: "summary_large_image", title: resolvedTitle, description, ...(images && { images }) },
    // Only set when asked, so the layout's index/follow + googleBot directives survive the merge.
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
