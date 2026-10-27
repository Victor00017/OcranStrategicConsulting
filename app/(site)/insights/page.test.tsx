import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ArticleSummary } from "@/lib/content/insights";

let articles: ArticleSummary[] = [];
vi.mock("@/lib/content/insights", () => ({ getArticles: async () => articles }));

const { default: InsightsPage, generateMetadata } = await import("./page");

describe("/insights", () => {
  beforeEach(() => {
    articles = [];
  });

  it("stays out of search results and shows a note while there are no articles", async () => {
    expect((await generateMetadata()).robots).toEqual({ index: false, follow: true });
    render(await InsightsPage());
    expect(screen.getByText(/being prepared/)).toBeInTheDocument();
  });

  it("lists articles once they exist and becomes indexable", async () => {
    articles = [
      {
        _id: "a1",
        _updatedAt: "2026-10-20T09:00:00Z",
        title: "Planning a poultry feasibility study",
        slug: "poultry-feasibility",
        excerpt: "What to check before you invest.",
        category: "Livestock",
        publishedAt: "2026-10-01T09:00:00Z",
        coverImage: null,
      },
    ];
    expect((await generateMetadata()).robots).toBeUndefined();
    render(await InsightsPage());
    expect(
      screen.getByRole("link", { name: "Planning a poultry feasibility study" }),
    ).toHaveAttribute("href", "/insights/poultry-feasibility");
  });
});
