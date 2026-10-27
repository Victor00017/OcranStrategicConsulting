import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ServiceDetail } from "@/lib/content/services";
import { seedService, seedServices } from "@/sanity/seed/content";
import { ServiceView } from "./service-view";

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent ?? ""),
  );

const seeded = seedService("agribusiness-advisory") as ServiceDetail;
const others = seedServices().filter((s) => s.slug !== seeded.slug);

describe("ServiceView with seed content", () => {
  it("has one h1, a breadcrumb trail ending on the current page, and the sub-services", () => {
    render(<ServiceView service={seeded} otherServices={others} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const trail = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(trail.getByText("Agribusiness Advisory Services")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByText("Feasibility Studies")).toBeInTheDocument();
  });

  it("links to the other five services and prefills the contact form", () => {
    render(<ServiceView service={seeded} otherServices={others} />);
    const other = within(screen.getByRole("region", { name: "Other services" }));
    expect(other.getAllByRole("link")).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: "Request a consultation" })[0]).toHaveAttribute(
      "href",
      "/contact?service=agribusiness-advisory",
    );
  });

  it("lists what the client receives", () => {
    render(<ServiceView service={seeded} otherServices={others} />);
    const received = within(screen.getByRole("region", { name: "What you receive" }));
    expect(received.getAllByRole("listitem").length).toBeGreaterThan(2);
  });

  it("emits Service, BreadcrumbList and FAQPage JSON-LD", () => {
    const { container } = render(<ServiceView service={seeded} otherServices={others} />);
    const data = jsonLd(container);
    const service = data.find((d) => d["@type"] === "Service");
    expect(service).toMatchObject({ name: "Agribusiness Advisory Services" });
    expect(service.description).toBe(seeded.summary);
    expect(data.find((d) => d["@type"] === "BreadcrumbList").itemListElement).toHaveLength(3);
    expect(data.some((d) => d["@type"] === "FAQPage")).toBe(true);
  });

  it("keeps {{TODO}} text out of JSON-LD", () => {
    const todo = { ...seeded, summary: "{{TODO: copy needed — summary}}" };
    const { container } = render(<ServiceView service={todo} otherServices={[]} />);
    const service = jsonLd(container).find((d) => d["@type"] === "Service");
    expect(service).not.toHaveProperty("description");
  });
});

describe("ServiceView with full CMS content", () => {
  it("renders FAQs as a details accordion with matching FAQPage JSON-LD", () => {
    const service: ServiceDetail = {
      ...seeded,
      summary: "Feasibility and investment advice for agribusinesses.",
      outcomes: ["Bankable feasibility study"],
      faqs: [
        { _key: "a", question: "How long does a feasibility study take?", answer: "It depends." },
      ],
      relatedIndustries: [{ _id: "i1", title: "Livestock", slug: "livestock" }],
    };
    const { container } = render(<ServiceView service={service} otherServices={[]} />);
    expect(container.querySelector("details summary")).toHaveTextContent(
      "How long does a feasibility study take?",
    );
    expect(screen.getByRole("link", { name: "Livestock" })).toHaveAttribute(
      "href",
      "/industries/livestock",
    );
    const data = jsonLd(container);
    expect(data.find((d) => d["@type"] === "FAQPage").mainEntity).toHaveLength(1);
    expect(data.find((d) => d["@type"] === "Service").description).toBe(service.summary);
    expect(screen.queryByRole("region", { name: "Other services" })).toBeNull();
  });
});

describe("seedService", () => {
  it("returns null for an unknown slug", () => {
    expect(seedService("does-not-exist")).toBeNull();
  });
});
