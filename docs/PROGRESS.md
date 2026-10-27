# PROGRESS.md — living project state (the agent updates this every session)

## Current state

Steps 0–5 done. Home plus `/services` and six pre-rendered `/services/[slug]` pages (breadcrumbs, Service +
BreadcrumbList JSON-LD, FAQ accordion and related industries when the CMS has them, other-services links,
`?service=` contact prefill — D-021). Content from Sanity or the seed until the project exists (D-020). Sitemap and
llms.txt list the service pages. All checks green, 37 tests.

## Next up

Build plan item 6 — Industries index + `/industries/[slug]`, reusing `PageHeader`, `Breadcrumbs`, `Prose`. Industry
summaries are `{{TODO}}` like services. Add the routes to `STATIC_ROUTES`/sitemap.

## Build plan

- [x] 0. Scaffold: Next.js (App Router, TS strict) + Tailwind v4 + pnpm, ESLint, Prettier, Vitest; tokens + fonts from DESIGN.md; scripts `lint`, `typecheck`, `test`
- [x] 1. Base layout: SiteHeader (mobile sheet menu), SiteFooter, Container, Button, Eyebrow, SectionHeading, skip link, 404; start docs/COMPONENTS.md
- [x] 2. Sanity: embedded Studio at /studio, all schemas (sanity-content skill), singletons, typegen, /api/revalidate
- [x] 3. SEO foundation: lib/seo.ts, <JsonLd/>, sitemap, robots, llms.txt, OG image template
- [x] 4. Home page sections (design reviewed by Claude before replicating patterns)
- [x] 5. Services index + /services/[slug]
- [ ] 6. Industries index + /industries/[slug]
- [ ] 7. About (founder, credentials, countries) + Publications
- [ ] 8. Insights list + article page (portable text, TOC, related, author box)
- [ ] 9. Contact form + /api/contact + emails (contact-and-email skill)
- [ ] ~~10. Resources + Brevo gated downloads~~ — on hold (D-016)
- [ ] ~~11. Books showcase + "Enquire to order" → prefilled contact form~~ — on hold (D-016)
- [ ] 12. Case studies, legal pages (privacy/terms), analytics
- [ ] 13. Audit: web-design-guidelines, webapp-testing screenshots, Lighthouse, Rich Results, security headers → fix
- [ ] 14. Handover docs: docs/EDITOR-GUIDE.md (how Jonathan edits content in Studio, plain language) + README deploy notes

## Backlog (noticed, not scheduled)

Strategy-level:

- On hold (D-016): books showcase + online sales, `/resources` + gated downloads, `/refunds`. Restore guide: `docs/later/held-features.md` (do not open during Phase 1 work)
- Install the three third-party skills in `docs/SKILLS.md` (human: review each SKILL.md first). Until then the agent cannot use `webapp-testing` / `web-design-guidelines`.
- French version for francophone West Africa (pending client decision)

Findings from doc review — operational, will recur if forgotten:

- **JS budget (AGENTS.md §5: < 120 KB gz per route) is not met and needs a defined measurement.** Summing every script the
  home page loads (gzip -9): Next 15 baseline 137 KB, now 176 KB after Next 16 / React 19.3 + header client code. Next 15's
  own "First Load JS" said 101 KB for the same baseline because it counts fewer files; Next 16 no longer prints sizes.
  Sanity is not in public chunks (Studio is ~1.9 MB gz, `/studio` only). Step 13: agree the metric (Lighthouse "total
  JS transferred" is a good one), then trim — e.g. move the mobile menu into a smaller client island.
- **Local Node default is 20** (nvm) but the project needs ≥ 22.12. Run `nvm install 22 && nvm alias default 22`, or
  `nvm use` in this folder (reads `.nvmrc`). Under Node 20, `pnpm typegen` refuses to run.

- **`public/brand/logo-reference.png` is raster.** Needs an SVG from the client (brief §7 q1) before it is used at multiple sizes — favicon, header, footer watermark.
- **`docs/EDITOR-GUIDE.md` does not exist yet** but is referenced by build step 14. That step must _create_ it.
- **`docs/DEEPSEEK.md` §1 model table needs verifying** against the DeepSeek console (`deepseek-flash` / `deepseek-v4-pro`, and the "Oct 2026" date). Do not configure a model from that table until confirmed.
- **Ghana DPC registration** — confirm whether the business must register with the Data Protection Commission (`docs/SETUP.md` §9). Human task, not code.
- **Namecheap default parking records** must be deleted before Vercel DNS goes live (`docs/SETUP.md` §2). Human task.

## Content TODOs (waiting on client)

See docs/PROJECT-BRIEF.md §7 open questions. Agent: add `{{TODO}}` items here as you create them.

- Summaries for the 6 services and 7 industries — seeded as `{{TODO}}` markers (required fields; shown from steps 5–6).
- Approve or replace: home section headings ("What we do", "Sectors we serve", "Start a conversation"), hero eyebrow
  ("Strategic consulting · Tema"), home meta description (built from brief facts, 157 chars) — D-020.
- Uncropped founder portrait for the rectangular hero frame (D-019).
- `/services` introduction (1–2 sentences) — `{{TODO}}` on the page. Index meta description built from brief facts
  (158 chars) — approve. Three service titles push the page title past 60 characters ("… | Ocran Strategic
  Consulting"); set a shorter **Search title** in Studio for those, or accept the truncation.
- Per service, when available: page content, client outcomes, FAQs, related industries.
- Vector monogram/logo (brief §7 q1) — then add it to the OG image template and favicon. The Canva PNG supplied is
  identical to `public/brand/logo-reference.png`; ask for Canva's **SVG** download.
- **Confirm "30 countries"**: the Detailed Profile's list reaches 30 only by counting Zanzibar (part of Tanzania).
  Either confirm, or use "30 countries and territories" before launch.
- Typo in the Detailed Profile: "referred journal papers" → "refereed" (fix when it goes on the About page).
- Missing attachments referenced by the Website Structure doc: the 5 articles (step 8), "Consulting Profile —
  Jonathan Nyarko Ocran", proposal template / toolkits / diagnostic tools (on hold, D-016), work samples (step 12).
- Books section lists "Feasibility Study Reports and Business Plans" and "Thought Leadership" — should these appear
  on /publications while books are on hold?
- About page (step 7): Detailed Profile has the career bio, 21 expertise areas and the 30 named countries; the
  Website doc has company story, mission, vision, values — Sanity has no fields for the last four yet.

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
