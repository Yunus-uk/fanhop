import type { MetadataRoute } from "next";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/today`, changeFrequency: "hourly", priority: 0.9 },
    ...CITIES.map((c) => ({
      url: `${SITE_URL}/city/${c.id}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
