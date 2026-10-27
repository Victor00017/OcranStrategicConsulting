# PROGRESS.md — living project state (the agent updates this every session)

## Current state

Build steps 0–9, 12 and 13 done and live (10–11 on hold, D-016). Audit (D-030): accessibility 100 on most pages, SEO
100, keyboard and form checks pass, security headers added, structured data valid. Mobile performance 79–83 — framework
JavaScript, accepted for now and watched via Speed Insights. Temporary favicon until the logo is chosen; a rebuilt
logo candidate is in `docs/brand/` awaiting approval. All checks green, 84 tests.

## Next up

Build plan item 14 — `docs/EDITOR-GUIDE.md` (plain-language Studio guide for the consultant) + README deploy notes.
Human: choose the logo route (Canva export vs. the candidate), run Google's Rich Results Test on 2–3 live pages.

## Build plan

- [x] 0. Scaffold: Next.js (App Router, TS strict) + Tailwind v4 + pnpm, ESLint, Prettier, Vitest; tokens + fonts from DESIGN.md; scripts `lint`, `typecheck`, `test`
- [x] 1. Base layout: SiteHeader (mobile sheet menu), SiteFooter, Container, Button, Eyebrow, SectionHeading, skip link, 404; start docs/COMPONENTS.md
- [x] 2. Sanity: embedded Studio at /studio, all schemas (sanity-content skill), singletons, typegen, /api/revalidate
- [x] 3. SEO foundation: lib/seo.ts, <JsonLd/>, sitemap, robots, llms.txt, OG image template
- [x] 4. Home page sections (design reviewed by Claude before replicating patterns)
- [x] 5. Services index + /services/[slug]
- [x] 6. Industries index + /industries/[slug]
- [x] 7. About (founder, credentials, countries) + Publications
- [x] 8. Insights list + article page (portable text, TOC, related, author box)
- [x] 9. Contact form + /api/contact + emails (contact-and-email skill)
- [ ] ~~10. Resources + Brevo gated downloads~~ — on hold (D-016)
- [ ] ~~11. Books showcase + "Enquire to order" → prefilled contact form~~ — on hold (D-016)
- [x] 12. Case studies, legal pages (privacy/terms), analytics
- [x] 13. Audit: web-design-guidelines, webapp-testing screenshots, Lighthouse, Rich Results, security headers → fix
- [ ] 14. Handover docs: docs/EDITOR-GUIDE.md (how Jonathan edits content in Studio, plain language) + README deploy notes

## Backlog (noticed, not scheduled)

Strategy-level:

- On hold (D-016): books showcase + online sales, `/resources` + gated downloads, `/refunds`. Restore guide: `docs/later/held-features.md` (do not open during Phase 1 work)
- Install the three third-party skills in `docs/SKILLS.md` (human: review each SKILL.md first). Until then the agent cannot use `webapp-testing` / `web-design-guidelines`.
- French version for francophone West Africa (pending client decision)

Findings from doc review — operational, will recur if forgotten:

- **`www` has no TLS certificate yet.** DNS (CNAME → cname.vercel-dns.com) is in place, but `www.ocranstrategicconsulting.com`
  isn't added to the Vercel project, so HTTPS on www shows a certificate error. Canonicals point to www (D-018). Human:
  Vercel → Domains → add www, make it primary, redirect apex → www (308).
- **Sanity revalidate webhook not set up yet** (SETUP.md §5 step 5). Until it is, Studio edits reach the live site only on
  the next Vercel deploy.

- **JS budget**: measured in the audit (D-030) — 183 KB gz on home, mostly framework; Lighthouse performance 79–83
  with LCP and CLS in budget. Watch real-user Speed Insights before optimising further.
- **Local Node default is 20** (nvm) but the project needs ≥ 22.12. Run `nvm install 22 && nvm alias default 22`, or
  `nvm use` in this folder (reads `.nvmrc`). Under Node 20, `pnpm typegen` refuses to run.

- **`public/brand/logo-reference.png` is raster.** Needs an SVG from the client (brief §7 q1) before it is used at multiple sizes — favicon, header, footer watermark.
- **`docs/EDITOR-GUIDE.md` does not exist yet** but is referenced by build step 14. That step must _create_ it.
- **`docs/DEEPSEEK.md` §1 model table needs verifying** against the DeepSeek console (`deepseek-flash` / `deepseek-v4-pro`, and the "Oct 2026" date). Do not configure a model from that table until confirmed.
- **Ghana DPC registration** — confirm whether the business must register with the Data Protection Commission (`docs/SETUP.md` §9). Human task, not code.
- **Namecheap default parking records** must be deleted before Vercel DNS goes live (`docs/SETUP.md` §2). Human task.

## Content TODOs (waiting on client)

See docs/PROJECT-BRIEF.md §7 open questions. Agent: add `{{TODO}}` items here as you create them.

**Drafted copy for client sign-off (D-023)** — all editable in the Studio; source file `sanity/seed/copy.ts`:

- **Privacy notice and terms of use (D-029)** — plain-language drafts; have them reviewed, ideally by a Ghanaian
  lawyer, before promoting the site. Edit in Studio → Legal pages and update "Last updated".

- Contact page: heading "Request a consultation", intro line, form labels and success message.

- Insights page introduction and meta description (`app/(site)/insights/page.tsx`).

- Home: "What we deliver" list, "Who we work with" headline and four audience cards, "How we work" steps,
  "Experience behind the advice" intro line.
- Services: six summaries, "What you receive" lists, outcomes, FAQs, related industries. Services and industries
  page introductions.
- Industries: seven summaries and challenge lists.

- Approve or replace: home section headings ("What we do", "Sectors we serve", "Start a conversation"), hero eyebrow
  ("Strategic consulting · Tema"), home meta description (built from brief facts, 157 chars) — D-020.
- Uncropped founder portrait for the rectangular hero frame (D-019).
- `/services` meta description built from brief facts (158 chars) — approve. Three service titles push the page title past 60 characters ("… | Ocran Strategic
  Consulting"); set a shorter **Search title** in Studio for those, or accept the truncation.
- Per service, when available: longer page content (the drafts cover summary, deliverables, outcomes, FAQs).
- Industries index meta description (148 chars) — approve.
- Per industry, when available: longer page content (drafts cover summary and challenges; services link from either side, D-022).
- **Logo:** a rebuilt candidate is in `docs/brand/logo-candidate.svg` (+ comparison PNG) — approve it, or keep waiting for
  the Canva export. Then: header, real favicon (replaces the temporary "O"), OG image. Original note (D-027): ask the client to download the logo from Canva as **SVG** (Pro) or **PDF Print**
  (free plan, transparent background). PDF converts exactly here. Then: header, favicon, OG image.
- **Confirm "30 countries"**: the Detailed Profile's list reaches 30 only by counting Zanzibar (part of Tanzania).
  Either confirm, or use "30 countries and territories" before launch.
- Detailed Profile typo "referred journal papers" was corrected to "refereed" on /about — tell the client.
- Countries list shows "the UAE" exactly as in the profile; client may prefer "United Arab Emirates" (edit in Studio → Founder).
- **The 43 publications** (title, type, year, publisher/journal, link or DOI) — /publications stays hidden from search until they're added.
- **The 5 articles** for Insights (title, excerpt, category, body, related services). After the first is published,
  check an article page in the browser — its layout is only covered by tests so far.
- Case studies: work samples the client has **written permission** to publish (tick "Written permission received").
- Missing attachments referenced by the Website Structure doc: "Consulting Profile —
  Jonathan Nyarko Ocran", proposal template / toolkits / diagnostic tools (on hold, D-016), work samples (step 12).
- Books section lists "Feasibility Study Reports and Business Plans" and "Thought Leadership" — should these appear
  on /publications while books are on hold?

## Session log

<!-- one line per session: YYYY-MM-DD · task · result (done / partial / blocked: why) -->

- 2026-10-25 · Doc consolidation + restore · done — kit collapsed to `ocran-kit-2`; SESSION-PROMPT.md now holds the real prompt; D-005–D-010 + standing constraint restored; backlog findings and step-0 DoD restored. No code touched.
- 2026-10-25 · Build step 0 — scaffold · done — manual Next.js 15 + Tailwind v4 + pnpm scaffold; git init + baseline commit; DESIGN.md tokens in `globals.css`, Bodoni Moda + Jost via `next/font`; Vitest smoke test (2 passing); lint/typecheck/test/build all exit 0. See D-011–D-013.
- 2026-10-27 · Review fixes on in-progress step 1 · done — moved home test to `app/(site)/`; `typecheck` runs `next typegen` first (D-014); mobile menu panel now right-aligned on wide phones; desktop nav active state uses `aria-current` + matches child routes; `Button` link variant drops 44px min size, link form accepts anchor props; repo-wide Prettier pass. lint/typecheck/test/format/build all exit 0.
- 2026-10-27 · Build step 1 — base layout · done — `SiteShell` (skip link + header + main + footer) shared by `(site)` layout and `app/not-found.tsx`; styled 404 linking all services; body flex column keeps footer down; header transition off under reduced motion; header desktop nav from `lg` (logo wrapped at 768); nav lists moved to `lib/nav.ts`; `docs/COMPONENTS.md` created. Screenshots at 375/768/1280 checked. D-015.
- 2026-10-27 · Hold books + gated downloads, fix problem files · done — D-016: Books, Resources, Refunds out of nav and active plan across AGENTS, brief, SEO, SETUP, DESIGN, DEEPSEEK, skills, `.env.example`; build steps 10–11 struck; restore guide `docs/later/held-features.md`. `.clinerules` now allows `.env.example`; AGENTS §8 no longer claims third-party skills are installed; Node pinned (`engines` + `.nvmrc`). Duplicate `OSC/SKILLS.md` + `OSC/SESSION-PROMPT.md` still to delete (human).
- 2026-10-27 · Build step 2 — Sanity · done — upgraded to Next 16.4 / React 19.3 (D-017, also fixes CVE-2025-55182); sanity 6 + next-sanity 13; 9 document types + `seo` + `blockContent`; singleton structure; `/studio` (setup notice until project exists); `/api/revalidate` (signed, tag-based, `{ expire: 0 }`); `pnpm typegen` → `sanity.types.ts`; tests for webhook, tags, permission rule (16 passing). JS budget finding logged. Human: create Sanity project (SETUP.md §5), switch local Node to 22.
- 2026-10-27 · Build step 3 — SEO foundation · done — `lib/seo.ts` (buildMetadata, organizationJsonLd, STATIC_ROUTES), `<JsonLd/>`, title template + metadataBase, robots/sitemap/llms.txt, brand OG image with committed OFL fonts; fixed home losing og:image (D-018). 27 tests. Rich Results validation waits for launch (needs public URL).
- 2026-10-27 · Build step 4 — Home page · done — client answers recorded (D-019: tagline, we-voice, 7 industries, circular portrait); 8 server-only section components; seed-or-Sanity content (D-020) + `pnpm seed`; `proofPoints` and `order` fields; Button `inverse` variant, focus colour per variant, primary label centred; footer hairline. Screenshots at 375/768/1280 reviewed and fixed (stat alignment, eyebrow wrap). 31 tests; home JS 181 KB gz (+5 KB next/image).
- 2026-10-27 · Client source documents reviewed + plan A · done — seed now uses Detailed Profile (title "Senior Consultant", opening sentence as short bio, five credentials with institutions/years) and the client's verbatim value proposition (we-voice); brief gains a Sources section and corrected credentials (MSc is not Animal Science); client flags (30 countries/Zanzibar, "refereed", missing attachments) added to Content TODOs. Strategy-session image confirmed AI-generated — not for publication.
- 2026-10-27 · Build step 5 — Services · done — `/services` index + `/services/[slug]` (all 6 pre-rendered, unknown → 404); new `PageHeader`, `Breadcrumbs` (+ BreadcrumbList), `Prose` (portable text via next-sanity, no new dep), `FaqList` (native details + FAQPage), `ServiceView`; Service JSON-LD skips TODO text (D-021); sitemap async with service URLs; llms.txt links each service. Screenshots 375/1280 checked. 37 tests.
- 2026-10-27 · Build step 6 — Industries · done — `/industries` numbered index + 7 pre-rendered `/industries/[slug]` pages (unknown → 404) via `IndustryView`; services listed from both link directions (D-022); empty main column dropped until content exists; sitemap 16 URLs, llms.txt industries section. Screenshots 375/1280 checked. 42 tests. (Docs landed in a follow-up commit.)
- 2026-10-27 · Go-live fixes · done — live site was rendering an empty Sanity dataset (Vercel had the project ID, nothing seeded); seeded `po34na24` (15 docs), verified local build against Sanity, redeployed (`26585b7`). Live home, services, industries, studio all 200. Found www cert missing (backlog). Replaced a stale 25-Oct local server on :3123.
- 2026-10-27 · IA review + copy · done — home restructured around the offer (D-024: deliverables panel, audiences, how we work, attributed track record, compact founder; new `homePage` singleton); all TODO copy drafted for approval (D-023, `sanity/seed/copy.ts`) incl. service deliverables; `pnpm seed` now fills empty/TODO fields only (filled 14 docs, created homePage, founder untouched); 1h revalidate backstop after stale fetch cache seen (D-025). Contrast check moved small text on field band to ivory. 47 tests.
- 2026-10-27 · Build step 7 — About + Publications · done — /about from client documents (aboutPage singleton; founder longBio, alumniOf, 20 expertise areas, 30 countries; Person JSON-LD); /publications with ItemList JSON-LD, noindex + out of sitemap while empty (D-026); FounderSpotlight removed; `pnpm seed` created aboutPage and filled 4 empty founder fields. Screenshots 375/1280 checked. 54 tests.
- 2026-10-27 · Build step 8 — Insights + logo evaluation · done — /insights index and /insights/[slug] (TOC from H2s, author box, related services via new article field, related articles, Article JSON-LD), noindex/out of sitemap until first article (D-027); shared `formatDate`. Logo: Recraft unavailable; PNG too small to trace well; recommend Canva SVG/PDF export (pdftocairo available) over a hand rebuild (D-027). 61 tests.
- 2026-10-27 · Build step 9 — Contact (simplified) · done — at Victor's request: one free Resend account, no domain/Turnstile/Sanity token (D-028). Server action + dependency-free validation, honeypot, 5/h rate limit, reply-to enquirer, PII-free logs; `?service=` preselect. Verified on a production build with JS off (field errors, Resend reached and rejected a fake key gracefully, honeypot dropped). 79 tests.
- 2026-10-27 · Build step 12 — legal, analytics, case studies · done — /privacy and /terms from new `legalPage` type (drafts seeded into Sanity), Vercel Analytics + Speed Insights in the site layout (+2 KB gz), /case-studies + detail filtered on written permission, noindex until first study; shared `toBlocks` seed helper. Sitemap 20 URLs. 84 tests.
- 2026-10-27 · Build step 13 — audit + logo candidate · done — Lighthouse (live, 4 pages), Puppeteer interaction checks 12/12, JSON-LD check 0 problems; added security headers, removed x-powered-by, fixed gold contrast, temporary favicon (D-030). Logo rebuilt from Jost 370 + Bodoni Moda display (fallback, Recraft unavailable) — candidate + brief in docs/brand/, not on the site.
