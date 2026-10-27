import type { MetadataRoute } from "next";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

/**
 * Only routes that exist are listed — a sitemap full of 404s hurts crawling.
 * Build steps 5+ add Sanity-driven routes here (services, industries, articles, case studies)
 * with `lastModified` from `_updatedAt`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path) }));
}
