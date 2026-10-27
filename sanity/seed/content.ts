import type {
  HOME_QUERY_RESULT,
  SERVICE_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
} from "@/sanity.types";

/**
 * Starter content from the client's source documents (Detailed Profile, Website Structure,
 * Positioning — see PROJECT-BRIEF.md "Sources"), docs/PROJECT-BRIEF.md and the client's answers (D-019).
 * Client wording is kept verbatim apart from "I" → "we" and British spelling (brief §6). Two jobs (D-020):
 *   1. `pnpm seed` imports it into Sanity once the project exists (create-if-missing, never overwrites).
 *   2. Until then, the home page renders from it (`seedHomeContent`).
 * Anything the brief doesn't supply is a {{TODO}} — never invent copy here.
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

/** Required in the Studio; filled with a marker so the client writes the real summary. */
export const summaryTodo = (title: string) => `{{TODO: copy needed — summary for ${title}}}`;

/** The seed in the exact shape HOME_QUERY returns, for rendering before Sanity is connected. */
export function seedHomeContent(): HOME_QUERY_RESULT {
  const { siteSettings, founder, services, industries } = SEED;
  return {
    settings: {
      tagline: siteSettings.tagline,
      valueProp: siteSettings.valueProp,
      proofPoints: siteSettings.proofPoints,
    },
    founder,
    services: services.map((s) => ({ _id: `service-${s.slug}`, ...s })),
    industries: industries.map((i) => ({ _id: `industry-${i.slug}`, ...i })),
    articles: [],
  };
}

// Seed documents have no edit history; the sitemap omits lastModified for an empty _updatedAt.
const SEED_UPDATED_AT = "";

/** The seed in SERVICES_QUERY shape. */
export function seedServices(): SERVICES_QUERY_RESULT {
  return SEED.services.map((service) => ({
    _id: `service-${service.slug}`,
    _updatedAt: SEED_UPDATED_AT,
    title: service.title,
    slug: service.slug,
    summary: summaryTodo(service.title),
    subServices: service.subServices,
  }));
}

/** One seed service in SERVICE_QUERY shape, or null. Fields the brief doesn't cover stay empty. */
export function seedService(slug: string): SERVICE_QUERY_RESULT {
  const service = seedServices().find((s) => s.slug === slug);
  if (!service) return null;
  return {
    ...service,
    body: null,
    outcomes: null,
    faqs: null,
    relatedIndustries: null,
    seo: null,
  };
}
