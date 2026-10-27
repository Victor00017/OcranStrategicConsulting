# COMPONENTS.md — component inventory

What exists, where, and how to use it. Update this file whenever you add, rename or change the props of a
component. Visual rules live in `docs/DESIGN.md`; this file is about usage.

## Layout (`components/sections/`)

| Component    | File              | Notes                                                                                                                                                                                                           |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SiteShell`  | `site-shell.tsx`  | Page frame: skip link → `SiteHeader` → `<main id="main">` → `SiteFooter`. Used by `app/(site)/layout.tsx` and `app/not-found.tsx` (which sits outside the `(site)` group). Don't render header/footer directly. |
| `SiteHeader` | `site-header.tsx` | Client component. Sticky, condenses after 8px scroll (no transition under reduced motion). Desktop nav from `lg` (1024px); below that a native `<dialog>` sheet. Active link gets `aria-current="page"`.        |
| `SiteFooter` | `site-footer.tsx` | Server component. Ink band, four columns from `md`. Links come from `lib/nav.ts`.                                                                                                                               |

The root `<body>` is a flex column and `<main>` is `flex-1`, so the footer sits at the bottom of short pages.

## Home and content sections (`components/sections/`)

All server components. Each returns nothing for missing data; the parent hides a section whose list is empty.

| Component          | File                    | Notes                                                                                                      |
| ------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `HomeView`         | `home-view.tsx`         | Assembles the home page in brief §3 order from `HomeContent` (`lib/content/home.ts`).                      |
| `HomeHero`         | `home-hero.tsx`         | 7/5 split: eyebrow, Bodoni H1 (tagline), gold rule, value prop, two CTAs; "What we deliver" panel (D-024). |
| `AudienceCards`    | `audience-cards.tsx`    | "Who we work with": 4 cards from `homePage.audiences`, each CTA → `/contact?service=` (D-021).             |
| `ProcessSteps`     | `process-steps.tsx`     | "How we work": numbered steps joined by a gold hairline.                                                   |
| `TrackRecord`      | `track-record.tsx`      | Field-green band: proof numbers + attributed founder results. Small text ivory (contrast, D-024).          |
| `FounderStrip`     | `founder-strip.tsx`     | Compact home founder intro → /about. `FounderSpotlight` (full credentials) is kept for the About page.     |
| `ServiceCard`      | `service-card.tsx`      | Numbered card, stretched title link, sub-services list; gold border + sliding underline on hover.          |
| `IndustryChip`     | `industry-chip.tsx`     | Field-green outlined link — the page's only use of the agriculture accent.                                 |
| `FounderSpotlight` | `founder-spotlight.tsx` | Name/title left, short bio + credentials (gold rules) right, link to /about.                               |
| `ArticleCard`      | `article-card.tsx`      | Category, stretched title link, 3-line excerpt, date (en-GH). Used by insights lists.                      |
| `CtaBand`          | `cta-band.tsx`          | Ink band, gold-light eyebrow, ivory Bodoni heading, `inverse` button. One per page.                        |

## Inner-page building blocks

| Component      | File                         | Notes                                                                                                                                                                      |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PageHeader`   | `sections/page-header.tsx`   | Breadcrumbs slot, eyebrow, the page's single H1, gold rule, intro. Use at the top of every inner page.                                                                     |
| `Breadcrumbs`  | `seo/breadcrumbs.tsx`        | Visible trail (last crumb `aria-current`) + matching `BreadcrumbList` JSON-LD. Required on nested pages.                                                                   |
| `Prose`        | `sections/prose.tsx`         | Renders Sanity `blockContent`: Bodoni H2, Jost H3, 68ch, internal links via next/link, images via Sanity CDN.                                                              |
| `FaqList`      | `sections/faq-list.tsx`      | Native `<details>` accordion (no JS) + `FAQPage` JSON-LD for the same questions (D-021).                                                                                   |
| `ServiceView`  | `sections/service-view.tsx`  | `/services/[slug]`: 8/4 split, sticky consultation aside, related industries, other services, CTA band.                                                                    |
| `IndustryView` | `sections/industry-view.tsx` | `/industries/[slug]`: same frame as ServiceView; lists services linked from either side (`servicesForIndustry`, D-022); drops the empty main column until there's content. |

## UI primitives (`components/ui/`)

| Component        | Props                                                                                                    | Notes                                                                                                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Container`      | `as?`, `className?`                                                                                      | Max 1200px, 16px gutter mobile / 32px from `sm`.                                                                                                                                                                     |
| `Button`         | `variant?: "primary" \| "secondary" \| "inverse" \| "link"`, `size?: "md" \| "lg"`, `href?`, `external?` | With `href` renders `next/link` (or `<a target="_blank">` when `external`) and accepts anchor props; without it renders `<button>`. `primary`/`secondary`/`inverse` have a 44px minimum; `inverse` is for ink bands. |
| `Eyebrow`        | `as?: "p" \| "span" \| "div"`, `className?`                                                              | Uppercase tracked `gold-text` label.                                                                                                                                                                                 |
| `SectionHeading` | `eyebrow?`, `id?`, `as?: "h2" \| "h3"`, `align?: "left" \| "center"`                                     | Optional eyebrow + Bodoni heading. Never an `<h1>` — each page writes its own.                                                                                                                                       |

## SEO (`components/seo/`, `lib/seo.ts`, `lib/og.tsx`)

| Export               | Notes                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JsonLd`             | `<JsonLd data={…} />` — escapes `<` so CMS text can't break out of the script tag.                                                                            |
| `buildMetadata`      | Every route's metadata: page `title` (layout appends the site name), `description`, `path` (canonical), optional `image`, `noindex`. Always sets an OG image. |
| `organizationJsonLd` | Site-wide Organization + ProfessionalService + WebSite graph, rendered by `app/(site)/layout.tsx`. Contact details only from Sanity.                          |
| `STATIC_ROUTES`      | Routes that exist; feeds `sitemap.xml` and `llms.txt`. Add each new static page.                                                                              |
| `renderOgImage`      | Brand share image (eyebrow + Bodoni title). Use from a route's `opengraph-image.tsx`.                                                                         |

## Navigation data (`lib/nav.ts`)

`PRIMARY_NAV`, `SERVICES`, `INDUSTRIES`, `EXPLORE`, `LEGAL` — one source for header, footer and 404.
Service and industry slugs are placeholders until Sanity owns them (build step 2); then derive these lists
from Sanity and keep the shape (`NavLink = { href, label }`).

## Pages

| Route                               | File                      | Notes                                                                                                             |
| ----------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`                                 | `app/(site)/page.tsx`     | `getHomeContent()` (Sanity, or seed until connected — D-020) → `HomeView`.                                        |
| `/industries`, `/industries/[slug]` | `app/(site)/industries/…` | `getIndustries` / `getIndustry` (`lib/content/industries.ts`); numbered index; all 7 pre-rendered, unknown → 404. |
| 404                                 | `app/not-found.tsx`       | Wrapped in `SiteShell`; links to every service (docs/SEO.md §1). Next adds `noindex`.                             |
