import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/sanity/site-settings", () => ({ getSiteSettings: async () => null }));

const { default: robots } = await import("./robots");
const { default: sitemap } = await import("./sitemap");
const { GET: llms } = await import("./llms.txt/route");

describe("robots.txt", () => {
  it("keeps the Studio and API out and points to the sitemap", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ disallow: ["/studio", "/api/"] });
    expect(result.sitemap).toBe("https://www.ocranstrategicconsulting.com/sitemap.xml");
  });
});

describe("sitemap.xml", () => {
  it("lists only routes that exist, on the www host", () => {
    expect(sitemap()).toEqual([{ url: "https://www.ocranstrategicconsulting.com" }]);
  });
});

describe("llms.txt", () => {
  it("is plain text with the firm, tagline and every service line", async () => {
    const res = await llms();
    const text = await res.text();
    expect(res.headers.get("Content-Type")).toContain("text/plain");
    expect(text).toMatch(/^# Ocran Strategic Consulting\n/);
    expect(text).toContain("> Transforming Businesses.");
    expect(text).toContain("- Training & Capacity Building");
    expect(text).toContain("(https://www.ocranstrategicconsulting.com)");
  });
});
