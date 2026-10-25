# PROGRESS.md — living project state (the agent updates this every session)

## Current state
Repo not scaffolded yet. Planning docs, design system and skills are in place.

## Next up
Build plan item 0 — scaffold.

**Definition of done for step 0** (a task is not done until all of these hold):
- `pnpm install && pnpm dev` serves a placeholder page at `localhost:3000`
- `pnpm lint`, `pnpm typecheck`, `pnpm build` all exit 0
- `pnpm test` runs Vitest with at least one passing smoke test
- `app/globals.css` defines every token from `docs/DESIGN.md` §1 via `@theme`; zero raw hex in components
- Bodoni Moda + Jost loaded via `next/font`, `display: swap`, max 2 families
- `README.md` rewritten so it describes this repo, not the "drop these files in" kit
- No dependency beyond the `AGENTS.md` §2 stack without a `DECISIONS.md` entry

## Build plan
- [ ] 0. Scaffold: Next.js (App Router, TS strict) + Tailwind v4 + pnpm, ESLint, Prettier, Vitest; tokens + fonts from DESIGN.md; scripts `lint`, `typecheck`, `test`
- [ ] 1. Base layout: SiteHeader (mobile sheet menu), SiteFooter, Container, Button, Eyebrow, SectionHeading, skip link, 404; start docs/COMPONENTS.md
- [ ] 2. Sanity: embedded Studio at /studio, all schemas (sanity-content skill), singletons, typegen, /api/revalidate
- [ ] 3. SEO foundation: lib/seo.ts, <JsonLd/>, sitemap, robots, llms.txt, OG image template
- [ ] 4. Home page sections (design reviewed by Claude before replicating patterns)
- [ ] 5. Services index + /services/[slug]
- [ ] 6. Industries index + /industries/[slug]
- [ ] 7. About (founder, credentials, countries) + Publications
- [ ] 8. Insights list + article page (portable text, TOC, related, author box)
- [ ] 9. Contact form + /api/contact + emails (contact-and-email skill)
- [ ] 10. Resources + Brevo gated downloads
- [ ] 11. Books showcase + "Enquire to order" → prefilled contact form
- [ ] 12. Case studies, legal pages (privacy/terms), analytics
- [ ] 13. Audit: web-design-guidelines, webapp-testing screenshots, Lighthouse, Rich Results, security headers → fix
- [ ] 14. Handover docs: docs/EDITOR-GUIDE.md (how Jonathan edits content in Studio, plain language) + README deploy notes

## Backlog (noticed, not scheduled)

Strategy-level:
- Phase 2: online book sales (`docs/later/paystack-books.md` — do not open during Phase 1 work)
- French version for francophone West Africa (pending client decision)

Findings from doc review — operational, will recur if forgotten:
- **`.env.example` cannot be read by the agent** (blocked as a security concern). Before steps 2, 9 and 10, have the human paste the variable *names* (never values) so the agent knows what already exists.
- **`public/brand/logo-reference.png` is raster.** Needs an SVG from the client (brief §7 q1) before it is used at multiple sizes — favicon, header, footer watermark.
- **`docs/COMPONENTS.md` and `docs/EDITOR-GUIDE.md` do not exist yet** but are referenced by build steps 1 and 14. Step 1 must *create* `COMPONENTS.md`, not edit it.
- **`docs/SKILLS.md` conflicts with `AGENTS.md` §8.** SKILLS.md line 11 says design guidance runs "below our own skill in precedence" and lists two of the four project skills as reusable templates, while §8 names only three installed skills and omits `sanity-content` and `contact-and-email` from its table. Needs one consistency pass.
- **`docs/DEEPSEEK.md` §1 model table needs verifying** against the DeepSeek console (`deepseek-flash` / `deepseek-v4-pro`, and the "Oct 2026" date). Do not configure a model from that table until confirmed.
- **Ghana DPC registration** — confirm whether the business must register with the Data Protection Commission (`docs/SETUP.md` §9). Human task, not code.
- **Namecheap default parking records** must be deleted before Vercel DNS goes live (`docs/SETUP.md` §2). Human task.
- **Repo is not under version control.** Run `git init` before step 0 so each green step is one commit.

## Content TODOs (waiting on client)
See docs/PROJECT-BRIEF.md §7 open questions. Agent: add `{{TODO}}` items here as you create them.

## Session log
<!-- one line per session: YYYY-MM-DD · task · result (done / partial / blocked: why) -->
- 2026-10-25 · Doc consolidation + restore · done — kit collapsed to `ocran-kit-2`; SESSION-PROMPT.md now holds the real prompt; D-005–D-010 + standing constraint restored; backlog findings and step-0 DoD restored. No code touched.
