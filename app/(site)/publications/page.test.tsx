import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Publication } from "@/lib/content/about";

let publications: Publication[] = [];
vi.mock("@/lib/content/about", () => ({ getPublications: async () => publications }));
vi.mock("next/navigation", () => ({ usePathname: () => "/publications" }));

const { default: PublicationsPage, generateMetadata } = await import("./page");

describe("/publications", () => {
  beforeEach(() => {
    publications = [];
  });

  it("stays out of search results and shows a note while the list is empty", async () => {
    expect((await generateMetadata()).robots).toEqual({ index: false, follow: true });
    render(await PublicationsPage());
    expect(screen.getByText(/being prepared/)).toBeInTheDocument();
  });

  it("lists entries with type, year and a DOI link, plus ItemList JSON-LD", async () => {
    publications = [
      {
        _id: "p1",
        title: "Livestock feeding in the dry season",
        type: "journal",
        year: 2019,
        publisher: "Example Journal",
        url: null,
        doi: "10.1000/example",
      },
    ];
    expect((await generateMetadata()).robots).toBeUndefined();
    const { container } = render(await PublicationsPage());
    expect(screen.getByText("Journal article")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Livestock feeding in the dry season" }),
    ).toHaveAttribute("href", "https://doi.org/10.1000/example");
    const ld = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')?.textContent ?? "",
    );
    expect(ld.itemListElement[0].item["@type"]).toBe("ScholarlyArticle");
  });
});
