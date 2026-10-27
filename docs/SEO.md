# SEO.md — ranking plan

Goal: show up when people in Ghana / West Africa / development sector search for consulting help in agriculture,
livestock, agribusiness, feasibility studies, business plans, grant proposals, and strategy.

## 1. Technical (every page — agents enforce this)

- `generateMetadata`: unique `title` (≤ 60 chars, pattern `"{Page} | Ocran Strategic Consulting"`), unique
  `description` (140–160 chars), `alternates.canonical`, OpenGraph + Twitter card, `metadataBase` = `https://www.ocranstrategicconsulting.com`.
- Canonical host: `www.` — redirect apex → www (308) in Vercel domain settings.
- `app/sitemap.ts` generated from Sanity (all services, industries, articles, case studies) with `lastModified`.
- `app/robots.ts`: allow all, disallow `/studio`, `/api`, point to sitemap.
- `/llms.txt`: short plain-text summary of the firm, services, and key URLs for AI search engines.
- Dynamic OG images via `opengraph-image.tsx` (brand template: ivory bg, monogram, title in Bodoni).
- Breadcrumbs (visible + `BreadcrumbList` schema) on all nested pages.
- Clean slugs, no trailing-slash duplication, 404 page with links back to services.
- Core Web Vitals green on mobile. Static generation (SSG/ISR) for all content routes.

## 2. Structured data (JSON-LD)

| Page               | Schema                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Site-wide (layout) | `Organization` + `ProfessionalService` (name, logo, url, address Tema GH, geo, areaServed: GH + Africa, sameAs: LinkedIn etc.) + `WebSite` |
| About              | `Person` (Jonathan Nyarko Ocran: jobTitle, alumniOf, hasCredential, knowsAbout, worksFor)                                                  |
| Service pages      | `Service` (provider → Organization, areaServed, serviceType) + `FAQPage` if FAQs                                                           |
| Articles           | `Article` (author → Person, datePublished, dateModified, image)                                                                            |
| Publications       | `ItemList` of `CreativeWork` / `ScholarlyArticle`                                                                                          |
| Case studies       | `Article` (about the project)                                                                                                              |

Validate with Google Rich Results Test before launch.

## 3. Keyword map (starting set — refine with Search Console data after 6–8 weeks)

| Page                                                                       | Primary intent                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| /services/agribusiness-advisory                                            | agribusiness consultant Ghana · agribusiness advisory Africa            |
| /services/agribusiness-advisory (feasibility section) or dedicated article | feasibility study consultant Ghana · poultry/pig farm feasibility study |
| /industries/livestock                                                      | livestock consultant Ghana · livestock development consultant Africa    |
| /services/sme-development                                                  | business plan writer Ghana · business plan for agribusiness             |
| /services/project-development                                              | grant proposal writer Ghana · donor proposal writing consultant         |
| /services/strategy-management                                              | strategic planning consultant Ghana · management consultant Tema/Accra  |
| /services/research-policy                                                  | agricultural policy consultant · sector study Ghana                     |
| /services/training                                                         | agribusiness training Ghana · AI in agriculture training                |

## 4. Content engine (where most rankings will come from)

- Launch with the 5 provided articles, then aim for 2 articles/month.
- Pillar + cluster: one long pillar per service line (2,000+ words) + 4–6 cluster articles linking back.
  Example pillar: "How to Do a Feasibility Study for a Livestock Farm in Ghana". Clusters: costs, poultry vs pigs,
  feed planning, financing options, common mistakes.
- Every article: author byline → founder page (E-E-A-T), updated date, internal links to 1 service + 1 related article,
  a CTA block, FAQ section answering real questions.
- Repurpose the 43 publications: list them all on /publications with abstracts — strong authority signal.

## 5. Off-site (not code — but critical)

1. **Google Business Profile** for "Ocran Strategic Consulting", Tema — category "Business management consultant".
   Biggest single lever for local searches. Collect genuine reviews from past clients.
2. Google Search Console + Bing Webmaster Tools (Bing also feeds DuckDuckGo and several AI assistants). Submit sitemap.
3. Consistent name/address/phone everywhere (website, GBP, LinkedIn, directories).
4. LinkedIn company page + Jonathan's profile linking to the site; publish article excerpts there with links back.
5. Listings: Institute of Management Consultants Ghana member directory, AU/development-sector networks,
   Ghana business directories, alumni pages, Google Scholar / ResearchGate profile for publications.
