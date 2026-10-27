import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// TEMPORARY favicon (D-030): a gold Bodoni "O" on ivory so browsers stop requesting a missing
// /favicon.ico. Replace with the monogram once the vector logo is approved (D-027).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const bodoni = await readFile(
    join(process.cwd(), "assets/fonts/bodoni-moda-latin-500-normal.woff"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf7f0",
          color: "#996c28",
          fontFamily: "Bodoni Moda",
          fontSize: 58,
          lineHeight: 1,
          paddingBottom: 6,
        }}
      >
        O
      </div>
    ),
    { ...size, fonts: [{ name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" }] },
  );
}
