import type { MetadataRoute } from "next";
import { getPublications } from "@/lib/content/about";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getIndustries } from "@/lib/content/industries";
import { getArticles } from "@/lib/content/insights";
import { getServices } from "@/lib/content/services";
import { STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

/**
 * Only routes that exist are listed — a sitemap full of 404s hurts crawling (D-018).
 * Content routes join as their pages ship. Publications, insights and case studies join once they have entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, publications, articles, caseStudies] = await Promise.all([
    getServices(),
    getIndustries(),
    getPublications(),
    getArticles(),
    getCaseStudies(),
  ]);
  return [
    ...STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path) })),
    ...services.map((doc) => contentEntry(`/services/${doc.slug}`, doc._updatedAt)),
    ...industries.map((doc) => contentEntry(`/industries/${doc.slug}`, doc._updatedAt)),
    // Listed only once it has entries; until then the page is noindex.
    ...(publications.length ? [{ url: absoluteUrl("/publications") }] : []),
    ...(articles.length ? [{ url: absoluteUrl("/insights") }] : []),
    ...articles.map((doc) => contentEntry(`/insights/${doc.slug}`, doc._updatedAt)),
    ...(caseStudies.length ? [{ url: absoluteUrl("/case-studies") }] : []),
    ...caseStudies.map((doc) => contentEntry(`/case-studies/${doc.slug}`, doc._updatedAt)),
  ];
}

// Seed content has no edit date (empty _updatedAt); Sanity documents do.
function contentEntry(path: string, updatedAt: string): MetadataRoute.Sitemap[number] {
  return { url: absoluteUrl(path), ...(updatedAt ? { lastModified: updatedAt } : {}) };
}
