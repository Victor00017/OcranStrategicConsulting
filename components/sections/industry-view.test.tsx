import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { servicesForIndustry, type IndustryDetail } from "@/lib/content/industries";
import { seedIndustries, seedIndustry } from "@/sanity/seed/content";
import { IndustryView } from "./industry-view";

const seeded = seedIndustry("smes") as IndustryDetail;
const others = seedIndustries().filter((i) => i.slug !== seeded.slug);

describe("IndustryView with seed content", () => {
  it("has one h1, breadcrumbs with BreadcrumbList JSON-LD, and links to the other six sectors", () => {
    const { container } = render(<IndustryView industry={seeded} otherIndustries={others} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByText("SMEs"),
    ).toHaveAttribute("aria-current", "page");
    const ld = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent ?? ""),
    );
    expect(ld.some((d) => d["@type"] === "BreadcrumbList")).toBe(true);
    const other = within(screen.getByRole("region", { name: "Other sectors we serve" }));
    expect(other.getAllByRole("link")).toHaveLength(6);
  });

  it("hides empty sections (no body, challenges or services in the seed)", () => {
    render(<IndustryView industry={seeded} otherIndustries={others} />);
    expect(screen.queryByRole("region", { name: "Challenges we help with" })).toBeNull();
    expect(screen.queryByRole("region", { name: "Services for this sector" })).toBeNull();
  });
});

describe("services for an industry", () => {
  const svc = (id: string) => ({ _id: id, title: `Service ${id}`, slug: `s-${id}` });

  it("merges both link directions without duplicates, own list first", () => {
    const industry = {
      ...seeded,
      relatedServices: [svc("b"), svc("a")],
      servedBy: [svc("a"), svc("c")],
    };
    expect(servicesForIndustry(industry).map((s) => s._id)).toEqual(["b", "a", "c"]);
  });

  it("renders them as links to the service pages", () => {
    const industry = { ...seeded, relatedServices: null, servedBy: [svc("x")] };
    render(<IndustryView industry={industry} otherIndustries={[]} />);
    const list = within(screen.getByRole("region", { name: "Services for this sector" }));
    expect(list.getByRole("link", { name: /Service x/ })).toHaveAttribute("href", "/services/s-x");
  });
});

describe("layout without CMS content", () => {
  it("omits the empty main column", () => {
    const { container } = render(<IndustryView industry={seeded} otherIndustries={[]} />);
    expect(container.querySelector(".md\\:col-span-8")).toBeNull();
  });
});
