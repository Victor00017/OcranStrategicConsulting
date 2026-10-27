import { createClient, type QueryParams, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

// Created only when a project is configured: @sanity/client throws on an empty projectId,
// and the site must still build before the Sanity project exists (D-017).
const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

/**
 * Server-side content fetch, cached until a Sanity webhook expires one of `tags` (lib/sanity/tags.ts).
 * Query results are typed by Sanity TypeGen when the query is declared with `defineQuery`.
 */
export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: {
  query: Query;
  params?: QueryParams;
  tags: string[];
}) {
  if (!client) {
    throw new Error(
      "Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local.",
    );
  }
  return client.fetch(query, params, { cache: "force-cache", next: { tags } });
}
