import type { ReactNode } from "react";

/**
 * Small uppercase tracked label in gold, echoing "CONSULTING" in the wordmark.
 * See docs/DESIGN.md §2.
 */
export function Eyebrow({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={`text-gold-text text-xs font-medium tracking-[0.2em] uppercase ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
