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

| Component          | File                    | Notes                                                                                                       |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `HomeView`         | `home-view.tsx`         | Assembles the home page in brief §3 order from `HomeContent` (`lib/content/home.ts`).                       |
| `HomeHero`         | `home-hero.tsx`         | 7/5 split: eyebrow, Bodoni H1 (tagline), gold rule, value prop, two CTAs; circular portrait with gold ring. |
| `StatStrip`        | `stat-strip.tsx`        | `<dl>` of proof points: gold Bodoni numbers, hairline dividers, 2×2 on mobile.                              |
| `ServiceCard`      | `service-card.tsx`      | Numbered card, stretched title link, sub-services list; gold border + sliding underline on hover.           |
| `IndustryChip`     | `industry-chip.tsx`     | Field-green outlined link — the page's only use of the agriculture accent.                                  |
| `FounderSpotlight` | `founder-spotlight.tsx` | Name/title left, short bio + credentials (gold rules) right, link to /about.                                |
| `ArticleCard`      | `article-card.tsx`      | Category, stretched title link, 3-line excerpt, date (en-GH). Used by insights lists.                       |
| `CtaBand`          | `cta-band.tsx`          | Ink band, gold-light eyebrow, ivory Bodoni heading, `inverse` button. One per page.                         |

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

| Route | File                  | Notes                                                                                 |
| ----- | --------------------- | ------------------------------------------------------------------------------------- |
| `/`   | `app/(site)/page.tsx` | `getHomeContent()` (Sanity, or seed until connected — D-020) → `HomeView`.            |
| 404   | `app/not-found.tsx`   | Wrapped in `SiteShell`; links to every service (docs/SEO.md §1). Next adds `noindex`. |
