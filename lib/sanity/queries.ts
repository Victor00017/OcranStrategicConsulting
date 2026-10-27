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
