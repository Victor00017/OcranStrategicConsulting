import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/lib/content/home";
import { TAGLINE } from "@/lib/seo";
import { ArticleCard } from "./article-card";
import { AudienceCards } from "./audience-cards";
import { CtaBand } from "./cta-band";
import { FounderStrip } from "./founder-strip";
import { HomeHero } from "./home-hero";
import { IndustryChip } from "./industry-chip";
import { ProcessSteps } from "./process-steps";
import { ServiceCard } from "./service-card";
import { TrackRecord } from "./track-record";

/**
 * Home page (D-024). Job: turn a first-time visitor into someone who opens a service or requests a
 * consultation. Order: offer (hero + deliverables) · who we work with · services · how we work ·
 * track record · sectors · who leads the work · insights · CTA. Empty sections render nothing.
 */
export function HomeView({ content }: { content: HomeContent }) {
  const { settings, home, founder, services, industries, articles } = content;
  const proofPoints = settings?.proofPoints ?? [];
  const trackRecord = home?.trackRecord ?? [];

  return (
    <>
      <HomeHero
        tagline={settings?.tagline || TAGLINE}
        valueProp={settings?.valueProp ?? null}
        deliverables={home?.deliverables ?? []}
      />

      {home?.audiences?.length ? <AudienceCards audiences={home.audiences} /> : null}

      {services.length ? (
        <section aria-labelledby="services-heading" className="py-16 md:py-28">
          <Container>
            <SectionHeadingRow id="services-heading" eyebrow="Services" heading="What we do">
              <Button href="/services" variant="link">
                All services
              </Button>
            </SectionHeadingRow>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      ) : null}

      {home?.process?.length ? <ProcessSteps steps={home.process} /> : null}

      {proofPoints.length || trackRecord.length ? (
        <TrackRecord points={proofPoints} results={trackRecord} />
      ) : null}

      {industries.length ? (
        <section aria-labelledby="industries-heading" className="bg-sand py-16 md:py-24">
          <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
            <SectionHeading id="industries-heading" eyebrow="Industries" className="md:col-span-4">
              Sectors we serve
            </SectionHeading>
            <ul className="flex flex-wrap content-start gap-3 md:col-span-8">
              {industries.map((industry) => (
                <li key={industry._id}>
                  <IndustryChip title={industry.title} slug={industry.slug} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {founder ? (
        <FounderStrip
          name={founder.name}
          title={founder.title}
          shortBio={founder.shortBio}
          portrait={founder.portrait}
        />
      ) : null}

      {articles.length ? (
        <section aria-labelledby="insights-heading" className="border-line border-t py-16 md:py-28">
          <Container>
            <SectionHeadingRow id="insights-heading" eyebrow="Insights" heading="Latest insights">
              <Button href="/insights" variant="link">
                All insights
              </Button>
            </SectionHeadingRow>
            <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {articles.map((article) => (
                <li key={article._id}>
                  <ArticleCard {...article} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Contact"
        heading="Start a conversation"
        action={{ href: "/contact", label: "Request a consultation" }}
      />
    </>
  );
}

/** Section heading on the left, a "see all" link on the right (stacked on mobile). */
function SectionHeadingRow({
  id,
  eyebrow,
  heading,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHeading id={id} eyebrow={eyebrow}>
        {heading}
      </SectionHeading>
      <div className="md:pb-2">{children}</div>
    </div>
  );
}
