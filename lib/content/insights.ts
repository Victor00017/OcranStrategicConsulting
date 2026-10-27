import { sanityFetch } from "@/lib/sanity/client";
import { ARTICLE_QUERY, ARTICLES_QUERY } from "@/lib/sanity/queries";
import { docTag, typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedArticle, seedArticles } from "@/sanity/seed/content";
import type { ARTICLE_QUERY_RESULT, ARTICLES_QUERY_RESULT } from "@/sanity.types";

export type ArticleSummary = ARTICLES_QUERY_RESULT[number];
export type ArticleDetail = NonNullable<ARTICLE_QUERY_RESULT>;

/** All articles, newest first — Sanity, or the (empty) seed until the project exists (D-020). */
export async function getArticles(): Promise<ARTICLES_QUERY_RESULT> {
  if (!isSanityConfigured) return seedArticles();
  return sanityFetch({ query: ARTICLES_QUERY, tags: [typeTag("article")] });
}

/**
 * One article with author box and related articles. Tagged with every type it shows, so editing a
 * related article, a linked service or the founder refreshes it.
 */
export async function getArticle(slug: string): Promise<ARTICLE_QUERY_RESULT> {
  if (!isSanityConfigured) return seedArticle(slug);
  return sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    tags: [docTag("article", slug), typeTag("article"), typeTag("service"), typeTag("founder")],
  });
}
