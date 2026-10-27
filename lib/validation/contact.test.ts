import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/email";
import { readContactForm, validateContact, type ContactValues } from "./contact";

const valid: ContactValues = {
  name: "Jane Example",
  email: "jane@example.com",
  phone: "",
  service: "",
  message: "We need a feasibility study for a poultry farm.",
};

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

describe("validateContact", () => {
  it("accepts name, email and message with phone and service left empty", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires name, email and message", () => {
    expect(Object.keys(validateContact({ ...valid, name: "", email: "", message: "" }))).toEqual([
      "name",
      "email",
      "message",
    ]);
  });

  it.each(["jane", "jane@", "jane@example", "jane @example.com"])("rejects email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeDefined();
  });

  it("accepts Ghanaian and international phone formats, rejects letters", () => {
    for (const phone of ["+233 20 000 0000", "020-000-0000", "(020) 000 0000"]) {
      expect(validateContact({ ...valid, phone }).phone).toBeUndefined();
    }
    expect(validateContact({ ...valid, phone: "call me" }).phone).toBeDefined();
  });

  it("asks for a bit more detail on very short messages", () => {
    expect(validateContact({ ...valid, message: "Hi" }).message).toMatch(/more detail/);
  });
});

describe("readContactForm", () => {
  it("trims values and flags the honeypot", () => {
    const { values, honeypot } = readContactForm(
      form({ name: "  Jane  ", email: "jane@example.com", message: "x", website: "spam.example" }),
    );
    expect(values.name).toBe("Jane");
    expect(values.phone).toBe("");
    expect(honeypot).toBe(true);
  });
});

describe("rate limiter", () => {
  it("allows the limit within a window, then blocks until it resets", () => {
    const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect([allow("ip", 0), allow("ip", 10), allow("ip", 20)]).toEqual([true, true, false]);
    expect(allow("other", 20)).toBe(true);
    expect(allow("ip", 1001)).toBe(true);
  });
});

describe("escapeHtml", () => {
  it("neutralises markup from the enquirer", () => {
    expect(escapeHtml(`<img src=x onerror="alert('x')">&`)).toBe(
      "&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;",
    );
  });
});
