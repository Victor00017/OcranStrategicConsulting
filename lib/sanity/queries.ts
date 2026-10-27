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
