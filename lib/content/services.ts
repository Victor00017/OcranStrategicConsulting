import { sanityFetch } from "@/lib/sanity/client";
import { SERVICE_QUERY, SERVICES_QUERY } from "@/lib/sanity/queries";
import { docTag, typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedService, seedServices } from "@/sanity/seed/content";
import type { SERVICE_QUERY_RESULT, SERVICES_QUERY_RESULT } from "@/sanity.types";

export type ServiceSummary = SERVICES_QUERY_RESULT[number];
export type ServiceDetail = NonNullable<SERVICE_QUERY_RESULT>;

/** All services in display order — Sanity, or the seed until the project exists (D-020). */
export async function getServices(): Promise<SERVICES_QUERY_RESULT> {
  if (!isSanityConfigured) return seedServices();
  return sanityFetch({ query: SERVICES_QUERY, tags: [typeTag("service")] });
}

/** One service by slug, or null. Also tagged `industry` because it shows related industry titles. */
export async function getService(slug: string): Promise<SERVICE_QUERY_RESULT> {
  if (!isSanityConfigured) return seedService(slug);
  return sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    tags: [docTag("service", slug), typeTag("industry")],
  });
}
