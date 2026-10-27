import { sanityFetch } from "@/lib/sanity/client";
import { ABOUT_QUERY, PUBLICATIONS_QUERY } from "@/lib/sanity/queries";
import { typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedAbout, seedPublications } from "@/sanity/seed/content";
import type { ABOUT_QUERY_RESULT, PUBLICATIONS_QUERY_RESULT } from "@/sanity.types";

export type AboutContent = ABOUT_QUERY_RESULT;
export type Publication = PUBLICATIONS_QUERY_RESULT[number];

/** /about content — Sanity, or the seed until the project exists (D-020). */
export async function getAbout(): Promise<ABOUT_QUERY_RESULT> {
  if (!isSanityConfigured) return seedAbout();
  return sanityFetch({ query: ABOUT_QUERY, tags: ["aboutPage", "founder"].map(typeTag) });
}

/** All publications, newest first. */
export async function getPublications(): Promise<PUBLICATIONS_QUERY_RESULT> {
  if (!isSanityConfigured) return seedPublications();
  return sanityFetch({ query: PUBLICATIONS_QUERY, tags: [typeTag("publication")] });
}
