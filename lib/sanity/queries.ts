import { defineQuery } from "next-sanity";

// All GROQ lives here (AGENTS.md §6). Project only the fields a page needs.
// After adding or changing a query, run `pnpm typegen`.

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  name,
  tagline,
  valueProp,
  contactEmails,
  phone,
  whatsapp,
  address,
  geo,
  socialLinks[]{platform, url},
  defaultOgImage
}`);

// Everything the home page shows, in one round trip. Shape is mirrored by sanity/seed/content.ts.
export const HOME_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    tagline,
    valueProp,
    proofPoints[]{_key, value, label}
  },
  "home": *[_type == "homePage"][0]{
    deliverables,
    audiences[]{_key, title, needs, ctaLabel, "serviceSlug": service->slug.current},
    process[]{_key, title, description},
    trackRecord[]{_key, context, result}
  },
  "founder": *[_type == "founder"][0]{
    name,
    title,
    shortBio,
    credentials,
    "portrait": portrait{alt, "url": asset->url}
  },
  "services": *[_type == "service" && defined(slug.current)] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    summary,
    subServices
  },
  "industries": *[_type == "industry" && defined(slug.current)] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current
  },
  "articles": *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt
  }
}`);

// Services index and sitemap. Order matches the home page.
export const SERVICES_QUERY =
  defineQuery(`*[_type == "service" && defined(slug.current)] | order(order asc, title asc){
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  subServices
}`);

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  subServices,
  deliverables,
  body,
  outcomes,
  faqs[]{_key, question, answer},
  "relatedIndustries": relatedIndustries[]->{_id, title, "slug": slug.current},
  seo{metaTitle, metaDescription, noindex, "ogImage": ogImage.asset->url}
}`);

// Industries index and sitemap. Order matches the home page.
export const INDUSTRIES_QUERY =
  defineQuery(`*[_type == "industry" && defined(slug.current)] | order(order asc, title asc){
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary
}`);

// `servedBy` finds services that list this industry, so editors can link from either side.
export const INDUSTRY_QUERY = defineQuery(`*[_type == "industry" && slug.current == $slug][0]{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  summary,
  body,
  challenges,
  "relatedServices": relatedServices[]->{_id, title, "slug": slug.current},
  "servedBy": *[_type == "service" && defined(slug.current) && references(^._id)] | order(order asc){
    _id,
    title,
    "slug": slug.current
  },
  seo{metaTitle, metaDescription, noindex, "ogImage": ogImage.asset->url}
}`);

// Introductions for the /services and /industries index pages.
export const PAGE_INTROS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{servicesIntro, industriesIntro}`,
);

// /about: the firm (aboutPage) and the founder's full profile.
export const ABOUT_QUERY = defineQuery(`{
  "about": *[_type == "aboutPage"][0]{companyStory, mission, vision, values},
  "founder": *[_type == "founder"][0]{
    name,
    title,
    shortBio,
    longBio,
    credentials,
    alumniOf,
    expertise,
    countries,
    "portrait": portrait{alt, "url": asset->url}
  }
}`);

// /publications, newest first.
export const PUBLICATIONS_QUERY =
  defineQuery(`*[_type == "publication"] | order(year desc, title asc){
  _id,
  title,
  type,
  year,
  publisher,
  url,
  doi
}`);
