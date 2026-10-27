import type { BlockContent } from "@/sanity.types";

export type Para = { style?: "normal" | "h2" | "h3"; bullet?: boolean; text: string };

/** Plain paragraphs (headings, bullets) → Sanity portable text (`blockContent`) with stable keys. */
export function toBlocks(paras: Para[]): BlockContent {
  return paras.map(({ style = "normal", bullet = false, text }, index) => ({
    _type: "block",
    _key: `p${index}`,
    style,
    ...(bullet ? { listItem: "bullet" as const, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}
