import { sanityFetch } from "@/lib/sanity/client";
import { PAGE_INTROS_QUERY } from "@/lib/sanity/queries";
import { typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedPageIntros } from "@/sanity/seed/content";
import type { PAGE_INTROS_QUERY_RESULT } from "@/sanity.types";

/** Index-page introductions from Site settings, or the seed until Sanity is configured (D-020). */
export async function getPageIntros(): Promise<PAGE_INTROS_QUERY_RESULT> {
  if (!isSanityConfigured) return seedPageIntros();
  return sanityFetch({ query: PAGE_INTROS_QUERY, tags: [typeTag("siteSettings")] });
}
