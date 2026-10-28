import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/sections/service-view";
import { getService, getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";

// Pre-render every known service; services published later render on first request.
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return buildMetadata({
    ...(service.seo?.metaTitle ? { fullTitle: service.seo.metaTitle } : { title: service.title }),
    description: service.seo?.metaDescription || service.summary || service.title,
    path: `/services/${slug}`,
    image: service.seo?.ogImage ? { url: service.seo.ogImage, alt: service.title } : undefined,
    noindex: service.seo?.noindex ?? false,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();
  return <ServiceView service={service} otherServices={services.filter((s) => s.slug !== slug)} />;
}
