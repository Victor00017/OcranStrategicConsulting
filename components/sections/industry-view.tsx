import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  servicesForIndustry,
  type IndustryDetail,
  type IndustrySummary,
} from "@/lib/content/industries";
import { CtaBand } from "./cta-band";
import { IndustryChip } from "./industry-chip";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

const h2 = "font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium";

/**
 * /industries/[slug]: header with breadcrumbs, then an 8/4 split — content (body, challenges) and a
 * sticky aside (consultation CTA, services for this sector) — then other industries and the CTA band.
 * Same structure as ServiceView; every block hides itself when empty.
 */
export function IndustryView({
  industry,
  otherIndustries,
}: {
  industry: IndustryDetail;
  otherIndustries: IndustrySummary[];
}) {
  const { title, slug, summary, body, challenges } = industry;
  const services = servicesForIndustry(industry);
  // Until the client adds content, skip the empty main column so the CTA box isn't stranded right.
  const hasContent = !!body?.length || !!challenges?.length || services.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={title}
        intro={summary}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: title, path: `/industries/${slug}` },
            ]}
          />
        }
      />

      <Container className="grid gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        {hasContent ? (
          <div className="flex flex-col gap-16 md:col-span-8 md:pr-8">
            {body?.length ? <Prose value={body} /> : null}

            {challenges?.length ? (
              <section aria-labelledby="challenges-heading">
                <h2 id="challenges-heading" className={h2}>
                  Challenges we help with
                </h2>
                <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="border-gold text-ink border-l-2 pl-4 font-medium"
                    >
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {services.length ? (
              <section aria-labelledby="industry-services-heading">
                <h2 id="industry-services-heading" className={h2}>
                  Services for this sector
                </h2>
                <ul className="border-line mt-8 border-t">
                  {services.map((service) => (
                    <li key={service._id} className="border-line border-b">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-ink hover:text-gold-text flex min-h-11 items-center justify-between gap-6 py-4 font-medium transition-colors"
                      >
                        {service.title}
                        <span aria-hidden="true" className="text-gold">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}

        <aside className={hasContent ? "md:col-span-4" : "md:col-span-6 lg:col-span-5"}>
          <div className="bg-paper border-line rounded-[2px] border p-6 md:sticky md:top-28">
            <h2 className="text-ink text-lg font-medium">Discuss your project</h2>
            <Button href="/contact" className="mt-5 w-full">
              Request a consultation
            </Button>
            <Button href="/services" variant="link" className="mt-5">
              Explore all services
            </Button>
          </div>
        </aside>
      </Container>

      {otherIndustries.length ? (
        <section aria-labelledby="other-industries-heading" className="bg-sand">
          <Container className="py-16 md:py-20">
            <h2 id="other-industries-heading" className={h2}>
              Other sectors we serve
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {otherIndustries.map((other) => (
                <li key={other._id}>
                  <IndustryChip title={other.title} slug={other.slug} />
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
