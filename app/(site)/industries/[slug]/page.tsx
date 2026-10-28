import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryView } from "@/components/sections/industry-view";
import { getIndustries, getIndustry } from "@/lib/content/industries";
import { buildMetadata } from "@/lib/seo";

// Pre-render every known industry; industries published later render on first request.
export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    ...(industry.seo?.metaTitle
      ? { fullTitle: industry.seo.metaTitle }
      : { title: industry.title }),
    description: industry.seo?.metaDescription || industry.summary || industry.title,
    path: `/industries/${slug}`,
    image: industry.seo?.ogImage ? { url: industry.seo.ogImage, alt: industry.title } : undefined,
    noindex: industry.seo?.noindex ?? false,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const [industry, industries] = await Promise.all([getIndustry(slug), getIndustries()]);
  if (!industry) notFound();
  return (
    <IndustryView industry={industry} otherIndustries={industries.filter((i) => i.slug !== slug)} />
  );
}
