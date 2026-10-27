import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// docs/SEO.md §1: allow all, keep the Studio and API out of search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
