import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CaseStudyDetail } from "@/lib/content/case-studies";
import { seedLegalPage } from "@/sanity/seed/content";
import { CaseStudyView } from "./case-study-view";
import { LegalView } from "./legal-view";

describe("LegalView", () => {
  it("renders the privacy notice with its date and the processors the site really uses", () => {
    const page = seedLegalPage("privacy");
    if (!page) throw new Error("privacy seed missing");
    render(<LegalView page={page} />);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy notice" })).toBeInTheDocument();
    expect(screen.getByText("Last updated 27 October 2026")).toBeInTheDocument();
    for (const provider of ["Vercel", "Resend", "Sanity"]) {
      expect(screen.getByText(new RegExp(`^${provider} `))).toBeInTheDocument();
    }
    expect(screen.getByText(/Data Protection Act, 2012 \(Act 843\)/)).toBeInTheDocument();
  });

  it("renders the terms with Ghanaian governing law", () => {
    const page = seedLegalPage("terms");
    if (!page) throw new Error("terms seed missing");
    render(<LegalView page={page} />);
    expect(screen.getByText(/laws of the Republic of Ghana/)).toBeInTheDocument();
  });

  it("has no page for an unknown slug", () => {
    expect(seedLegalPage("cookies")).toBeNull();
  });
});

describe("CaseStudyView", () => {
  const study: CaseStudyDetail = {
    _id: "c1",
    _updatedAt: "2026-10-27T00:00:00Z",
    title: "Feasibility for a poultry unit",
    slug: "poultry-unit",
    client: "Confidential client",
    sector: "Livestock",
    year: 2026,
    challenge: "A client needed to know whether a new unit would pay back.",
    approach: "Market and cost analysis.",
    results: ["Clear go/no-go decision"],
    seo: null,
  };

  it("shows facts, challenge, approach and results with breadcrumbs and Article JSON-LD", () => {
    const { container } = render(<CaseStudyView study={study} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("Confidential client")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Results" })).toBeInTheDocument();
    const ld = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent ?? ""),
    );
    expect(ld.find((d) => d["@type"] === "Article")).toMatchObject({ headline: study.title });
    expect(ld.some((d) => d["@type"] === "BreadcrumbList")).toBe(true);
  });

  it("omits facts and sections that are empty", () => {
    render(<CaseStudyView study={{ ...study, year: null, approach: null, results: null }} />);
    expect(screen.queryByText("Year")).toBeNull();
    expect(screen.queryByRole("heading", { name: "Our approach" })).toBeNull();
  });
});
