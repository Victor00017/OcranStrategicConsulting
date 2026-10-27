import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/sections/case-study-view";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seo?.metaTitle || study.title,
    description: study.seo?.metaDescription || study.challenge || study.title,
    path: `/case-studies/${slug}`,
    image: study.seo?.ogImage ? { url: study.seo.ogImage, alt: study.title } : undefined,
    noindex: study.seo?.noindex ?? false,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}
