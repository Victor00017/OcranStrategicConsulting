import { sanityFetch } from "@/lib/sanity/client";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedHomeContent } from "@/sanity/seed/content";
import type { HOME_QUERY_RESULT } from "@/sanity.types";

export type HomeContent = HOME_QUERY_RESULT;

/** Home page content from Sanity, or the brief's seed content until the project exists (D-020). */
export async function getHomeContent(): Promise<HomeContent> {
  if (!isSanityConfigured) return seedHomeContent();
  return sanityFetch({
    query: HOME_QUERY,
    tags: ["siteSettings", "founder", "service", "industry", "article"].map(typeTag),
  });
}
