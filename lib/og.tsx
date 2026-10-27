import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "./seo";

export const OG_SIZE = { width: 1200, height: 630 };

// Hex values mirror the @theme tokens in app/globals.css: the OG renderer can't read CSS variables.
const C = {
  ivory: "#faf7f0",
  ink: "#1c1a17",
  inkMuted: "#5c564c",
  gold: "#996c28",
  goldText: "#7d5719",
};

// Static WOFF copies (OFL, assets/fonts/) — the OG renderer can't use next/font's WOFF2.
const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/bodoni-moda-latin-500-normal.woff")),
  readFile(join(process.cwd(), "assets/fonts/jost-latin-500-normal.woff")),
]);

/**
 * Brand share image (docs/SEO.md §1): ivory ground, gold eyebrow and hairline, Bodoni title.
 * Per-page images call this from their own opengraph-image.tsx with the page title.
 * The monogram is added once the client supplies a vector logo (PROGRESS backlog).
 */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [bodoni, jost] = await fonts;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: C.ivory,
          color: C.ink,
          fontFamily: "Jost",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 2, backgroundColor: C.gold }} />
          <div
            style={{
              marginTop: 28,
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.goldText,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: "Bodoni Moda",
              fontSize: title.length > 60 ? 60 : 72,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: C.inkMuted }}>{SITE_NAME}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" },
        { name: "Jost", data: jost, weight: 500, style: "normal" },
      ],
    },
  );
}
