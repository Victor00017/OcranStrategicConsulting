import { describe, expect, it } from "vitest";
import { tagsForDocument } from "./tags";

describe("tagsForDocument", () => {
  it("tags a singleton by type only", () => {
    expect(tagsForDocument({ _type: "siteSettings" })).toEqual(["siteSettings"]);
  });

  it("tags a slugged document by type and slug", () => {
    expect(tagsForDocument({ _type: "article", slug: "soil-health" })).toEqual([
      "article",
      "article:soil-health",
    ]);
  });
});
