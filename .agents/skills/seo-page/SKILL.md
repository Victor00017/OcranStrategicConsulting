---
name: seo-page
description: Use when creating or editing any public page or route on the Ocran site. Ensures metadata, canonical, JSON-LD, headings, internal links and sitemap inclusion are correct.
---

# SEO page playbook

## Steps

1. Decide the page's **one primary search intent** (check `docs/SEO.md` §3). Put it in the H1 naturally and in the
   meta title. Don't keyword-stuff.
2. Metadata via the helper — never hand-roll:
   ```ts
   // app/(site)/services/[slug]/page.tsx
   export async function generateMetadata({ params }): Promise<Metadata> {
     const { slug } = await params;
     const service = await getService(slug);
     if (!service) return {};
     return buildMetadata({
       title: service.seo?.metaTitle ?? service.title,
       description: service.seo?.metaDescription ?? service.summary,
       path: `/services/${slug}`,
       image: service.seo?.ogImage,
     });
   }
   ```
   `buildMetadata` (lib/seo.ts) sets title template, canonical, OG, Twitter, robots (honours `seo.noindex`).
3. Add `generateStaticParams` for every dynamic content route.
4. JSON-LD: render `<JsonLd data={...} />` with the schema type from `docs/SEO.md` §2. Use ids so entities link:
   `"provider": { "@id": "https://www.ocranstrategicconsulting.com/#organization" }`,
   `"author": { "@id": ".../about#founder" }`.
5. Structure: exactly one `<h1>`; H2s for sections; breadcrumbs on nested pages (visible + `BreadcrumbList`).
6. Internal links: every service page links to ≥ 2 related industries and ≥ 2 articles; every article links to
   ≥ 1 service and ≥ 1 related article; end each page with a CTA to /contact.
7. Confirm the route is emitted by `app/sitemap.ts` (Sanity-driven routes) or add it (static routes).
8. Images: `next/image`, descriptive alt, `priority` only on the LCP image.

## Done when

- [ ] Unique title ≤ 60 chars, description 140–160 chars
- [ ] Canonical correct (www, no trailing slash)
- [ ] JSON-LD valid (paste output into validator.schema.org)
- [ ] One H1, logical H2/H3
- [ ] In sitemap; not blocked by robots
- [ ] No layout shift from images/fonts
