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
export const STATIC_ROUTES = ["/", "/services", "/industries", "/about", "/contact"] as const;

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

/** True while text still holds a `{{TODO: …}}` marker — such text is kept out of structured data. */
export const hasTodo = (text: string | null | undefined) => !!text && text.includes("{{TODO");

export type Crumb = { name: string; path: string };

/** BreadcrumbList for nested pages (docs/SEO.md §1). Pass the same crumbs the visible trail shows. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Service page JSON-LD (docs/SEO.md §2): Service linked to the site-wide Organization. */
export function serviceJsonLd({
  title,
  slug,
  summary,
}: {
  title: string;
  slug: string;
  summary: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${slug}`)}#service`,
    name: title,
    serviceType: title,
    url: absoluteUrl(`/services/${slug}`),
    ...(summary && !hasTodo(summary) ? { description: summary } : {}),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "Country", name: "Ghana" },
      { "@type": "Place", name: "Sub-Saharan Africa" },
    ],
  };
}

/** FAQPage JSON-LD — only for FAQs that are visible on the page. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export const FOUNDER_ID = `${SITE_URL}/about#founder`;

/** About page Person JSON-LD (docs/SEO.md §2), linked to the Organization it works for. */
export function personJsonLd(founder: {
  name: string;
  title: string | null;
  shortBio: string | null;
  credentials: string[] | null;
  alumniOf: string[] | null;
  expertise: string[] | null;
  portrait: { url: string | null } | null;
}) {
  const image = founder.portrait?.url;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    url: absoluteUrl("/about"),
    worksFor: { "@id": ORGANIZATION_ID },
    ...(founder.title ? { jobTitle: founder.title } : {}),
    ...(founder.shortBio ? { description: founder.shortBio } : {}),
    ...(image ? { image: image.startsWith("/") ? absoluteUrl(image) : image } : {}),
    ...(founder.alumniOf?.length
      ? { alumniOf: founder.alumniOf.map((name) => ({ "@type": "CollegeOrUniversity", name })) }
      : {}),
    ...(founder.credentials?.length
      ? {
          hasCredential: founder.credentials.map((name) => ({
            "@type": "EducationalOccupationalCredential",
            name,
          })),
        }
      : {}),
    ...(founder.expertise?.length ? { knowsAbout: founder.expertise } : {}),
  };
}

/** Article JSON-LD (docs/SEO.md §2): authored by the founder, published by the Organization. */
export function articleJsonLd(article: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string | null;
  coverImage: { url: string | null } | null;
}) {
  const url = absoluteUrl(`/insights/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(article.coverImage?.url ? { image: article.coverImage.url } : {}),
  };
}
