# AGENTS.md — Ocran Strategic Consulting website

Read this file fully before every task. It is the single source of truth for any AI coding agent
(DeepSeek via Cline/OpenCode, Claude, Copilot, etc.) working in this repo.

## 1. What we're building

A fast, SEO-first marketing site for **Ocran Strategic Consulting** (Tema, Greater Accra, Ghana) —
a senior independent consultancy in agriculture, livestock, agribusiness, and strategy/management consulting.

Tagline: **Transforming Businesses. Advancing Agriculture and Livestock. Delivering Sustainable Growth.**

Business goals, in priority order:
1. Win enquiries, contracts and partnerships (contact form, WhatsApp, booked calls).
2. Rank on Google/Bing (and AI search) for consulting queries in Ghana and Sub-Saharan Africa.
3. Capture leads via downloadable resources and showcase books (online book sales = Phase 2, see `docs/later/`).
4. Establish authority: founder profile, publications, insights, case studies.

Full content brief: `docs/PROJECT-BRIEF.md`. Design system: `docs/DESIGN.md`. SEO rules: `docs/SEO.md`.

## 2. Stack (do not swap without asking)

| Concern | Choice |
|---|---|
| Framework | Next.js (latest stable, App Router) + TypeScript (strict) |
| Styling | Tailwind CSS v4, tokens defined in `app/globals.css` via `@theme` (see DESIGN.md) |
| UI primitives | Hand-built components in `components/ui/`; shadcn/ui only for complex primitives (dialog, sheet, accordion) |
| CMS | Sanity (free plan), Studio embedded at `/studio` |
| Payments / orders | **Deferred to Phase 2** — do not build checkout, orders or paid downloads |
| Transactional email | Resend (contact form notifications, auto-replies, book download links) |
| Newsletter / lead magnets | Brevo (free) |
| Spam protection | Cloudflare Turnstile + honeypot field + basic rate limit |
| Analytics | Vercel Web Analytics + Speed Insights; Google Search Console; Bing Webmaster Tools |
| Hosting | Vercel (Pro plan or studio team — Hobby is non-commercial only) |
| Package manager | pnpm |

## 3. Commands

```bash
pnpm install
pnpm dev          # local dev on :3000
pnpm build        # must pass before any PR
pnpm lint
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest (unit) — add tests for lib/ and API routes
```

A task is not done until `pnpm lint && pnpm typecheck && pnpm build` all pass.

## 4. Project structure

```
app/
  (site)/                 # public pages, share <SiteHeader/> + <SiteFooter/>
    page.tsx              # Home
    about/  services/[slug]/  industries/[slug]/
    insights/  insights/[slug]/
    books/  books/[slug]/
    publications/  resources/  case-studies/[slug]/
    contact/
    privacy/  terms/  refunds/
  api/
    contact/route.ts      # POST: validate (zod) → Turnstile → Resend → save enquiry to Sanity
    subscribe/route.ts    # POST: Brevo sign-up for gated resources
    revalidate/route.ts   # Sanity webhook → revalidateTag
  studio/[[...tool]]/page.tsx
  sitemap.ts  robots.ts  opengraph-image.tsx  llms.txt/route.ts
components/
  ui/  sections/  seo/JsonLd.tsx
lib/
  sanity/ (client.ts, queries.ts, image.ts)
  seo.ts  email.ts  validation/
sanity/schemaTypes/        # CMS schemas — see PROJECT-BRIEF.md §4
docs/
.agents/skills/            # task playbooks — read the relevant SKILL.md before starting
```

## 5. Hard rules

- **Server Components by default.** Add `"use client"` only for interactivity (menu, forms, checkout button).
- **Every public route** exports `generateMetadata` (title, description, canonical, OG) via `lib/seo.ts`
  and renders JSON-LD via `<JsonLd/>`. See `.agents/skills/seo-page/SKILL.md`.
- **One `<h1>` per page.** Logical heading order. Semantic landmarks (`header`, `nav`, `main`, `footer`).
- **Images**: `next/image` with explicit `width`/`height` or `fill` + `sizes`; descriptive `alt`; AVIF/WebP.
  Never use AI-generated images showing fake signage, fake people or fake events as if real.
- **Performance budget** (many visitors on mobile data): LCP < 2.5s on 4G, JS per route < 120 KB gz,
  no client-side data fetching for content, fonts via `next/font` with `display: swap`, max 2 families.
- **Accessibility**: WCAG 2.2 AA. Gold text rules in DESIGN.md (logo gold fails AA for small text).
- **Books (Phase 1)**: book pages are a showcase. The CTA is "Enquire to order" → `/contact?topic=book&title=<slug>`
  (prefills the form). No prices charged online, no payment code.
- **Secrets** only in env vars (`.env.local`, Vercel env). Never commit them. See `.env.example`.
- **No personal data in code, docs, fixtures, seeds, logs or test data.** Contact emails/phone numbers live
  only in the Sanity `siteSettings` document and are read at build time. Use obviously fake data
  (`jane@example.com`, `+233000000000`) in tests. Logs must not include names, emails or phone numbers.
- **Content is the client's voice.** Do not invent claims, numbers, clients, testimonials, or case studies.
  If copy is missing, insert `{{TODO: copy needed — <what>}}` and list it in your summary.
- Don't add dependencies without stating why in the PR/summary. Prefer the platform and what's already installed.
- Keep components small (< 200 lines). Co-locate section components under `components/sections/`.

## 6. Conventions

- File names: kebab-case. Components: PascalCase exports. Hooks: `useX`.
- Data fetching: GROQ queries live in `lib/sanity/queries.ts`, typed with `defineQuery` + Sanity TypeGen.
- Revalidation: tag-based (`revalidateTag`) triggered by a Sanity webhook to `/api/revalidate`.
- Forms: React Hook Form + zod on the client, the **same zod schema** re-validated on the server.
- Styling: Tailwind utilities with design tokens only — no raw hex values in components.
- Commits: Conventional Commits (`feat:`, `fix:`, `content:`, `chore:`).

## 7. How to work (for agents)

1. Read this file, then `docs/PROGRESS.md` and `docs/DECISIONS.md`, then only the docs/skills the task needs.
2. Restate the task in 2–3 lines and list files you'll touch. If the task is ambiguous and expensive, ask.
3. Make the smallest change that fully solves it. Don't refactor unrelated code.
4. Run lint/typecheck/build. Fix what you broke.
5. Update `docs/PROGRESS.md` (and `docs/DECISIONS.md` for non-obvious choices) before finishing.
6. Finish with: what changed, files touched, any `{{TODO}}`s, and anything the human must do
   (env vars, Sanity content, DNS).

## 8. Skills index

| Task | Read |
|---|---|
| Any new page or route | `.agents/skills/seo-page/SKILL.md` |
| Visual/UI work | `.agents/skills/ocran-frontend-design/SKILL.md` + `docs/DESIGN.md` |
| CMS schemas / content types | `.agents/skills/sanity-content/SKILL.md` |
| Contact form / email | `.agents/skills/contact-and-email/SKILL.md` |
| Checking UI in a real browser (screenshots, flows) | `webapp-testing` (Anthropic, installed) |
| Pre-ship UI/accessibility audit | `web-design-guidelines` (Vercel, installed) |
| Before going live | `docs/SETUP.md` launch checklist |

Installed third-party skills are listed in `docs/SKILLS.md`. **Precedence when skills disagree:**
`docs/DESIGN.md` → `ocran-frontend-design` → `frontend-design` (Anthropic) → anything else.
Never pick a new font, colour or style direction because a general skill suggested it — DESIGN.md is fixed.
