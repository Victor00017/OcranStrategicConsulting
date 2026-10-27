import { OG_SIZE, renderOgImage } from "@/lib/og";
import { SITE_NAME, TAGLINE } from "@/lib/seo";

// Site-wide default share image; nested routes can add their own opengraph-image.tsx.
export const alt = `${SITE_NAME} — ${TAGLINE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: "Tema · Greater Accra · Ghana", title: TAGLINE });
}
