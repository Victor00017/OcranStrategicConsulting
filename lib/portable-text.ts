import type { BlockContent } from "@/sanity.types";

type Block = Extract<BlockContent[number], { _type: "block" }>;

/** Plain text of one portable-text block (spans and any inline objects that carry text). */
export function blockText(block: { children?: ReadonlyArray<{ _type: string; text?: unknown }> }) {
  return (block.children ?? [])
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("");
}

/** URL-safe id for a heading, shared by the rendered <h2> and the table of contents. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The article's H2s, in order — the table of contents. */
export function tableOfContents(body: BlockContent | null) {
  return (body ?? [])
    .filter((block): block is Block => block._type === "block" && block.style === "h2")
    .map((block) => {
      const text = blockText(block);
      return { id: headingId(text), text };
    });
}
