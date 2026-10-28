import { describe, expect, it } from "vitest";
import { SEED } from "./content";
import { SEO_COPY } from "./copy";

describe("drafted search titles and descriptions (D-031)", () => {
  const slugs = [...SEED.services, ...SEED.industries].map((item) => item.slug);

  it("cover every service and industry", () => {
    expect(Object.keys(SEO_COPY).sort()).toEqual([...slugs].sort());
  });

  it.each(Object.entries(SEO_COPY))("%s stays within Google's limits", (_slug, seo) => {
    expect(seo.metaTitle.length).toBeLessThanOrEqual(60);
    expect(seo.metaTitle).toMatch(/Ocran Strategic/);
    expect(seo.metaDescription.length).toBeGreaterThanOrEqual(140);
    expect(seo.metaDescription.length).toBeLessThanOrEqual(160);
  });
});
