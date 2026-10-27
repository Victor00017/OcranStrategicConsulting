import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { getIndustries } from "@/lib/content/industries";
import { buildMetadata } from "@/lib/seo";

// Description built only from brief facts (the 7 sectors + location); client to approve (PROGRESS).
export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Sectors we serve from Tema, Ghana: agriculture, livestock, agribusiness, development organisations, SMEs, light manufacturing and the public sector.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await getIndustries();
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Sectors we serve"
        intro="{{TODO: copy needed — industries page introduction (1–2 sentences)}}"
      />
      <section aria-label="All industries">
        <Container className="py-16 md:py-24">
          <ol className="border-line grid border-t md:grid-cols-2 md:gap-x-12">
            {industries.map((industry, index) => (
              <li key={industry._id} className="border-line border-b">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex min-h-11 items-baseline gap-6 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-gold w-10 shrink-0 text-2xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink group-hover:text-gold-text text-[clamp(1.375rem,2vw,1.625rem)] font-medium transition-colors">
                    {industry.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
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
