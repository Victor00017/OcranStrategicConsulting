import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceCard } from "@/components/sections/service-card";
import { Container } from "@/components/ui/container";
import { getPageIntros } from "@/lib/content/pages";
import { getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";

// Description built only from brief facts (service lines + location); client to approve (PROGRESS).
export const metadata = buildMetadata({
  title: "Services",
  description:
    "Six service lines from Ocran Strategic Consulting in Tema, Ghana: strategy, agribusiness advisory, SME growth, fundraising, research and policy, and training.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, intros] = await Promise.all([getServices(), getPageIntros()]);
  return (
    <>
      <PageHeader eyebrow="Services" title="Our services" intro={intros?.servicesIntro} />
      <section aria-label="All services">
        <Container className="py-16 md:py-24">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service._id}>
                <ServiceCard
                  index={index + 1}
                  title={service.title}
                  slug={service.slug}
                  summary={service.summary}
                  subServices={service.subServices}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand
        eyebrow="Contact"
        heading="Start a conversation"
        action={{ href: "/contact", label: "Request a consultation" }}
      />
    </>
  );
}
