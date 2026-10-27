import { sanityFetch } from "@/lib/sanity/client";
import { LEGAL_PAGE_QUERY } from "@/lib/sanity/queries";
import { docTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedLegalPage } from "@/sanity/seed/content";
import type { LEGAL_PAGE_QUERY_RESULT } from "@/sanity.types";

export type LegalPage = NonNullable<LEGAL_PAGE_QUERY_RESULT>;

/** /privacy or /terms — Sanity, or the drafted seed until the project exists (D-020, D-029). */
export async function getLegalPage(slug: "privacy" | "terms"): Promise<LEGAL_PAGE_QUERY_RESULT> {
  if (!isSanityConfigured) return seedLegalPage(slug);
  return sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { slug },
    tags: [docTag("legalPage", slug)],
  });
}
