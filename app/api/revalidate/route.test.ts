import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const parseBody = vi.fn();
const revalidateTag = vi.fn();
vi.mock("next-sanity/webhook", () => ({ parseBody: (...args: unknown[]) => parseBody(...args) }));
vi.mock("next/cache", () => ({ revalidateTag: (...args: unknown[]) => revalidateTag(...args) }));

const { POST } = await import("./route");
const req = {} as NextRequest;

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    parseBody.mockReset();
    revalidateTag.mockReset();
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "test-secret");
  });

  it("returns 500 when the secret is not configured", async () => {
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "");
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(parseBody).not.toHaveBeenCalled();
  });

  it("rejects an invalid signature without revalidating", async () => {
    parseBody.mockResolvedValue({ isValidSignature: false, body: { _type: "service" } });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a body without _type", async () => {
    parseBody.mockResolvedValue({ isValidSignature: true, body: {} });
    expect((await POST(req)).status).toBe(400);
  });

  it("expires the type and document tags", async () => {
    parseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "service", slug: "agribusiness-advisory" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(parseBody).toHaveBeenCalledWith(req, "test-secret", true);
    expect(revalidateTag.mock.calls).toEqual([
      ["service", { expire: 0 }],
      ["service:agribusiness-advisory", { expire: 0 }],
    ]);
  });

  it("returns 400 when the body cannot be parsed", async () => {
    parseBody.mockRejectedValue(new SyntaxError("bad json"));
    expect((await POST(req)).status).toBe(400);
  });
});
