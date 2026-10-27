# Held features — restore guide (D-016)

Agents: do not open this file during Phase 1 work. It exists so these features can be brought back without
guesswork once the client is ready.

On hold since 2026-10-27: the **books showcase**, **online book sales** (already Phase 2, see
`paystack-books.md`), **email-gated resource downloads**, and the **refunds** page.

## What the plan said before the hold

### Books showcase (was build step 11)

- Routes: `/books` (showcase list) and `/books/[slug]` (detail). Header nav item "Books"; footer "Explore" link.
- CTA on a book page: "Enquire to order" → `/contact?topic=book&title=<slug>`, prefilling the contact form.
  No prices charged online, no payment code.
- Home page section: "Books — featured book(s)" (between Featured insights and the Contact CTA band).
- Sanity `book` type: title, slug, subtitle, cover, description, format (digital/physical/both), priceGHS
  (display only), isbn?, pages, publishedYear, seo. Phase 2 adds the private file + checkout fields.
  Rule: never expose `book.file` URLs in public GROQ projections.
- Component: `BookCard` (DESIGN.md §4).
- SEO: include books in `app/sitemap.ts`; JSON-LD `Book` + `Product` with `Offer` (price, priceCurrency GHS,
  availability).
- Launch checklist: Lighthouse ≥ 90 on a book page; Rich Results for Book/Product; "Enquire to order"
  prefills the contact form.
- Audience row (brief §2): Students, officers, farmers → books, training guides, templates → "Buy / download".
- Client questions still open: brief §7 q7 (titles, covers, prices, format, shipping) and q8 (Paystack).

### Resources + email-gated downloads (was build step 10)

- Route: `/resources` — templates, toolkits, diagnostic tools. Footer "Explore" link.
- Home page section: "Resource lead magnet — 'Free agribusiness diagnostic toolkit' email capture".
- Sanity `resource` type: title, slug, type (template/toolkit/diagnostic), description, file, gated (bool).
- `app/api/subscribe/route.ts`: adds the contact to the Brevo list (double opt-in in Brevo). After sign-up,
  email a signed download link instead of showing the file on the page.
- Env vars: `BREVO_API_KEY`, `BREVO_LIST_ID`, `DOWNLOAD_TOKEN_SECRET` (random 32+ chars). These are kept
  commented out in `.env.example`.
- Privacy policy and contact-and-email skill: list Brevo as a processor.
- Client question still open: brief §7 q11 (gated or free) and q12 (the actual toolkits).

### Refunds

- Route `/refunds` and a footer legal link. Only needed once something is sold.

## Restoring a feature

1. Add a DECISIONS.md entry that reverses the relevant part of D-016.
2. Put the items above back into: `AGENTS.md` (§1 goals, §2 stack, §4 structure, §5 rules), `docs/PROJECT-BRIEF.md`
   (§2, §3 sitemap and home sections, §5 content model), `docs/SEO.md`, `docs/SETUP.md` (§4, §9, §10),
   `docs/DESIGN.md` §4, the `contact-and-email` and `sanity-content` skills, `.env.example`, and `lib/nav.ts`.
3. Add the build step back to `docs/PROGRESS.md`.
