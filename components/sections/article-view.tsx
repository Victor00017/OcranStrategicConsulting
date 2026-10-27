import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import type { ArticleDetail } from "@/lib/content/insights";
import { tableOfContents } from "@/lib/portable-text";
import { articleJsonLd } from "@/lib/seo";
import { ArticleCard } from "./article-card";
import { CtaBand } from "./cta-band";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

const h2 = "font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium";

/**
 * /insights/[slug] (build step 8): breadcrumbs, title and dates, then an 8/4 split — cover, body,
 * related services and author box; a sticky aside with the table of contents and a consultation CTA —
 * then related articles. Article JSON-LD credits the founder (docs/SEO.md §2, §4 E-E-A-T).
 */
export function ArticleView({ article }: { article: ArticleDetail }) {
  const { title, slug, excerpt, category, publishedAt, updatedAt, body, coverImage } = article;
  const toc = tableOfContents(body);

  return (
    <>
      <PageHeader
        eyebrow={category ?? "Insights"}
        title={title}
        intro={excerpt}
        breadcrumbs={
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: title, path: `/insights/${slug}` },
            ]}
          />
        }
      />
      <JsonLd data={articleJsonLd(article)} />

      <Container className="grid gap-14 py-12 md:grid-cols-12 md:gap-8 md:py-20">
        <article className="md:col-span-8 md:pr-8">
          <p className="text-ink-muted text-sm">
            {article.author ? <>By {article.author.name} · </> : null}
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            {updatedAt ? (
              <>
                {" "}
                · Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
              </>
            ) : null}
          </p>

          {coverImage?.url ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt}
              width={1360}
              height={765}
              preload
              sizes="(min-width: 768px) 760px, 100vw"
              className="mt-8 h-auto w-full rounded-[2px]"
            />
          ) : null}

          <div className="mt-10">
            <Prose value={body} />
          </div>

          {article.relatedServices?.length ? (
            <section
              aria-labelledby="article-services"
              className="border-line mt-14 border-t pt-10"
            >
              <h2 id="article-services" className={h2}>
                How we can help
              </h2>
              <ul className="mt-6 flex flex-col">
                {article.relatedServices.map((service) => (
                  <li key={service._id} className="border-line border-b">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-ink hover:text-gold-text flex min-h-11 items-center justify-between gap-6 py-4 font-medium"
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

          {article.author ? (
            <aside
              aria-label="About the author"
              className="bg-sand mt-14 flex gap-5 rounded-[2px] p-6"
            >
              {article.author.portrait?.url ? (
                <Image
                  src={article.author.portrait.url}
                  alt={article.author.portrait.alt}
                  width={72}
                  height={72}
                  className="size-18 shrink-0 rounded-full object-cover"
                />
              ) : null}
              <div>
                <p className="text-ink font-medium">{article.author.name}</p>
                {article.author.title ? (
                  <p className="text-ink-muted text-sm">{article.author.title}</p>
                ) : null}
                {article.author.shortBio ? (
                  <p className="text-ink mt-3 text-[0.95rem] leading-relaxed">
                    {article.author.shortBio}
                  </p>
                ) : null}
                <Button href="/about" variant="link" className="mt-3 text-sm">
                  About the author
                </Button>
              </div>
            </aside>
          ) : null}
        </article>

        <aside className="md:col-span-4">
          <div className="flex flex-col gap-8 md:sticky md:top-28">
            {toc.length >= 2 ? (
              <nav aria-label="On this page">
                <p className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase">
                  On this page
                </p>
                <ol className="border-line mt-4 flex flex-col border-l">
                  {toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="text-ink-muted hover:text-gold-text block py-1.5 pl-4 text-sm"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="bg-paper border-line rounded-[2px] border p-6">
              <p className="text-ink text-lg font-medium">Discuss your project</p>
              <Button href="/contact" className="mt-5 w-full">
                Request a consultation
              </Button>
            </div>
          </div>
        </aside>
      </Container>

      {article.related.length ? (
        <section aria-labelledby="related-heading" className="border-line border-t">
          <Container className="py-16 md:py-20">
            <h2 id="related-heading" className={h2}>
              Related insights
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
              {article.related.map((related) => (
                <li key={related._id}>
                  <ArticleCard {...related} />
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
