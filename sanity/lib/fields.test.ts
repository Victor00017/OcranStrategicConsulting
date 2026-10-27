import { describe, expect, it } from "vitest";
import { requirePermission } from "./fields";

describe("requirePermission", () => {
  it("allows publishing only when permission is confirmed", () => {
    expect(requirePermission(true)).toBe(true);
  });

  it.each([false, undefined, null])("blocks publishing for %s", (value) => {
    expect(requirePermission(value)).toEqual(expect.any(String));
  });
});
