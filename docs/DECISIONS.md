I # DECISIONS.md — decision log (append-only; newest at the bottom)

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
Not a decision to build on — a rule about what *not* to decide. `docs/PROJECT-BRIEF.md` §7 lists q1–q13 (logo variant/SVG, tagline wording, "I" vs "We" voice, mission scope, industry count, book details, Paystack registration, case-study permissions, photography, gated-vs-free resources, French version, the actual articles/toolkits). Do not record a guess here to unblock a build. Use `{{TODO}}` and, if a question blocks a design choice, stop and ask.
Only q5 (service count) is resolved — see D-005.
