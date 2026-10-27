import type { MetadataRoute } from "next";
import { getServices } from "@/lib/content/services";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

/**
 * Only routes that exist are listed — a sitemap full of 404s hurts crawling (D-018).
 * Content routes join as their pages ship: services now; industries, articles, case studies next.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  return [
    ...STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path) })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      // Seed content has no edit date; Sanity documents do.
      ...(service._updatedAt ? { lastModified: service._updatedAt } : {}),
    })),
  ];
}
