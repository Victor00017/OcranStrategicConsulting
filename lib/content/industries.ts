import { sanityFetch } from "@/lib/sanity/client";
import { INDUSTRIES_QUERY, INDUSTRY_QUERY } from "@/lib/sanity/queries";
import { docTag, typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedIndustries, seedIndustry } from "@/sanity/seed/content";
import type { INDUSTRIES_QUERY_RESULT, INDUSTRY_QUERY_RESULT } from "@/sanity.types";

export type IndustrySummary = INDUSTRIES_QUERY_RESULT[number];
export type IndustryDetail = NonNullable<INDUSTRY_QUERY_RESULT>;

/** All industries in display order — Sanity, or the seed until the project exists (D-020). */
export async function getIndustries(): Promise<INDUSTRIES_QUERY_RESULT> {
  if (!isSanityConfigured) return seedIndustries();
  return sanityFetch({ query: INDUSTRIES_QUERY, tags: [typeTag("industry")] });
}

/** One industry by slug, or null. Also tagged `service` because it lists related services. */
export async function getIndustry(slug: string): Promise<INDUSTRY_QUERY_RESULT> {
  if (!isSanityConfigured) return seedIndustry(slug);
  return sanityFetch({
    query: INDUSTRY_QUERY,
    params: { slug },
    tags: [docTag("industry", slug), typeTag("service")],
  });
}

/**
 * Services linked from either side — the industry's own list first, then services that name this
 * industry — without duplicates.
 */
export function servicesForIndustry({ relatedServices, servedBy }: IndustryDetail) {
  const seen = new Set<string>();
  return [...(relatedServices ?? []), ...servedBy].filter(
    (service) => !seen.has(service._id) && seen.add(service._id),
  );
}
