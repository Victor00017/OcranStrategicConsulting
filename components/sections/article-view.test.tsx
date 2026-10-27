import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ArticleDetail } from "@/lib/content/insights";
import { headingId, tableOfContents } from "@/lib/portable-text";
import { ArticleView } from "./article-view";

const block = (key: string, style: "normal" | "h2", text: string) => ({
  _type: "block" as const,
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: "span" as const, _key: `${key}s`, text, marks: [] }],
});

const article: ArticleDetail = {
  _id: "a1",
  title: "Planning a poultry feasibility study",
  slug: "poultry-feasibility",
  excerpt: "What to check before you invest.",
  category: "Livestock",
  tags: null,
  publishedAt: "2026-10-01T09:00:00Z",
  updatedAt: "2026-10-20T09:00:00Z",
  body: [
    block("b1", "normal", "Intro paragraph."),
    block("b2", "h2", "Market demand"),
    block("b3", "normal", "Demand text."),
    block("b4", "h2", "Costs & returns"),
  ],
  coverImage: null,
  relatedServices: [
    { _id: "s1", title: "Agribusiness Advisory Services", slug: "agribusiness-advisory" },
  ],
  related: [
    {
      _id: "a2",
      title: "Feed planning",
      slug: "feed-planning",
      excerpt: "Plan feed early.",
      category: "Livestock",
      publishedAt: "2026-09-01T09:00:00Z",
    },
  ],
  author: {
    name: "Jonathan Nyarko Ocran",
    title: "Senior Consultant",
    shortBio: "Bio.",
    portrait: null,
  },
  seo: null,
};

describe("table of contents helpers", () => {
  it("makes URL-safe ids and lists only H2s", () => {
    expect(headingId("Costs & returns")).toBe("costs-returns");
    expect(headingId("Côte d'Ivoire")).toBe("cote-d-ivoire");
    expect(tableOfContents(article.body).map((e) => e.text)).toEqual([
      "Market demand",
      "Costs & returns",
    ]);
  });
});

describe("ArticleView", () => {
  it("has one h1, breadcrumbs, dates and an author line", () => {
    render(<ArticleView article={article} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText(/By Jonathan Nyarko Ocran/)).toBeInTheDocument();
    expect(screen.getByText("1 October 2026")).toHaveAttribute("dateTime", article.publishedAt);
  });

  it("links the table of contents to the matching headings", () => {
    const { container } = render(<ArticleView article={article} />);
    const toc = within(screen.getByRole("navigation", { name: "On this page" }));
    expect(toc.getByRole("link", { name: "Costs & returns" })).toHaveAttribute(
      "href",
      "#costs-returns",
    );
    expect(container.querySelector("h2#costs-returns")).toHaveTextContent("Costs & returns");
  });

  it("links to a related service, the author's profile and a related article", () => {
    render(<ArticleView article={article} />);
    expect(screen.getByRole("link", { name: /Agribusiness Advisory Services/ })).toHaveAttribute(
      "href",
      "/services/agribusiness-advisory",
    );
    expect(screen.getByRole("link", { name: "About the author" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Feed planning" })).toHaveAttribute(
      "href",
      "/insights/feed-planning",
    );
  });

  it("emits Article JSON-LD crediting the founder", () => {
    const { container } = render(<ArticleView article={article} />);
    const ld = [...container.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent ?? ""))
      .find((d) => d["@type"] === "Article");
    expect(ld).toMatchObject({
      headline: article.title,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { "@id": "https://www.ocranstrategicconsulting.com/about#founder" },
    });
  });
});
