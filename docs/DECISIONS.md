# DECISIONS.md — decision log (append-only; newest at the bottom)

Format: `## D-NNN · YYYY-MM-DD · Title` → Decision · Why · Alternatives considered · Revisit if

## D-001 · 2026-10-25 · Stack

Decision: Next.js App Router + TS + Tailwind v4, Sanity CMS, Vercel, Resend, Brevo, Turnstile.
Why: SEO-first static generation, client can edit content himself, free tiers cover launch.
Alternatives: Webflow/Framer (faster, weaker for custom forms and gated downloads); Keystatic (git-based CMS, harder for a non-technical editor).
Revisit if: client wants to self-manage layout, not just content.

## D-002 · 2026-10-25 · Online book sales deferred to Phase 2

Decision: no checkout, orders DB or paid downloads at launch. Books are a showcase with "Enquire to order".
Why: ship the lead-generation site first; Paystack activation is slow.
Revisit if: Paystack account is active and book details (format, price, fulfilment) are confirmed.

## D-003 · 2026-10-25 · Design source of truth

Decision: docs/DESIGN.md → ocran-frontend-design skill → Anthropic frontend-design → others.
Why: avoid conflicting design skills; brand built from the gold monogram.
Revisit if: client changes the official logo/brand.

## D-004 · 2026-10-25 · No personal data in the repo

Decision: contact details live only in the Sanity `siteSettings` document; tests use fake data.
Why: privacy, and the coding model's API is a third-party service.

## D-005 · 2026-10-25 · Six service lines, not five

Decision: ship six service lines — Strategy & Management Consulting; Agribusiness Advisory Services; SME Development & Business Growth; Project Development & Fundraising; Research & Policy Advisory; Training & Capacity Building.
Why: the sitemap sketched five, but the client's positioning document lists six. PROJECT-BRIEF §7 q5 resolves it: "Assume 6". Following the client's source material beats following our own summary of it.
Alternatives: five (matches the earlier sitemap sketch, but silently drops a revenue line the client actually offers).
Revisit if: client confirms five, or adds more.

## D-006 · 2026-10-25 · shadcn/ui limited to dialog, sheet, accordion

Decision: UI primitives are hand-built in `components/ui/`. shadcn/ui is permitted only for dialog, sheet and accordion (mobile menu, FAQ).
Why: DESIGN.md is specific — 2px radius, hairline borders, no heavy shadows. Library defaults fight that, and undoing them costs more than writing the component.
Alternatives: full shadcn adoption (fast start, then permanent restyling friction); Radix directly (good, but shadcn already wraps it for the three primitives we want).
Revisit if: we need tables, comboboxes, toasts or a date picker — then add the shadcn skill deliberately (see docs/SKILLS.md).

## D-007 · 2026-10-25 · Only three third-party skills

Decision: install `frontend-design` (Anthropic), `webapp-testing` (Anthropic), `web-design-guidelines` (Vercel). Nothing else.
Why: overlapping design skills give contradictory instructions, and style-engine skills propose their own palettes/fonts. We already have a direction; what we lack is baseline taste, a pre-ship audit and a real browser.
Alternatives: full skill collections (UI UX Pro Max, Interface Design, Impeccable, AgentsKit) — see the "Skipped" table in docs/SKILLS.md for why each is out.
Revisit if: we need app-style motion (add `review-animations`) or move beyond three shadcn primitives.

## D-008 · 2026-10-25 · Never invent content; mark gaps with {{TODO}}

Decision: no invented claims, numbers, clients, testimonials, case studies, prices or credentials. Missing copy becomes `{{TODO: copy needed — <what>}}` and is listed in the session summary.
Why: credibility is the product. A fabricated statistic or testimonial is a liability that can go live unnoticed.
Alternatives: lorem ipsum in components (invisible in review, and it ships); plausible-looking placeholder numbers (worse — they look real).
Revisit if: never. If this is ever softened, the site loses its main defence against fabrication.

## D-009 · 2026-10-25 · Vercel Pro, not Hobby

Decision: deploy on a Vercel Pro team (client's or the studio's).
Why: Hobby is non-commercial only under Vercel's fair-use terms; this is a business site.
Alternatives: Cloudflare Workers/Pages or Netlify (documented zero-budget fallbacks in docs/SETUP.md §1).
Revisit if: budget is strictly zero — switching hosts needs its own entry here.

## D-010 · 2026-10-25 · DNS at Namecheap; mail via Zoho or Gmail forwarding

Decision: keep Namecheap BasicDNS. Try Zoho Mail Forever Free; if unavailable in-region, forward `info@`/`jnocran@` to Gmail and send as the company address over Resend (or Brevo) SMTP. Resend verifies on a `send.` subdomain so it does not collide. One SPF record at root; DMARC starts at `p=none` and tightens to `quarantine` after four clean weeks.
Why: no DNS migration, a free-email fallback always exists, and transactional mail coexists with human mail without MX conflicts.
Alternatives: move DNS to Cloudflare or Vercel (cleaner, but more to maintain and the forwarding fallback disappears); Google Workspace (professional, ~US$7/user/mo).
Revisit if: Zoho free tier disappears and Gmail "send mail as" proves too fiddly for the client.

## Standing constraint · client open questions are unanswered by design

Not a decision to build on — a rule about what _not_ to decide. `docs/PROJECT-BRIEF.md` §7 lists q1–q13 (logo variant/SVG, tagline wording, "I" vs "We" voice, mission scope, industry count, book details, Paystack registration, case-study permissions, photography, gated-vs-free resources, French version, the actual articles/toolkits). Do not record a guess here to unblock a build. Use `{{TODO}}` and, if a question blocks a design choice, stop and ask.
Resolved so far: q5 (D-005); q2, q3, q6 and q10 in part (D-019).

## D-011 · 2026-10-25 · pnpm build-script approvals live in `pnpm-workspace.yaml`

Decision: record the allowlist of native post-install builds (`@tailwindcss/oxide`, `esbuild`, `sharp`, `unrs-resolver`) in `pnpm-workspace.yaml` under `allowBuilds` (a package→bool map). Not `package.json`, and not `onlyBuiltDependencies`.
Why: pnpm v12 no longer reads the `pnpm` field in `package.json`, and it ignored `onlyBuiltDependencies` (parsed, but still blocked the builds). `allowBuilds` in `pnpm-workspace.yaml` is the location pnpm 12 actually reads — verified with `pnpm config get allowBuilds`. These four are legitimate native/engine builds; without them Tailwind, Vitest and next/image fail at runtime.
Alternatives: `pnpm approve-builds` interactive (not reproducible in CI or for the next agent); blanket-allowing all builds (a supply-chain risk we don't want).
Revisit if: pnpm changes the config key again — re-run `pnpm config get allowBuilds` when bumping pnpm.

## D-012 · 2026-10-25 · `lint` runs the ESLint CLI, not `next lint`

Decision: `package.json` `lint` script is `eslint .` (flat config using `next/core-web-vitals` + `next/typescript` via `FlatCompat`). Not `next lint`.
Why: `next lint` prints a deprecation warning and is removed in Next.js 16. The DoD requires a durable lint command; switching now avoids a breakage on the next major upgrade. The rule set is the same either way.
Alternatives: keep `next lint` (works on 15, breaks on 16); migrate later with the codemod (extra churn).
Revisit if: Next changes the recommended ESLint setup.

## D-013 · 2026-10-25 · Vitest + Testing Library added at scaffold

Decision: add `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/{react,dom,jest-dom}` as devDependencies, with `vitest.config.ts` (jsdom env, `@/` alias, setup file) and `vitest.setup.ts` loading the jest-dom matchers.
Why: build step 0's DoD requires `pnpm test` to run Vitest with a passing smoke test, and AGENTS.md §3 lists `pnpm test` as a first-class command. This is the standard, minimal set for React unit testing — not a deviation from the AGENTS.md §2 stack.
Alternatives: no tests at scaffold (fails the DoD); Jest (heavier config, and AGENTS.md already names Vitest).
Revisit if: we move to a different test runner.

## D-014 · 2026-10-27 · `typecheck` regenerates route types first

Decision: `package.json` `typecheck` is `next typegen && tsc --noEmit`, not bare `tsc --noEmit`.
Why: `tsconfig.json` includes `.next/types/**`, which Next only refreshes on build/dev. After moving `app/page.tsx` into `app/(site)/`, stale generated types made typecheck fail on code that was correct. `next typegen` (Next 15.5+) rebuilds them in about a second, so typecheck no longer depends on having built first.
Alternatives: delete `.next` before typecheck (slower dev loop); drop `.next/types` from `include` (loses typed routes/props checks).
Revisit if: Next changes how route types are generated.

## D-015 · 2026-10-27 · Mobile menu is a native `<dialog>`; desktop nav from `lg`

Decision: the SiteHeader mobile sheet uses the native `<dialog>` element (`showModal()`), not shadcn's Sheet. The desktop nav and header Contact button appear from `lg` (1024px); below that the menu button shows.
Why: `<dialog>` gives focus trapping, Escape-to-close, inert background and a backdrop with zero JS dependencies, keeping the shared bundle at 101 kB. D-006 _permits_ shadcn for a sheet but doesn't require it. At `md` (768px) the five nav links plus the Contact button forced the wordmark onto two lines.
Alternatives: shadcn Sheet (adds Radix dialog to every page's JS); keep `md` and shrink the wordmark (fights DESIGN.md typography).
Revisit if: the menu needs nested sections or animation that `<dialog>` handles badly.

## D-016 · 2026-10-27 · Books and gated downloads on hold for Phase 1

Decision: hold all book features (no `/books` pages, no `book` schema, Books out of the nav; online sales were already deferred by D-002), email-gated resource downloads (no `/resources`, `resource` schema, `/api/subscribe`, Brevo or signed download links) and `/refunds`. Books can still appear as `publication` entries. Everything removed is listed in `docs/later/held-features.md` so it can be restored.
Why: client decision (2026-10-27) to launch as a lead-generation consultancy site first. With no payments there is nothing to refund, and the resource content (brief §7 q12) does not exist yet.
Alternatives: keep a books showcase with "Enquire to order" (the previous plan); keep resources as plain free downloads.
Revisit if: the client confirms book details (brief §7 q7) or has resources ready to publish — follow `docs/later/held-features.md`.

## D-017 · 2026-10-27 · Next 16 + current Sanity; Studio builds before the project exists

Decision: upgrade Next 15.5.4 → 16.4.3 and React 19.1.1 → 19.3.1, then add `sanity` 6.20, `next-sanity` 13.4, `@sanity/vision`, `@sanity/image-url`, `@sanity/client` 8 and `styled-components` (all pinned). Node ≥ 22.12 (`engines`, `.nvmrc`). Sanity env is optional at build time: `sanity/env.ts` exposes `isSanityConfigured`, `/studio` shows setup instructions until a project ID is set, and `sanityFetch` throws a clear error only when a page actually fetches.
Why: current `next-sanity` requires Next 16 / React ≥ 19.2.3; staying on Next 15 meant starting on Sanity a major version behind. Next 15.5.4 / React 19.1.1 also carried the December 2025 React Server Components RCE (CVE-2025-55182). AGENTS.md §2 already asks for the latest stable Next. Sanity 6's CLI requires Node 22.12. The Sanity project didn't exist yet and the client chose to connect it later.
Side effects: ESLint moved to `eslint-config-next`'s native flat config (`@eslint/eslintrc`/FlatCompat removed). React 19's `react-hooks/set-state-in-effect` rule flagged the header's "close menu on route change" effect; it now adjusts state during render. `revalidateTag` takes a second argument in Next 16; the webhook passes `{ expire: 0 }` so the next visit gets fresh content. `@sanity/workflow-blueprint` (transitive) wants TypeScript ≥ 6 — harmless peer warning; revisit when upgrading TS.
Alternatives: Next 15.5.28 + `next-sanity` 11 / `sanity` 5 (less change now, same upgrade later); fail the build without Sanity env (blocks CI and work before the client creates the project).
Revisit if: a Sanity major drops Node 22 or the JS budget work (Backlog) needs a different framework setting.

## D-018 · 2026-10-27 · SEO foundation choices

Decision: (1) `sitemap.xml` and `llms.txt` list only routes that exist (`STATIC_ROUTES` in `lib/seo.ts`); Sanity-driven routes join the sitemap as their pages ship. (2) `buildMetadata` always sets an OG/Twitter image, defaulting to `/opengraph-image`. (3) The OG template uses WOFF copies of Bodoni Moda 500 and Jost 500 committed in `assets/fonts/` (Fontsource 5.3.0, OFL licences alongside). (4) The home page is the bare host (`https://www.ocranstrategicconsulting.com`, no trailing slash) everywhere, matching Next's canonical output.
Why: (1) a sitemap of 404s wastes crawl budget and signals a broken site — the nav already links to pages that don't exist yet. (2) A page's `openGraph` replaces the parent's wholesale in Next, which silently dropped the share image on the home page. (3) Next's OG renderer can't use next/font's WOFF2, and fetching Google Fonts during every build is fragile. (4) One spelling per URL.
Alternatives: list every planned route now; fetch fonts at build time; per-page OG images for every route now (no page content yet).
Revisit if: the client supplies a vector monogram — add it to `renderOgImage` (DESIGN.md §5).

## D-019 · 2026-10-27 · Client answers: tagline, voice, industries, portrait

Decision: tagline is **"From insights to strategy."** (replaces "Transforming Businesses. Advancing Agriculture and Livestock. Delivering Sustainable Growth." everywhere); site voice is **"we"**; industries are the **7-item list** (Agriculture · Livestock · Agribusiness · Development Organisations · SMEs · Light Manufacturing · Public Sector — no Retail); the supplied founder portrait is used as a **circle with an offset gold ring** until an uncropped original arrives.
Why: answered by the client via Victor on 2026-10-27 (brief §7 q2, q3, q6, q10). The portrait arrived pre-cropped to a circle on black, so the rectangular gold-frame hero in the frontend skill isn't possible yet; corners were filled ivory in `public/images/founder/founder-portrait.jpg`.
Revisit if: the uncropped photo arrives — switch the hero to the rectangular offset frame.

## D-020 · 2026-10-27 · Home content: seed file doubles as fallback; proof points in Sanity

Decision: `sanity/seed/content.ts` holds the brief's starter content in the exact `HOME_QUERY_RESULT` shape. The home page renders from Sanity when configured, from the seed otherwise; `pnpm seed` imports the same file (createIfNotExists, fixed IDs, never overwrites). Proof points are a new `siteSettings.proofPoints` list (value + label, max 4); services and industries gained an `order` field so the brief's order survives. Section headings on the home page are neutral labels ("What we do", "Sectors we serve", "Start a conversation") and the home meta description is built only from brief facts — both listed in Content TODOs for client approval.
Why: the client chose to connect Sanity later but wanted the design reviewable now; one file avoids the seed and the fallback drifting. Proof points must be client-editable (publication count changes). A test keeps the header/footer slugs equal to the seed slugs.
Alternatives: hard-code home content in components (drifts from the CMS); show an empty page until Sanity is connected.
Revisit if: Sanity is connected in production — the fallback then only matters for local work without env vars.

## D-021 · 2026-10-27 · Service pages: native FAQ accordion, `?service=` contact prefill, TODO-free JSON-LD

Decision: (1) FAQs use native `<details>/<summary>` instead of the shadcn accordion D-006 allows. (2) Every "Request a consultation" link on a service page goes to `/contact?service=<slug>`; build step 9 must read that parameter to preselect "Service of interest". (3) Text still holding a `{{TODO}}` marker is left out of JSON-LD (`hasTodo` in `lib/seo.ts`), though it stays visible on the page and in the meta description so it can't be missed. (4) Service pages link to all other services, since related industries and articles don't exist yet.
Why: (1) zero JS, built-in keyboard and screen-reader behaviour, and no Radix in the bundle. (2) The brief's books flow used the same prefill pattern; one convention for all enquiries. (3) Structured data is read by machines that won't flag a placeholder — a TODO there could get indexed silently. (4) The seo-page skill asks for internal links on every service page.
Revisit if: FAQs need "only one open at a time" (then use the `name` attribute on `<details>`, still no JS).

## D-022 · 2026-10-27 · Service ↔ industry links work from either side

Decision: an industry page lists its own `relatedServices` plus every service whose `relatedIndustries` names it (`servedBy` in `INDUSTRY_QUERY`, merged without duplicates by `servicesForIndustry`). Industry pages are also tagged `service` so editing a service refreshes them.
Why: the editor is non-technical; asking him to record each link twice (on the service and on the industry) guarantees they drift. One link in either document now shows on the industry page.
Alternatives: one-way links only (half the pages stay unlinked); a Studio plugin for bidirectional references (extra dependency for a GROQ one-liner).
Revisit if: service pages should also show industries that reference them — same `references(^._id)` pattern.

## D-023 · 2026-10-27 · Agent may draft descriptive copy for client approval (amends D-008)

Decision: at Victor's request, the agent drafts the copy that was `{{TODO}}` — service and industry summaries, deliverables ("What you receive"), intended outcomes, FAQs, sector challenges, page introductions, the home "how we work" steps. Drafts live in `sanity/seed/copy.ts`, separate from the client's facts in `content.ts`, and are listed in PROGRESS "Content TODOs" for sign-off. D-008 still holds for facts: no numbers, clients, testimonials, results, credentials or guarantees that aren't in the client's documents.
Why: a site full of `{{TODO}}` markers can't be reviewed or launched, and the client's documents describe what each service is but not how to present it. Describing deliverables and common sector challenges is the consultant's own field, not a factual claim.
Revisit if: the client rewrites the copy in the Studio — `pnpm seed` never overwrites it.

## D-024 · 2026-10-27 · Home page rebuilt around the offer; track record attributed to the founder

Decision: home order is hero (tagline + value proposition + "What we deliver" panel) · Who we work with (brief §2 audiences, each CTA prefilling a service) · Services · How we work (Insight → Strategy → Delivery) · Track record (proof numbers + four results from the Detailed Profile on the field-green band) · Sectors · compact founder strip · Insights · CTA. The portrait leaves the hero; the credentials list leaves the home page for About. New `homePage` singleton holds deliverables, audiences, process and track record. Each result names where it happened (MoFA, CSIR, OcranConsult, AU Commission) and the section says they are the founder's career results.
Why: the home page read as an About page — a first-time visitor saw a person and his career before learning what the firm does for them (IA review, 2026-10-27). The firm started in 2026, so presenting earlier results as the firm's own would fail a client's check. Small text on the field band uses ivory: gold-light is 4.16:1 there, under AA.
Revisit if: the firm has its own case studies — they lead the track record; the uncropped portrait arrives — it belongs on About, not back in the hero.

## D-025 · 2026-10-27 · One-hour revalidation backstop on every Sanity fetch

Decision: `sanityFetch` caches with tags **and** `revalidate: 3600`.
Why: with tag-only caching, a fetch cached before content changed stays stale until the webhook fires — seen locally when the services/industries indexes kept serving `{{TODO}}` summaries after `pnpm seed`, and the webhook is not set up on Vercel yet. One hour bounds the damage of a missing or failed webhook; the webhook still makes edits near-instant.
Revisit if: build or Sanity API usage becomes a cost concern (raise the interval), or edits must never wait (keep the webhook healthy).

## D-026 · 2026-10-27 · About from the client's documents; Publications hidden from search until filled

Decision: /about is built only from the client's documents — company story, mission, vision, values (Website Structure doc, new `aboutPage` singleton) and the founder's full career text, education, 20 expertise areas and 30 named countries (Detailed Profile, `sanity/seed/profile.ts`) — with `Person` JSON-LD (`@id …/about#founder`, alumniOf, hasCredential, knowsAbout, worksFor). /publications renders the CMS list (with `ItemList` JSON-LD, journal articles as `ScholarlyArticle`), but while it has no entries it shows a short note, is `noindex, follow`, and is left out of the sitemap. `FounderSpotlight` was removed (replaced by `FounderStrip` on home and the About layout).
Why: the 43 publications haven't been supplied; the footer already links to /publications, so a 404 was worse than an honest empty state, and an empty page in Google's index would be worse still.
Revisit if: the publication list arrives — add entries in the Studio; the page indexes itself and joins the sitemap on the next refresh.

## D-027 · 2026-10-27 · Insights built ahead of content; logo SVG comes from Canva, not a trace

Decision: (1) /insights and /insights/[slug] follow D-026 — the index is `noindex` and out of the sitemap until the first article exists; articles get breadcrumbs, a table of contents built from their H2s (`lib/portable-text.ts`, ids shared with `Prose`), an author box (founder), "How we can help" links from a new `relatedServices` field (seo-page skill), up to two related articles (same category first) and `Article` JSON-LD crediting `…/about#founder`. The brief's category filter is deferred until there are enough articles to filter. (2) Logo: request the client's Canva export (SVG on Canva Pro, or **PDF Print** on the free plan → `pdftocairo -svg`, installed here) instead of tracing `logo-reference.png`.
Why: (1) the 5 articles haven't been supplied; the nav already links to Insights. (2) The PNG is 500×500 with the mark only ~95 px tall — an automatic trace loses the Didone hairlines and the S/O knockout. Recraft (design-assets skill's first choice) isn't connected in this environment. A hand rebuild (Jost wordmark + Bodoni Moda S/O) is the fallback, but it would be a redraw of the brand mark needing client approval.
Revisit if: the Canva export can't be obtained — then rebuild, and show light/dark renders for approval before use.

## D-028 · 2026-10-27 · Simple contact form: one Resend account, no domain, no Turnstile, no SDKs

Decision: /contact is a server-action form — name, email, message required; phone and service optional (service preselected from `?service=`, D-021). It emails `CONTACT_TO_EMAIL` through Resend's REST API (no SDK) from Resend's shared `onboarding@resend.dev` sender, with reply-to set to the enquirer. Spam: hidden honeypot (bots get a fake success) + in-memory limit of 5 per IP per hour. Validation is one dependency-free module (`lib/validation/contact.ts`); the browser's own `required`/`type` checks do the client side. Logs carry an event id and outcome only. Deferred: Turnstile, auto-reply to the enquirer, saving enquiries to Sanity. Amends AGENTS.md §2 (spam, email) and §6 (RHF + zod).
Why: Victor asked for the simplest working version — the consultant has no mail domain yet, and extra accounts (Cloudflare, a Sanity write token) and libraries weren't worth it before launch. Resend's shared sender delivers only to the account owner, which is exactly the consultant's inbox. A plain form POST to a server action works without JavaScript — verified end to end on a production build.
Alternatives: Web3Forms/Formspree (no key on our side, but enquiries go browser → third party with their limits); Gmail SMTP with an app password (needs nodemailer and a personal mailbox's credentials in env).
Revisit if: spam gets through (add Turnstile); the mail domain is verified (set `EMAIL_FROM`, add auto-reply); the client wants enquiries in the Studio (add `SANITY_API_WRITE_TOKEN` and save an `enquiry`). Note the rate limit is per serverless instance, so it's a speed bump, not a wall.

## D-029 · 2026-10-27 · Legal pages, analytics and case studies (build step 12)

Decision: (1) /privacy and /terms come from a new `legalPage` type in Sanity, seeded with plain-language DRAFTS (`sanity/seed/legal.ts`) that describe only what the site really does — contact form via Resend (D-028), cookie-free Vercel statistics, Sanity for content — and cite Ghana's Data Protection Act, 2012 (Act 843) and Ghanaian governing law. They are not legal advice and are listed for review. (2) `@vercel/analytics` 2.0.1 and `@vercel/speed-insights` 2.0.0 in the public-site layout only (not /studio): +2 KB gz on the home page, no cookies. (3) /case-studies and /case-studies/[slug] list only studies with `permissionConfirmed == true` (enforced in the GROQ, not just the Studio), with `Article` JSON-LD; the index is `noindex` and out of the sitemap until the first one is published (same rule as D-026/D-027). The /refunds link stays removed (D-016).
Why: Ghana's Act 843 and basic trust need a privacy notice before the site is promoted; the client has no lawyer-drafted text yet, so an accurate draft beats a placeholder. AGENTS.md §2 already named Vercel analytics. The footer linked to /case-studies, which 404'd.
Revisit if: a lawyer supplies text (edit in the Studio, update "Last updated"); Turnstile, Brevo, Paystack or saved enquiries are added — the privacy notice must then list them.

## D-030 · 2026-10-27 · Pre-launch audit (build step 13): fixes and accepted gaps

Decision: fixed — (1) baseline security headers on every route (`nosniff`, `strict-origin-when-cross-origin`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, a Permissions-Policy denying camera/mic/geolocation/topics) and `poweredByHeader: false`; HSTS already comes from Vercel; (2) small gold numerals on service pages moved to `gold-text` (Lighthouse contrast failure; brand `gold` is only for ≥24 px, DESIGN.md §1); (3) a TEMPORARY favicon (`app/icon.tsx`, gold Bodoni "O") to stop the `/favicon.ico` 404 until the logo is approved. Accepted for now — Lighthouse mobile performance 79–83 (target 90): LCP 1.5–2.4 s and CLS 0 are within budget, but 500–830 ms total blocking time comes from framework JavaScript (react-dom 63 KB + Next router 44 KB gz), not from our code; no full CSP (would need per-request nonces and make static pages dynamic). Logo rebuild candidate saved to `docs/brand/` as a proposal only.
Why: verified, not assumed — Lighthouse 13.5 on the live site (4 pages), Puppeteer keyboard/interaction checks (skip link, mobile menu focus + Escape + scroll unlock, contact-form error focus/aria, headers: 12/12 pass), and a JSON-LD required-field check on 6 pages (0 problems). Accessibility 100 on home/about/contact, SEO 100 everywhere.
Revisit if: real-user Speed Insights (now enabled) show poor INP/TBT on actual Ghanaian devices — then consider moving the header's scroll effect to CSS, lazy-loading analytics, or React Compiler; Google's Rich Results Test (needs the public URL) flags anything; the logo is approved (replace favicon + OG mark).
