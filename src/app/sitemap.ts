import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/routes";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((r) => ({
    url: absolute(r.path),
    lastModified: new Date(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
