import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { getPublications, type Publication } from "@/lib/content/about";
import { absoluteUrl, buildMetadata, FOUNDER_ID } from "@/lib/seo";

const TYPE_LABELS: Record<string, string> = {
  book: "Book",
  journal: "Journal article",
  brief: "Policy brief",
  report: "Report",
  chapter: "Book chapter",
  thesis: "Thesis",
  other: "Other",
};

// While the list is empty the page stays out of search results (and out of the sitemap).
export async function generateMetadata(): Promise<Metadata> {
  const publications = await getPublications();
  return buildMetadata({
    title: "Publications",
    description:
      "Books, refereed journal papers, policy briefs, reports and book chapters by Jonathan Nyarko Ocran on agriculture, livestock, agribusiness and policy.",
    path: "/publications",
    noindex: publications.length === 0,
  });
}

export default async function PublicationsPage() {
  const publications = await getPublications();
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Publications"
        intro="Books, refereed journal papers, policy briefs, reports and book chapters by our founder, Jonathan Nyarko Ocran."
      />
      <section aria-label="All publications">
        <Container className="py-16 md:py-24">
          {publications.length ? (
            <>
              <ol className="border-line border-t">
                {publications.map((publication) => (
                  <PublicationRow key={publication._id} publication={publication} />
                ))}
              </ol>
              <JsonLd data={itemListJsonLd(publications)} />
            </>
          ) : (
            <p className="text-ink-muted max-w-[60ch] text-lg">
              The full list of publications is being prepared and will appear here shortly.
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

function PublicationRow({ publication }: { publication: Publication }) {
  const { title, type, year, publisher, url, doi } = publication;
  const href = url ?? (doi ? `https://doi.org/${doi}` : null);
  return (
    <li className="border-line grid gap-2 border-b py-6 md:grid-cols-12 md:gap-8">
      <p className="font-display text-gold text-2xl leading-none md:col-span-1">{year}</p>
      <div className="md:col-span-11">
        <p className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase">
          {TYPE_LABELS[type] ?? type}
        </p>
        <h2 className="text-ink mt-2 text-lg font-medium">
          {href ? (
            <a
              href={href}
              className="hover:text-gold-text underline-offset-4 hover:underline"
              rel="noopener"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {publisher ? <p className="text-ink-muted mt-1">{publisher}</p> : null}
      </div>
    </li>
  );
}

/** docs/SEO.md §2: ItemList of CreativeWork, each authored by the founder. */
function itemListJsonLd(publications: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: absoluteUrl("/publications"),
    itemListElement: publications.map((publication, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": publication.type === "journal" ? "ScholarlyArticle" : "CreativeWork",
        name: publication.title,
        datePublished: String(publication.year),
        author: { "@id": FOUNDER_ID },
        ...(publication.publisher ? { publisher: publication.publisher } : {}),
        ...(publication.url ? { url: publication.url } : {}),
      },
    })),
  };
}
