import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { getCaseStudies } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";

// Same rule as /publications and /insights (D-026, D-027): out of search until there is content.
export async function generateMetadata(): Promise<Metadata> {
  const studies = await getCaseStudies();
  return buildMetadata({
    title: "Case studies",
    description:
      "Selected projects by Ocran Strategic Consulting in agriculture, livestock, agribusiness and strategy — the challenge, our approach and the results.",
    path: "/case-studies",
    noindex: studies.length === 0,
  });
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Case studies"
        intro="Selected projects — the challenge, our approach and the results."
      />
      <section aria-label="All case studies">
        <Container className="py-16 md:py-24">
          {studies.length ? (
            <ul className="border-line border-t">
              {studies.map((study) => (
                <li key={study._id} className="border-line border-b">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group grid gap-2 py-8 md:grid-cols-12 md:gap-8"
                  >
                    <span className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase md:col-span-3">
                      {[study.sector, study.year].filter(Boolean).join(" · ")}
                    </span>
                    <span className="md:col-span-9">
                      <span className="text-ink group-hover:text-gold-text block text-[1.5rem] font-medium transition-colors">
                        {study.title}
                      </span>
                      <span className="text-ink-muted mt-1 block">{study.client}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted max-w-[60ch] text-lg">
              Case studies will appear here as clients give their permission to share the work.
            </p>
          )}
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
