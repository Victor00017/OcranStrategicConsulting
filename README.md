# Ocran Strategic Consulting — website

Marketing site for **Ocran Strategic Consulting** (Tema, Greater Accra, Ghana) — a senior independent
consultancy in agriculture, livestock, agribusiness, and strategy/management consulting.

> From insights to strategy.

The site is SEO-first, content-managed in Sanity, and built to stay fast on mobile data in Ghana
and across Sub-Saharan Africa.

## Stack

| Concern         | Choice                                                              |
| --------------- | ------------------------------------------------------------------- |
| Framework       | Next.js (App Router) + TypeScript (strict)                          |
| Styling         | Tailwind CSS v4, tokens in `app/globals.css` via `@theme`           |
| CMS             | Sanity — embedded Studio at `/studio` (added in a later build step) |
| Hosting         | Vercel                                                              |
| Package manager | pnpm                                                                |

Full rationale and rules live in [`AGENTS.md`](./AGENTS.md). Do not introduce dependencies outside
that stack without a `docs/DECISIONS.md` entry.

## Getting started

Requires Node 22.12+ (Sanity 6 needs it; see `.nvmrc`) and pnpm (via `corepack` is fine).
