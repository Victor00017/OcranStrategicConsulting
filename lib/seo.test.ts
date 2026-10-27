import { describe, expect, it } from "vitest";
import { ORGANIZATION_ID, SITE_URL, absoluteUrl, buildMetadata, organizationJsonLd } from "./seo";

describe("buildMetadata", () => {
  it("sets title, canonical, OpenGraph and Twitter", () => {
    const meta = buildMetadata({
      title: "Agribusiness Advisory",
      description: "Feasibility studies and investment advice.",
      path: "/services/agribusiness-advisory",
    });
    expect(meta.title).toBe("Agribusiness Advisory");
    expect(meta.alternates?.canonical).toBe("/services/agribusiness-advisory");
    expect(meta.openGraph).toMatchObject({
      title: "Agribusiness Advisory | Ocran Strategic Consulting",
      url: "/services/agribusiness-advisory",
      locale: "en_GH",
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
    expect(meta.robots).toBeUndefined();
  });

  it("falls back to the site share image", () => {
    const meta = buildMetadata({ description: "x", path: "/x" });
    expect(meta.openGraph?.images).toEqual([expect.objectContaining({ url: "/opengraph-image" })]);
    expect(meta.twitter?.images).toEqual([expect.objectContaining({ url: "/opengraph-image" })]);
  });

  it("leaves the title to the layout default when omitted", () => {
    const meta = buildMetadata({ description: "Home", path: "/" });
    expect(meta.title).toBeUndefined();
    expect(meta.openGraph?.title).toBe("Ocran Strategic Consulting");
  });

  it("marks noindex pages", () => {
    const meta = buildMetadata({ title: "Draft", description: "x", path: "/x", noindex: true });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});

describe("absoluteUrl", () => {
  it("joins paths to the canonical www host", () => {
    expect(SITE_URL).toBe("https://www.ocranstrategicconsulting.com");
    expect(absoluteUrl("/")).toBe("https://www.ocranstrategicconsulting.com");
    expect(absoluteUrl("/about")).toBe("https://www.ocranstrategicconsulting.com/about");
  });
});

describe("organizationJsonLd", () => {
  it("is valid without Sanity settings and contains no contact details", () => {
    const [org, site] = organizationJsonLd(null)["@graph"];
    expect(org).toMatchObject({ "@id": ORGANIZATION_ID, name: "Ocran Strategic Consulting" });
    expect(org).not.toHaveProperty("telephone");
    expect(org).not.toHaveProperty("email");
    expect(site).toMatchObject({ "@type": "WebSite", publisher: { "@id": ORGANIZATION_ID } });
  });

  it("adds contact details and profiles from site settings", () => {
    const [org] = organizationJsonLd({
      name: "Ocran Strategic Consulting",
      tagline: null,
      valueProp: null,
      contactEmails: ["jane@example.com"],
      phone: "+233000000000",
      whatsapp: null,
      address: null,
      geo: { lat: 5.67, lng: -0.01 },
      socialLinks: [{ platform: "LinkedIn", url: "https://www.linkedin.com/company/example" }],
      defaultOgImage: null,
    })["@graph"];
    expect(org).toMatchObject({
      email: "jane@example.com",
      telephone: "+233000000000",
      geo: { latitude: 5.67, longitude: -0.01 },
      sameAs: ["https://www.linkedin.com/company/example"],
    });
  });
});
