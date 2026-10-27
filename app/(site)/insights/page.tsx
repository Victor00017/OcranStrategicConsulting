import type { Metadata } from "next";
import { ArticleCard } from "@/components/sections/article-card";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { getArticles } from "@/lib/content/insights";
import { buildMetadata } from "@/lib/seo";

// Same rule as /publications (D-026): out of search results until there is something to read.
export async function generateMetadata(): Promise<Metadata> {
  const articles = await getArticles();
  return buildMetadata({
    title: "Insights",
    description:
      "Articles and analysis on agriculture, livestock, agribusiness, strategy and policy across Sub-Saharan Africa from Ocran Strategic Consulting, Tema, Ghana.",
    path: "/insights",
    noindex: articles.length === 0,
  });
}

export default async function InsightsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Insights"
        intro="Articles and analysis on agriculture, livestock, agribusiness, strategy and policy across Sub-Saharan Africa."
      />
      <section aria-label="All articles">
        <Container className="py-16 md:py-24">
          {articles.length ? (
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article._id}>
                  <ArticleCard {...article} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted max-w-[60ch] text-lg">
              Our first articles are being prepared and will appear here shortly.
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
