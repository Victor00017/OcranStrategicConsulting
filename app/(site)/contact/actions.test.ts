import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let ip = "203.0.113.1";
vi.mock("next/headers", () => ({ headers: async () => new Headers({ "x-forwarded-for": ip }) }));
vi.mock("@/lib/content/services", () => ({
  getServices: async () => [
    { slug: "agribusiness-advisory", title: "Agribusiness Advisory Services" },
  ],
}));

const { submitContact } = await import("./actions");
const idle = { status: "idle" } as const;

const form = (overrides: Record<string, string> = {}) => {
  const data = new FormData();
  const fields = {
    name: "Jane Example",
    email: "jane@example.com",
    phone: "+233000000000",
    service: "agribusiness-advisory",
    message: "We need a feasibility study for a poultry farm.",
    website: "",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

describe("submitContact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    ip = `203.0.113.${Math.floor(Math.random() * 250)}`;
    fetchMock.mockReset().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "consultant@example.com");
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("emails the consultant with the enquirer as reply-to and the service in the subject", async () => {
    expect(await submitContact(idle, form())).toEqual({ status: "success" });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      to: ["consultant@example.com"],
      reply_to: "jane@example.com",
      subject: "New enquiry — Agribusiness Advisory Services",
      from: "Ocran Strategic Consulting website <onboarding@resend.dev>",
    });
    expect(body.text).toContain("We need a feasibility study");
  });

  it("treats an unknown service as a general enquiry and escapes HTML", async () => {
    await submitContact(
      idle,
      form({ service: "nope", message: "<b>Hello</b> there, a real question." }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.subject).toBe("New enquiry — General");
    expect(body.html).toContain("&lt;b&gt;Hello&lt;/b&gt;");
  });

  it("returns field errors and keeps what the visitor typed", async () => {
    const result = await submitContact(idle, form({ email: "not-an-email" }));
    expect(result).toMatchObject({ status: "error", errors: { email: expect.any(String) } });
    expect(result.status === "error" && result.values.name).toBe("Jane Example");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    expect(await submitContact(idle, form({ website: "https://spam.example" }))).toEqual({
      status: "success",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate-limits a visitor after 5 messages in an hour", async () => {
    for (let i = 0; i < 5; i++) await submitContact(idle, form());
    const sixth = await submitContact(idle, form());
    expect(sixth).toMatchObject({ status: "error", message: expect.stringMatching(/an hour/) });
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("shows a friendly error when email isn't configured or Resend fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await submitContact(idle, form())).toMatchObject({ status: "error" });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 422 }));
    expect(await submitContact(idle, form())).toMatchObject({
      status: "error",
      message: expect.stringMatching(/couldn't be sent/),
    });
  });

  it("never logs personal data", async () => {
    await submitContact(idle, form());
    const logged = vi.mocked(console.info).mock.calls.flat().join(" ");
    expect(logged).not.toMatch(/jane|Jane|example\.com|233|poultry/);
  });
});
