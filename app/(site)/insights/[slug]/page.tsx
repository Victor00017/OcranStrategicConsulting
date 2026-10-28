import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/sections/article-view";
import { getArticle, getArticles } from "@/lib/content/insights";
import { buildMetadata } from "@/lib/seo";

// Pre-render every published article; articles published later render on first request.
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const ogImage = article.seo?.ogImage ?? article.coverImage?.url;
  return buildMetadata({
    ...(article.seo?.metaTitle ? { fullTitle: article.seo.metaTitle } : { title: article.title }),
    description: article.seo?.metaDescription || article.excerpt,
    path: `/insights/${slug}`,
    image: ogImage ? { url: ogImage, alt: article.coverImage?.alt ?? article.title } : undefined,
    noindex: article.seo?.noindex ?? false,
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
