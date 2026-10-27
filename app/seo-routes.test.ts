import { describe, expect, it, vi } from "vitest";
import { SEED } from "@/sanity/seed/content";

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
  it("lists only routes that exist, on the www host", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls).toEqual([
      "https://www.ocranstrategicconsulting.com",
      "https://www.ocranstrategicconsulting.com/services",
      ...SEED.services.map((s) => `https://www.ocranstrategicconsulting.com/services/${s.slug}`),
    ]);
  });

  it("omits lastModified for seed content (no real edit date)", async () => {
    expect((await sitemap()).some((entry) => "lastModified" in entry)).toBe(false);
  });
});

describe("llms.txt", () => {
  it("is plain text with the firm, tagline and every service line", async () => {
    const res = await llms();
    const text = await res.text();
    expect(res.headers.get("Content-Type")).toContain("text/plain");
    expect(text).toMatch(/^# Ocran Strategic Consulting\n/);
    expect(text).toContain("> From insights to strategy.");
    expect(text).toContain(
      "- [Training and Capacity Building](https://www.ocranstrategicconsulting.com/services/training)",
    );
    expect(text).toContain("(https://www.ocranstrategicconsulting.com)");
  });
});
