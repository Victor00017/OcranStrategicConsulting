import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CaseStudyDetail } from "@/lib/content/case-studies";
import { caseStudyJsonLd } from "@/lib/seo";
import { CtaBand } from "./cta-band";
import { PageHeader } from "./page-header";

const h2 = "font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium";

/**
 * /case-studies/[slug]: client, sector and year; then challenge → approach → results.
 * Only studies with written permission reach this view (query filter, D-008).
 */
export function CaseStudyView({ study }: { study: CaseStudyDetail }) {
  const { title, slug, client, sector, year, challenge, approach, results } = study;
  const facts = [
    ["Client", client],
    ["Sector", sector],
    ["Year", year ? String(year) : null],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <PageHeader
        eyebrow="Case study"
        title={title}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Case studies", path: "/case-studies" },
              { name: title, path: `/case-studies/${slug}` },
            ]}
          />
        }
      />
      <JsonLd data={caseStudyJsonLd(study)} />

      <Container className="grid gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <dl className="flex flex-col gap-6 md:col-span-3">
          {facts.map(([label, value]) => (
            <div key={label} className="border-gold border-t pt-4">
              <dt>
                <Eyebrow as="span">{label}</Eyebrow>
              </dt>
              <dd className="text-ink mt-2">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-14 md:col-span-9 md:pl-8">
          {challenge ? <Block heading="The challenge" text={challenge} /> : null}
          {approach ? <Block heading="Our approach" text={approach} /> : null}
          {results?.length ? (
            <section aria-labelledby="results-heading">
              <h2 id="results-heading" className={h2}>
                Results
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {results.map((result) => (
                  <li key={result} className="border-gold text-ink border-l-2 pl-4">
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>

      <CtaBand
        eyebrow="Contact"
        heading="Start a conversation"
        action={{ href: "/contact", label: "Request a consultation" }}
      />
    </>
  );
}

function Block({ heading, text }: { heading: string; text: string }) {
  return (
    <section>
      <h2 className={h2}>{heading}</h2>
      <p className="text-ink mt-6 max-w-[68ch] leading-relaxed whitespace-pre-line">{text}</p>
    </section>
  );
}
