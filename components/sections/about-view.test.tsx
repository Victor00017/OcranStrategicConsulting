import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FOUNDER_PROFILE } from "@/sanity/seed/profile";
import { seedAbout } from "@/sanity/seed/content";
import { AboutView } from "./about-view";

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent ?? ""),
  );

describe("AboutView with seed content", () => {
  it("has one h1 and the firm's mission, vision and values", () => {
    render(<AboutView content={seedAbout()} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const firm = within(screen.getByRole("region", { name: "Mission, vision and values" }));
    expect(firm.getByText(/high-impact strategic advisory services/)).toBeInTheDocument();
    expect(firm.getByText("Professional Service")).toBeInTheDocument();
  });

  it("tells the founder's career story from the Detailed Profile", () => {
    render(<AboutView content={seedAbout()} />);
    const founder = within(screen.getByRole("region", { name: "Jonathan Nyarko Ocran" }));
    expect(
      founder.getByRole("heading", { name: "A career built across the value chain" }),
    ).toBeInTheDocument();
    expect(
      founder.getByText(/Ecological Organic Agriculture \(EOA\) Initiative/),
    ).toBeInTheDocument();
    expect(founder.getByText(/refereed journal papers/)).toBeInTheDocument();
  });

  it("lists credentials, every expertise area and every country", () => {
    render(<AboutView content={seedAbout()} />);
    expect(
      screen.getByText(/Sokoine University of Agriculture, Tanzania \(1994\)/),
    ).toBeInTheDocument();
    const countries = within(
      screen.getByRole("region", { name: "Missions across Africa, Asia and Europe" }),
    );
    expect(countries.getAllByRole("listitem")).toHaveLength(FOUNDER_PROFILE.countries.length);
    for (const area of FOUNDER_PROFILE.expertise)
      expect(screen.getByText(area)).toBeInTheDocument();
  });

  it("emits Person JSON-LD linked to the Organization", () => {
    const { container } = render(<AboutView content={seedAbout()} />);
    const person = jsonLd(container).find((d) => d["@type"] === "Person");
    expect(person).toMatchObject({
      "@id": "https://www.ocranstrategicconsulting.com/about#founder",
      jobTitle: "Senior Consultant",
      worksFor: { "@id": "https://www.ocranstrategicconsulting.com/#organization" },
      image: "https://www.ocranstrategicconsulting.com/images/founder/founder-portrait.jpg",
    });
    expect(person.alumniOf).toHaveLength(3);
    expect(person.hasCredential).toHaveLength(5);
  });
});

describe("AboutView with an empty CMS", () => {
  it("renders the header and CTA without crashing", () => {
    render(<AboutView content={{ about: null, founder: null }} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Mission, vision and values" })).toBeNull();
  });
});
