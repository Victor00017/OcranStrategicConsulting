import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd } from "./json-ld";

describe("JsonLd", () => {
  it("renders parseable JSON-LD and escapes </script>", () => {
    const { container } = render(<JsonLd data={{ name: "</script><b>x</b>" }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).not.toContain("</script>");
    expect(JSON.parse(script?.textContent ?? "")).toEqual({ name: "</script><b>x</b>" });
  });
});
