import type { MetadataRoute } from "next";

export type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SiteRoute = {
  path: string;
  /** ISO date of the last meaningful content change. Set by hand — never "now". */
  updated: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  /** Resolves, but stays out of the sitemap and carries a noindex tag. */
  noindex?: boolean;
};

/**
 * Hand-kept pages. As content registries land (services, work, guides) they
 * join this list, so the sitemap, breadcrumbs and related-link cards all read
 * from one place.
 */
export const STATIC_ROUTES: readonly SiteRoute[] = [
  { path: "/", updated: "2026-09-22", changeFrequency: "weekly", priority: 1 },
  // Third-party app policies hosted here; kept live for their store listings, kept out of search.
  { path: "/pdf-toolkit/privacy", updated: "2026-09-04", changeFrequency: "yearly", priority: 0.2, noindex: true },
  { path: "/pour-party/privacy", updated: "2026-09-30", changeFrequency: "yearly", priority: 0.2, noindex: true },
  { path: "/khatabook/privacy", updated: "2026-10-01", changeFrequency: "yearly", priority: 0.2, noindex: true },
  { path: "/fuel-log/privacy", updated: "2026-10-01", changeFrequency: "yearly", priority: 0.2, noindex: true },
];

export function indexableRoutes(): SiteRoute[] {
  return STATIC_ROUTES.filter((r) => !r.noindex);
}
