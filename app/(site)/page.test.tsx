import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home placeholder", () => {
  it("renders exactly one h1", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it("mentions the business", () => {
    render(<Home />);
    expect(screen.getByText(/Ocran Strategic Consulting/i)).toBeInTheDocument();
  });
});
