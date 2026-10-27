import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INDUSTRIES, SERVICES } from "@/lib/nav";
import { SEED, seedHomeContent } from "@/sanity/seed/content";
import { HomeView } from "./home-view";

describe("HomeView with seed content", () => {
  it("renders exactly one h1 — the tagline", () => {
    render(<HomeView content={seedHomeContent()} />);
    const [h1, ...rest] = screen.getAllByRole("heading", { level: 1 });
    expect(rest).toHaveLength(0);
    expect(h1).toHaveTextContent("From insights to strategy.");
  });

  it("shows every proof point exactly as given", () => {
    render(<HomeView content={seedHomeContent()} />);
    const figures = within(screen.getByRole("region", { name: "Key figures" }));
    for (const point of SEED.siteSettings.proofPoints) {
      expect(figures.getByText(point.value)).toBeInTheDocument();
      expect(figures.getByText(point.label)).toBeInTheDocument();
    }
  });

  it("links every service and all 7 industries", () => {
    render(<HomeView content={seedHomeContent()} />);
    const services = within(screen.getByRole("region", { name: "What we do" }));
    expect(services.getAllByRole("article")).toHaveLength(6);
    const industries = within(screen.getByRole("region", { name: "Sectors we serve" }));
    expect(industries.getAllByRole("link")).toHaveLength(7);
  });

  it("hides the insights section while there are no articles", () => {
    render(<HomeView content={seedHomeContent()} />);
    expect(screen.queryByRole("region", { name: "Latest insights" })).toBeNull();
  });
});

describe("HomeView with an empty CMS", () => {
  it("still renders the hero and contact band without crashing", () => {
    render(
      <HomeView
        content={{ settings: null, founder: null, services: [], industries: [], articles: [] }}
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "From insights to strategy.",
    );
    expect(screen.getByRole("region", { name: "Start a conversation" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });
});

describe("seed and navigation stay in sync", () => {
  it("uses the same service and industry slugs as the header/footer", () => {
    expect(SERVICES.map((l) => l.href)).toEqual(SEED.services.map((s) => `/services/${s.slug}`));
    expect(INDUSTRIES.map((l) => l.href)).toEqual(
      SEED.industries.map((i) => `/industries/${i.slug}`),
    );
  });
});
