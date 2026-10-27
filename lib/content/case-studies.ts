import { sanityFetch } from "@/lib/sanity/client";
import { CASE_STUDIES_QUERY, CASE_STUDY_QUERY } from "@/lib/sanity/queries";
import { docTag, typeTag } from "@/lib/sanity/tags";
import { isSanityConfigured } from "@/sanity/env";
import { seedCaseStudies, seedCaseStudy } from "@/sanity/seed/content";
import type { CASE_STUDIES_QUERY_RESULT, CASE_STUDY_QUERY_RESULT } from "@/sanity.types";

export type CaseStudySummary = CASE_STUDIES_QUERY_RESULT[number];
export type CaseStudyDetail = NonNullable<CASE_STUDY_QUERY_RESULT>;

/** Published case studies — only those with permissionConfirmed (enforced in the query too). */
export async function getCaseStudies(): Promise<CASE_STUDIES_QUERY_RESULT> {
  if (!isSanityConfigured) return seedCaseStudies();
  return sanityFetch({ query: CASE_STUDIES_QUERY, tags: [typeTag("caseStudy")] });
}

export async function getCaseStudy(slug: string): Promise<CASE_STUDY_QUERY_RESULT> {
  if (!isSanityConfigured) return seedCaseStudy(slug);
  return sanityFetch({
    query: CASE_STUDY_QUERY,
    params: { slug },
    tags: [docTag("caseStudy", slug)],
  });
}
