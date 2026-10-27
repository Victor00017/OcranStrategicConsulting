import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INDUSTRIES, SERVICES } from "@/lib/nav";
import { HOME_COPY } from "@/sanity/seed/copy";
import { SEED, seedHomeContent } from "@/sanity/seed/content";
import { HomeView } from "./home-view";

const renderSeed = () => render(<HomeView content={seedHomeContent()} />);

describe("HomeView with seed content", () => {
  it("renders exactly one h1 — the tagline — with the deliverables panel beside it", () => {
    renderSeed();
    const [h1, ...rest] = screen.getAllByRole("heading", { level: 1 });
    expect(rest).toHaveLength(0);
    expect(h1).toHaveTextContent("From insights to strategy.");
    const panel = within(screen.getByRole("complementary", { name: "What we deliver" }));
    expect(panel.getAllByRole("listitem")).toHaveLength(HOME_COPY.deliverables.length);
  });

  it("gives each audience its own call to action, prefilled with a service", () => {
    renderSeed();
    const audiences = within(screen.getByRole("region", { name: /client in front of us/ }));
    expect(audiences.getAllByRole("listitem")).toHaveLength(4);
    expect(audiences.getByRole("link", { name: "Discuss a partnership" })).toHaveAttribute(
      "href",
      "/contact?service=project-development",
    );
  });

  it("shows proof points and attributes every track-record result", () => {
    renderSeed();
    const record = within(screen.getByRole("region", { name: "Experience behind the advice" }));
    for (const point of SEED.siteSettings.proofPoints) {
      expect(record.getByText(point.value)).toBeInTheDocument();
    }
    for (const item of HOME_COPY.trackRecord) {
      expect(record.getByText(item.context)).toBeInTheDocument();
    }
  });

  it("links every service (with its summary) and all 7 industries", () => {
    renderSeed();
    const services = within(screen.getByRole("region", { name: "What we do" }));
    expect(services.getAllByRole("article")).toHaveLength(6);
    expect(services.getByText(/Investment-grade feasibility studies/)).toBeInTheDocument();
    const industries = within(screen.getByRole("region", { name: "Sectors we serve" }));
    expect(industries.getAllByRole("link")).toHaveLength(7);
  });

  it("introduces the founder compactly, linking to About", () => {
    renderSeed();
    const founder = within(screen.getByRole("region", { name: "Jonathan Nyarko Ocran" }));
    expect(founder.getByRole("link", { name: "About the founder" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.queryByText(/Girne American University/)).toBeNull();
  });

  it("contains no {{TODO}} markers and hides insights while there are no articles", () => {
    const { container } = renderSeed();
    expect(container.textContent).not.toContain("{{TODO");
    expect(screen.queryByRole("region", { name: "Latest insights" })).toBeNull();
  });
});

describe("HomeView with an empty CMS", () => {
  it("still renders the hero and contact band without crashing", () => {
    render(
      <HomeView
        content={{
          settings: null,
          home: null,
          founder: null,
          services: [],
          industries: [],
          articles: [],
        }}
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "From insights to strategy.",
    );
    expect(screen.getByRole("region", { name: "Start a conversation" })).toBeInTheDocument();
    expect(screen.queryByRole("complementary", { name: "What we deliver" })).toBeNull();
  });
});

describe("seed and navigation stay in sync", () => {
  it("uses the same service and industry slugs as the header/footer", () => {
    expect(SERVICES.map((l) => l.href)).toEqual(SEED.services.map((s) => `/services/${s.slug}`));
    expect(INDUSTRIES.map((l) => l.href)).toEqual(
      SEED.industries.map((i) => `/industries/${i.slug}`),
    );
  });

  it("points every audience CTA at a seeded service", () => {
    const slugs = SEED.services.map((s) => s.slug);
    for (const audience of HOME_COPY.audiences) expect(slugs).toContain(audience.serviceSlug);
  });
});
