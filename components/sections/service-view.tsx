import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { ServiceDetail, ServiceSummary } from "@/lib/content/services";
import { serviceJsonLd } from "@/lib/seo";
import { CtaBand } from "./cta-band";
import { FaqList } from "./faq-list";
import { IndustryChip } from "./industry-chip";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

const h2 = "font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium";

/**
 * /services/[slug]: header with breadcrumbs, then an 8/4 split — content (included, body, outcomes,
 * FAQs) and a sticky aside (consultation CTA, related industries) — then other services and the CTA band.
 * Every content block hides itself when empty.
 */
export function ServiceView({
  service,
  otherServices,
}: {
  service: ServiceDetail;
  otherServices: ServiceSummary[];
}) {
  const {
    title,
    slug,
    summary,
    subServices,
    deliverables,
    body,
    outcomes,
    faqs,
    relatedIndustries,
  } = service;

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={title}
        intro={summary}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: title, path: `/services/${slug}` },
            ]}
          />
        }
      />
      <JsonLd data={serviceJsonLd({ title, slug, summary })} />

      <Container className="grid gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="flex flex-col gap-16 md:col-span-8 md:pr-8">
          {subServices?.length ? (
            <section aria-labelledby="included-heading">
              <h2 id="included-heading" className={h2}>
                What&rsquo;s included
              </h2>
              <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {subServices.map((item) => (
                  <li key={item} className="border-gold text-ink border-l-2 pl-4 font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {deliverables?.length ? (
            <section aria-labelledby="deliverables-heading">
              <h2 id="deliverables-heading" className={h2}>
                What you receive
              </h2>
              <ol className="border-line mt-8 border-t">
                {deliverables.map((item, index) => (
                  <li key={item} className="border-line text-ink flex gap-5 border-b py-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-gold w-8 shrink-0 text-xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {body?.length ? <Prose value={body} /> : null}

          {outcomes?.length ? (
            <section aria-labelledby="outcomes-heading">
              <h2 id="outcomes-heading" className={h2}>
                Outcomes for clients
              </h2>
              <ul className="text-ink mt-8 flex max-w-[68ch] flex-col gap-3">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span aria-hidden="true" className="bg-gold mt-3 h-px w-4 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {faqs?.length ? <FaqList id="faq-heading" faqs={faqs} /> : null}
        </div>

        <aside className="md:col-span-4">
          <div className="flex flex-col gap-10 md:sticky md:top-28">
            <div className="bg-paper border-line rounded-[2px] border p-6">
              <h2 className="text-ink text-lg font-medium">Discuss this service</h2>
              <Button href={`/contact?service=${slug}`} className="mt-5 w-full">
                Request a consultation
              </Button>
            </div>
            {relatedIndustries?.length ? (
              <div>
                <h2 className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase">
                  Industries
                </h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {relatedIndustries.map((industry) => (
                    <li key={industry._id}>
                      <IndustryChip title={industry.title} slug={industry.slug} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </Container>

      {otherServices.length ? (
        <section aria-labelledby="other-services-heading" className="border-line border-t">
          <Container className="py-16 md:py-20">
            <h2 id="other-services-heading" className={h2}>
              Other services
            </h2>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((other) => (
                <li key={other._id} className="border-line border-b">
                  <Link
                    href={`/services/${other.slug}`}
                    className="text-ink hover:text-gold-text flex min-h-11 items-center py-4 font-medium transition-colors"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Contact"
        heading="Start a conversation"
        action={{ href: `/contact?service=${slug}`, label: "Request a consultation" }}
      />
    </>
  );
}
