import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SERVICES } from "@/lib/nav";
import NotFound from "./not-found";

vi.mock("next/navigation", () => ({ usePathname: () => "/missing" }));

describe("404 page", () => {
  it("renders exactly one h1", () => {
    render(<NotFound />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links to every service", () => {
    render(<NotFound />);
    const services = screen.getByRole("navigation", { name: "Services" });
    for (const service of SERVICES) {
      expect(services.querySelector(`a[href="${service.href}"]`)).not.toBeNull();
    }
  });

  it("has a skip link that targets main", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
  });
});
