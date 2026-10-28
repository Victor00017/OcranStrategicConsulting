import type {
  ABOUT_QUERY_RESULT,
  ARTICLE_QUERY_RESULT,
  ARTICLES_QUERY_RESULT,
  CASE_STUDIES_QUERY_RESULT,
  CASE_STUDY_QUERY_RESULT,
  HOME_QUERY_RESULT,
  INDUSTRIES_QUERY_RESULT,
  INDUSTRY_QUERY_RESULT,
  LEGAL_PAGE_QUERY_RESULT,
  PAGE_INTROS_QUERY_RESULT,
  PUBLICATIONS_QUERY_RESULT,
  SERVICE_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
} from "@/sanity.types";
import { HOME_COPY, INDUSTRY_COPY, PAGE_INTROS, SEO_COPY, SERVICE_COPY } from "./copy";
import { LEGAL_PAGES } from "./legal";
import { ABOUT, FOUNDER_PROFILE } from "./profile";

/**
 * Starter content. This file holds the client's facts — source documents (Detailed Profile, Website
 * Structure, Positioning — see PROJECT-BRIEF.md "Sources"), the brief and the client's answers (D-019),
 * verbatim apart from "I" → "we" and British spelling. Drafted copy awaiting approval lives in ./copy.ts (D-023).
 * Two jobs (D-020):
 *   1. `pnpm seed` loads it into Sanity: creates missing documents and fills only empty or {{TODO}} fields.
 *   2. Until Sanity is configured, pages render from it (the seed* functions below, in each query's shape).
 */

export const PORTRAIT_FILE = "public/images/founder/founder-portrait.jpg";

export const SEED = {
  siteSettings: {
    name: "Ocran Strategic Consulting",
    tagline: "From insights to strategy.",
    // Website Structure doc, "Value Proposition" — client's wording in the firm voice.
    valueProp:
      "We help agriculture, agribusiness and livestock companies, development sector organisations and NGOs as well as manufacturing and retail SMEs to address teething problems, build and grow their businesses and organisations.",
    proofPoints: [
      { _key: "years", value: "35+", label: "years experience" },
      { _key: "countries", value: "30", label: "countries" },
      { _key: "publications", value: "43", label: "publications" },
      { _key: "au", value: "55", label: "AU member states policy reach" },
    ],
  },
  founder: {
    name: "Jonathan Nyarko Ocran",
    // Detailed Profile: title line, opening sentence, and "Education and Credentials".
    title: "Senior Consultant",
    shortBio:
      "Jonathan Nyarko Ocran is a Chartered Management Consultant with over 35 years of distinguished experience spanning agriculture, livestock production systems, agribusiness development, and business strategy across Africa and within international institutions.",
    credentials: [
      "Chartered Management Consultant (ChMC), Institute of Management Consultants, Ghana",
      "Certified Manager (CM), Institute of Certified Professional Managers, James Madison University, USA (2016)",
      "Executive MBA in Public Administration, Girne American University, Turkey (2023)",
      "MSc Agriculture, Sokoine University of Agriculture, Tanzania (1994)",
      "BSc (Hons) Agriculture (Animal Science), University of Ghana (1987)",
    ],
    portrait: {
      alt: "Jonathan Nyarko Ocran, founder of Ocran Strategic Consulting",
      url: "/images/founder/founder-portrait.jpg",
    },
  },
  // Brief §4, in the brief's order.
  services: [
    {
      slug: "strategy-management",
      title: "Strategy and Management Consulting",
      subServices: [
        "Strategic Planning",
        "Business Transformation",
        "Organisational Development",
        "Governance Reviews",
      ],
    },
    {
      slug: "agribusiness-advisory",
      title: "Agribusiness Advisory Services",
      subServices: [
        "Feasibility Studies",
        "Agribusiness Investment Advisory",
        "Livestock Development",
        "Value Chain Analysis",
      ],
    },
    {
      slug: "sme-development",
      title: "SME Development and Business Growth",
      subServices: [
        "Business Plans",
        "Market Entry Strategy",
        "Financial Analysis",
        "Growth Planning",
      ],
    },
    {
      slug: "project-development",
      title: "Project Development and Fundraising",
      subServices: [
        "Proposal Writing",
        "Grant Development",
        "Investor Readiness",
        "Resource Mobilisation",
      ],
    },
    {
      slug: "research-policy",
      title: "Research and Policy Advisory",
      subServices: ["Policy Analysis", "Sector Studies", "Market Research", "Economic Assessments"],
    },
    {
      slug: "training",
      title: "Training and Capacity Building",
      subServices: [
        "Executive Training",
        "Customer Experience",
        "AI and Digital Transformation",
        "Agribusiness Management",
      ],
    },
  ],
  // Brief §3, the 7-industry list (client answer, D-019).
  industries: [
    { slug: "agriculture", title: "Agriculture" },
    { slug: "livestock", title: "Livestock" },
    { slug: "agribusiness", title: "Agribusiness" },
    { slug: "development-organisations", title: "Development Organisations" },
    { slug: "smes", title: "SMEs" },
    { slug: "light-manufacturing", title: "Light Manufacturing" },
    { slug: "public-sector", title: "Public Sector" },
  ],
};

/** Drafted search title/description for a service or industry slug, in the query's `seo` shape. */
function seedSeo(slug: string) {
  const seo = SEO_COPY[slug];
  return seo ? { ...seo, noindex: null, ogImage: null } : null;
}

// Seed documents have no edit history; the sitemap omits lastModified for an empty _updatedAt.
const SEED_UPDATED_AT = "";

/** Summaries are required in the Studio, so every seeded service and industry must have drafted copy. */
function required<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`Seed: missing ${what} in ./copy.ts`);
  return value;
}

const industryRef = (slug: string) => {
  const industry = SEED.industries.find((i) => i.slug === slug);
  if (!industry) throw new Error(`Seed: unknown industry "${slug}"`);
  return { _id: `industry-${slug}`, title: industry.title, slug };
};

/** The seed in the exact shape HOME_QUERY returns. */
export function seedHomeContent(): HOME_QUERY_RESULT {
  const { siteSettings, founder, industries } = SEED;
  return {
    settings: {
      tagline: siteSettings.tagline,
      valueProp: siteSettings.valueProp,
      proofPoints: siteSettings.proofPoints,
    },
    home: HOME_COPY,
    founder,
    services: seedServices().map(({ _id, title, slug, summary, subServices }) => ({
      _id,
      title,
      slug,
      summary,
      subServices,
    })),
    industries: industries.map((i) => ({ _id: `industry-${i.slug}`, ...i })),
    articles: [],
  };
}

/** The seed in SERVICES_QUERY shape. */
export function seedServices(): SERVICES_QUERY_RESULT {
  return SEED.services.map((service) => ({
    _id: `service-${service.slug}`,
    _updatedAt: SEED_UPDATED_AT,
    title: service.title,
    slug: service.slug,
    summary: required(SERVICE_COPY[service.slug], `copy for service ${service.slug}`).summary,
    subServices: service.subServices,
  }));
}

/** One seed service in SERVICE_QUERY shape, or null. */
export function seedService(slug: string): SERVICE_QUERY_RESULT {
  const service = seedServices().find((s) => s.slug === slug);
  const copy = SERVICE_COPY[slug];
  if (!service) return null;
  return {
    ...service,
    deliverables: copy?.deliverables ?? null,
    body: null,
    outcomes: copy?.outcomes ?? null,
    faqs: copy?.faqs ?? null,
    relatedIndustries: copy?.industries.map(industryRef) ?? null,
    seo: seedSeo(slug),
  };
}

/** The seed in INDUSTRIES_QUERY shape. */
export function seedIndustries(): INDUSTRIES_QUERY_RESULT {
  return SEED.industries.map((industry) => ({
    _id: `industry-${industry.slug}`,
    _updatedAt: SEED_UPDATED_AT,
    title: industry.title,
    slug: industry.slug,
    summary: required(INDUSTRY_COPY[industry.slug], `copy for industry ${industry.slug}`).summary,
  }));
}

/**
 * One seed industry in INDUSTRY_QUERY shape, or null. `servedBy` mirrors Sanity's reverse lookup:
 * services whose related industries include this one (D-022).
 */
export function seedIndustry(slug: string): INDUSTRY_QUERY_RESULT {
  const industry = seedIndustries().find((i) => i.slug === slug);
  if (!industry) return null;
  const servedBy = SEED.services
    .filter((service) => SERVICE_COPY[service.slug]?.industries.includes(slug))
    .map((service) => ({
      _id: `service-${service.slug}`,
      title: service.title,
      slug: service.slug,
    }));
  return {
    ...industry,
    body: null,
    challenges: INDUSTRY_COPY[slug]?.challenges ?? null,
    relatedServices: null,
    servedBy,
    seo: seedSeo(slug),
  };
}

/** The seed in PAGE_INTROS_QUERY shape. */
export function seedPageIntros(): PAGE_INTROS_QUERY_RESULT {
  return PAGE_INTROS;
}

/** The seed in ABOUT_QUERY shape (./profile.ts facts + founder basics). */
export function seedAbout(): ABOUT_QUERY_RESULT {
  const { name, title, shortBio, credentials, portrait } = SEED.founder;
  return {
    about: ABOUT,
    founder: { name, title, shortBio, credentials, portrait, ...FOUNDER_PROFILE },
  };
}

/** The client's 43 publications haven't been supplied yet (PROGRESS), so the seed has none. */
export function seedPublications(): PUBLICATIONS_QUERY_RESULT {
  return [];
}

/** The client's 5 articles haven't been supplied yet (PROGRESS), so the seed has none. */
export function seedArticles(): ARTICLES_QUERY_RESULT {
  return [];
}

export function seedArticle(slug: string): ARTICLE_QUERY_RESULT {
  void slug; // no seeded articles, so every slug is unknown (→ 404)
  return null;
}

/** One legal page (./legal.ts drafts) in LEGAL_PAGE_QUERY shape, or null. */
export function seedLegalPage(slug: string): LEGAL_PAGE_QUERY_RESULT {
  const page = LEGAL_PAGES.find((p) => p.slug === slug);
  return page ? { title: page.title, lastUpdated: page.lastUpdated, body: page.body } : null;
}

/** No case studies have been supplied or cleared for publication yet (PROGRESS). */
export function seedCaseStudies(): CASE_STUDIES_QUERY_RESULT {
  return [];
}

export function seedCaseStudy(slug: string): CASE_STUDY_QUERY_RESULT {
  void slug; // nothing seeded, so every slug is unknown (→ 404)
  return null;
}
