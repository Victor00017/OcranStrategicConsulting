# Project brief — Ocran Strategic Consulting

**Sources.** This brief summarises the client's documents, kept **outside the repo** in `OSC/` because they contain
contact details (D-004): _Detailed Profile.docx_ (founder bio, credentials, expertise, countries),
_Website of Ocran Strategic Consulting.docx_ (site structure, value proposition, about content, contact details),
_Ocran Strategic Consulting - Positioning and Services Offered.docx_ (service lines). Where the brief and a source
disagree, the source wins — check it before writing copy.

## 1. Positioning

- **Who**: Jonathan Nyarko Ocran, Senior Consultant. Chartered Management Consultant (ChMC, IMC Ghana); Certified
  Manager (CM, ICPM / James Madison University, 2016); Executive MBA in Public Administration (Girne American
  University, 2023); MSc Agriculture (Sokoine University of Agriculture, 1994); BSc (Hons) Agriculture, Animal
  Science (University of Ghana, 1987). _(Corrected 2026-10-27 from the Detailed Profile — the MSc is not in Animal
  Science.)_ 35+ years across farm management, CSIR research administration,
  independent consulting, and 10 years as Policy Officer at the African Union Commission (Dept. of Rural Economy
  and Agriculture). Missions across 30 countries. 43 publications.
- **Where**: Tema, Greater Accra, Ghana — serving Sub-Saharan Africa.
- **Tagline**: From insights to strategy. _(Client answer 2026-10-27, D-019 — replaces "Transforming Businesses. Advancing Agriculture and Livestock. Delivering Sustainable Growth.")_
- **Value proposition (source copy, verbatim)**: "I help agriculture, agribusiness and livestock companies,
  development sector organizations and NGOs as well as manufacturing and retail SMEs to address teething problems,
  build and grow their businesses and organizations." On the site: "we" voice, British spelling (D-019).
- **Mission**: To provide high-impact strategic advisory services that help SMEs achieve sustainable growth and
  operational excellence.
- **Vision**: To become a leading strategic advisory firm supporting African enterprises to grow into globally
  competitive organisations.
- **Values**: Excellence, Integrity, Professional Service.

### Proof points to surface (use exactly; don't embellish)

- 35+ years experience · 30 countries · 43 publications · 55 AU member states policy reach
- Helped administer a $1M World Bank-funded National Research Grant Scheme (100+ programmes)
- $200,000+ grant funding secured through written proposals
- 30% productivity gain on a livestock programme; 20% farm productivity gain (MoFA)
- Led the AU's Ecological Organic Agriculture (EOA) Initiative

## 2. Audiences & what they need

| Audience                                       | Looking for                                                    | Primary CTA            |
| ---------------------------------------------- | -------------------------------------------------------------- | ---------------------- |
| Agribusiness / livestock companies & investors | Feasibility studies, investment advisory, value chain analysis | Request a consultation |
| Development partners, NGOs, donors             | Programme design, proposals, policy & sector studies           | Discuss a partnership  |
| Government / public sector                     | Policy analysis, strategic plans, training                     | Request a proposal     |
| SMEs (agri, light manufacturing, retail)       | Business plans, growth strategy, investor readiness            | Book a discovery call  |
| Students, officers, farmers                    | Books, training guides, templates — **on hold (D-016)**        | —                      |

## 3. Sitemap

```
/                         Home
/about                    Company story, founder profile, mission/vision/values, credentials
/services                 Overview of 6 service lines
/services/[slug]          One page per service line (SEO landing pages)
/industries               Overview
/industries/[slug]        Agriculture · Livestock · Agribusiness · Development Organisations · SMEs ·
                          Light Manufacturing · Public Sector
/insights                 Articles (thought leadership) — list + category filter
/insights/[slug]
/publications             The 43 publications (filterable list, outbound links where available)
/case-studies             Projects & work samples
/case-studies/[slug]
/contact                  Form (name, email, message) + emails, phone, WhatsApp, map/location
/privacy  /terms
```

On hold for Phase 1 (D-016): `/books`, `/books/[slug]`, `/resources`, `/refunds` — see `docs/later/held-features.md`.

Header nav: Services · Industries · Insights · About · **Contact** (button).
Footer: services list, industries list, explore links, contact block, social links, legal links.

### Home page sections (in order)

1. Hero — tagline as H1 support, value proposition, 2 CTAs (Request a consultation / Explore services), founder portrait
2. Proof strip — the four headline numbers
3. Services — 6 cards linking to service pages
4. Industries served — compact grid
5. Founder spotlight — short bio + credentials + link to About
6. Featured insights — latest 3 articles
7. Contact CTA band

(Books and the resource lead-magnet sections are on hold — D-016.)

## 4. Service lines (from positioning doc — 6, not 5)

1. **Strategy and Management Consulting** — Strategic Planning · Business Transformation · Organisational Development · Governance Reviews
2. **Agribusiness Advisory Services** — Feasibility Studies · Agribusiness Investment Advisory · Livestock Development · Value Chain Analysis
3. **SME Development and Business Growth** — Business Plans · Market Entry Strategy · Financial Analysis · Growth Planning
4. **Project Development and Fundraising** — Proposal Writing · Grant Development · Investor Readiness · Resource Mobilisation
5. **Research and Policy Advisory** — Policy Analysis · Sector Studies · Market Research · Economic Assessments
6. **Training and Capacity Building** — Executive Training · Customer Experience · AI and Digital Transformation · Agribusiness Management

## 5. Sanity content model

| Type                            | Key fields                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `siteSettings` (singleton)      | name, tagline, valueProp, contactEmails[], phone, whatsapp, address, geo, socialLinks[], defaultOgImage                                                 |
| `founder` (singleton)           | name, title, portrait, shortBio, longBio (portable text), credentials[], expertise[], countries[]                                                       |
| `service`                       | title, slug, summary, subServices[], body, outcomes[], faqs[], relatedIndustries[], seo                                                                 |
| `industry`                      | title, slug, summary, body, challenges[], relatedServices[], seo                                                                                        |
| `article`                       | title, slug, excerpt, coverImage, body, category, tags[], publishedAt, updatedAt, seo                                                                   |
| `publication`                   | title, type (book/journal/brief/report/chapter/thesis…), year, publisher/journal, url?, doi?                                                            |
| `caseStudy`                     | title, slug, client (or "Confidential client"), sector, challenge, approach, results[], year, permissionConfirmed (bool, required true to publish), seo |
| `testimonial`                   | quote, name, role, org, permissionConfirmed (bool)                                                                                                      |
| `enquiry` (read-only in Studio) | name, email, message, source page, createdAt, status                                                                                                    |
| `seo` (object)                  | metaTitle, metaDescription, ogImage, noindex                                                                                                            |

## 6. Copy direction

- Voice: authoritative, plain, warm. Senior advisor, not a salesman. British/Ghanaian English spelling.
- Pick ONE voice and keep it: either first person ("I help…") as a solo senior consultant, or firm voice
  ("We help…"). Source docs mix both. See open questions.
- Lead with outcomes and evidence. Short paragraphs. No jargon stacks.

## 7. Open questions for the client (resolve before build)

1. **Logo/brand**: the gold "SO/OS" monogram vs. the green leaf "OCRAN" mark in the meeting photo — which is
   official? (Recommendation: gold monogram; green as a supporting agriculture accent only.) Need SVG/vector logo.
2. _(Resolved — D-019: "From insights to strategy.")_ **Tagline**: "…Advancing Agriculture and Livestock…" (positioning doc) vs "…Advancing Agriculture…" (photo). Confirm.
3. _(Resolved — D-019: "we", firm voice.)_ **Voice**: "I" or "We"? The site says "About Us" while the value prop says "I help".
4. **Mission** mentions only SMEs, but target clients include governments, NGOs and development partners. Broaden?
5. **Service count**: website structure lists 5 services; positioning doc lists 6 (adds Research & Policy Advisory). Assume 6.
6. _(Resolved — D-019: the 7-industry list, no Retail.)_ **Industries**: Home lists 5 (incl. Retail & Consumer Goods); Industries page lists 7 (no Retail). Reconcile.
7. _(On hold — D-016)_ **Books**: titles, covers, prices, digital (PDF) or physical or both? Who ships physical copies? Delivery areas?
8. _(On hold — D-016)_ **Paystack**: is the practice a registered business (needed for a full Paystack account)? Bank/MoMo for settlement?
9. **Case studies & testimonials**: which can be published, with written permission? Anonymised OK?
10. _(Partly resolved — D-019: a real portrait supplied, circular crop; uncropped original still wanted.)_ **Photography**: real professional photos of Jonathan (portrait + working shots). The meeting image provided is
    AI-generated with fake signage — fine as a mood reference, not for publishing.
11. _(On hold — D-016)_ **Resources**: gate downloads behind email (builds a mailing list) or free?
12. **French** version later for francophone West Africa (Côte d'Ivoire, Senegal, Benin, Togo…)?
13. The 5 articles, the proposal template, toolkits and diagnostic tools referenced as "attached" — not yet received.
