import { createClient, type QueryParams, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

// Created only when a project is configured: @sanity/client throws on an empty projectId,
// and the site must still build before the Sanity project exists (D-017).
const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

// Backstop for the webhook (D-025): cached content is refetched at most this long after a Studio edit,
// even if /api/revalidate never fires (webhook missing, misconfigured or down).
const REVALIDATE_SECONDS = 3600;

/**
 * Server-side content fetch, cached until a Sanity webhook expires one of `tags` (lib/sanity/tags.ts),
 * or REVALIDATE_SECONDS pass. Query results are typed by Sanity TypeGen when declared with `defineQuery`.
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
  return client.fetch(query, params, {
    cache: "force-cache",
    next: { tags, revalidate: REVALIDATE_SECONDS },
  });
}
