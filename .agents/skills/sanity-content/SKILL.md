---
name: sanity-content
description: Use when adding or changing Sanity schemas, GROQ queries, or wiring CMS content into pages for the Ocran site.
---

# Sanity content playbook

The content model is defined in `docs/PROJECT-BRIEF.md` §5. Jonathan (non-technical) edits content in `/studio`,
so the Studio experience matters as much as the code.

## Schema rules
- Use `defineType` / `defineField` / `defineArrayMember`. One file per type in `sanity/schemaTypes/`.
- Every field gets a `title` and, where helpful, a `description` written for a non-technical editor
  ("Shown under the title on the service page. 1–2 sentences.").
- Required fields use `validation: (r) => r.required()`; add `max()` on SEO fields (title 60, description 160).
- `slug` fields: `options: { source: 'title', maxLength: 96 }`, required.
- Images: `options: { hotspot: true }` + a required `alt` string field.
- Singletons (`siteSettings`, `founder`): enforce via Structure Builder, hide "create new".
- `caseStudy` and `testimonial`: `permissionConfirmed` must be `true` to publish (custom validation).
- `book.file`: never expose the file URL in public GROQ projections.
- Add `preview` config so lists in Studio show title + image + subtitle.
- Contact details (emails, phone, WhatsApp) live ONLY in `siteSettings` — never hardcode them in components.

## Query rules
- All GROQ in `lib/sanity/queries.ts` using `defineQuery`; run `sanity typegen generate` after schema changes.
- Project only the fields the page needs. Resolve references in the query (`"industries": relatedIndustries[]->{title, "slug": slug.current}`).
- Fetch with `next: { tags: ['<type>', '<type>:<slug>'] }`; `/api/revalidate` maps Sanity webhook payloads to tags.
- Images through `lib/sanity/image.ts` (`@sanity/image-url`) with explicit width and `auto('format')`.

## Done when
- [ ] Schema deploys without errors; Studio shows friendly titles/descriptions
- [ ] Typegen regenerated; no `any`
- [ ] Page renders with empty optional fields (no crashes on missing data)
- [ ] Publishing in Studio updates the live page within ~1 minute (revalidation works)
