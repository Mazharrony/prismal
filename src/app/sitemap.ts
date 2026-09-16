import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}/pdf-toolkit/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
