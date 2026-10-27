import type { ElementType, ReactNode } from "react";

/**
 * Page container: max 1200px, responsive side gutters (16px mobile / 32px tablet, auto desktop).
 * See docs/DESIGN.md §3.
 */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1200px] px-4 sm:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
