import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/seo";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  variable: "--font-bodoni",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-jost",
});

// Defaults for every route; pages override via buildMetadata (lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: TAGLINE,
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={`${bodoni.variable} ${jost.variable}`}>
      {/* Flex column so <main className="flex-1"> keeps the footer at the bottom of short pages. */}
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
