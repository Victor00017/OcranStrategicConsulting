import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

/**
 * Section header: optional gold eyebrow + display (Bodoni) heading.
 * Renders an <h2> by default; pass `as` to change the level so the page keeps
 * a single <h1> and a logical heading order.
 */
export function SectionHeading({
  eyebrow,
  children,
  as: Tag = "h2",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  as?: "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`.trim()}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag
        className={`font-display text-ink text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.15] font-medium text-balance ${
          align === "center" ? "mx-auto max-w-[20ch]" : "max-w-[24ch]"
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}
