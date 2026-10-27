import type { Metadata } from "next";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { SERVICES } from "./nav";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ocranstrategicconsulting.com"
).replace(/\/$/, "");
export const SITE_NAME = "Ocran Strategic Consulting";
// Client-confirmed tagline (D-019). Sanity siteSettings.tagline overrides it where content is fetched.
export const TAGLINE = "From insights to strategy.";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Public routes that exist today. sitemap.ts and llms.txt read this list, so add a route here
 * when its page ships (Sanity-driven routes are added to sitemap.ts from build step 5 on).
 */
export const STATIC_ROUTES = ["/"] as const;

// Matches how Next renders canonicals: the home page is the bare host, no trailing slash.
export const absoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/** app/opengraph-image.tsx — used when a page has no share image of its own. */
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  alt: `${SITE_NAME} — ${TAGLINE}`,
  width: 1200,
  height: 630,
};

/**
 * Page metadata — use this from every route's `generateMetadata` (seo-page skill, docs/SEO.md §1).
 * `title` is the page name only; the root layout's template appends " | Ocran Strategic Consulting".
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  // A page's `openGraph` replaces its parent's wholesale, so the default image must be repeated here.
  const ogImage = image ? { ...image, width: 1200, height: 630 } : DEFAULT_OG_IMAGE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_GH",
      type: "website",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

/**
 * Site-wide JSON-LD (docs/SEO.md §2): Organization + ProfessionalService, and WebSite.
 * Contact details come only from Sanity siteSettings (D-004); without them the entity is still valid.
 */
export function organizationJsonLd(settings: SiteSettings | null) {
  const email = settings?.contactEmails?.[0];
  const sameAs = settings?.socialLinks?.map((link) => link.url).filter(Boolean);
  const { lat, lng } = settings?.geo ?? {};

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORGANIZATION_ID,
        name: settings?.name || SITE_NAME,
        url: absoluteUrl("/"),
        slogan: settings?.tagline || TAGLINE,
        ...(settings?.valueProp ? { description: settings.valueProp } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tema",
          addressRegion: "Greater Accra",
          addressCountry: "GH",
        },
        areaServed: [
          { "@type": "Country", name: "Ghana" },
          { "@type": "Place", name: "Sub-Saharan Africa" },
        ],
        knowsAbout: SERVICES.map((service) => service.label),
        ...(settings?.phone ? { telephone: settings.phone } : {}),
        ...(email ? { email } : {}),
        ...(lat != null && lng != null
          ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
          : {}),
        ...(sameAs?.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        inLanguage: "en-GH",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}
