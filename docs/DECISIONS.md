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
Only q5 (service count) is resolved — see D-005.

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
