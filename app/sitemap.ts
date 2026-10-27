import type { MetadataRoute } from "next";
import { getIndustries } from "@/lib/content/industries";
import { getServices } from "@/lib/content/services";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

/**
 * Only routes that exist are listed — a sitemap full of 404s hurts crawling (D-018).
 * Content routes join as their pages ship: services and industries now; articles, case studies next.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries] = await Promise.all([getServices(), getIndustries()]);
  return [
    ...STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path) })),
    ...services.map((doc) => contentEntry(`/services/${doc.slug}`, doc._updatedAt)),
    ...industries.map((doc) => contentEntry(`/industries/${doc.slug}`, doc._updatedAt)),
  ];
}

// Seed content has no edit date (empty _updatedAt); Sanity documents do.
function contentEntry(path: string, updatedAt: string): MetadataRoute.Sitemap[number] {
  return { url: absoluteUrl(path), ...(updatedAt ? { lastModified: updatedAt } : {}) };
}
