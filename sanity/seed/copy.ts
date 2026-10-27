/**
 * DRAFT copy written for the client's approval (D-023). Rules it follows:
 *   - Describes what each service does and delivers, and common challenges in each sector.
 *   - Facts, numbers and results only from the client's documents (Detailed Profile, Website Structure,
 *     Positioning); no invented clients, testimonials, figures or guarantees.
 *   - "We" voice, British spelling (brief §6). Track-record results are attributed to where they happened (D-024).
 * Every passage here is listed in PROGRESS.md "Content TODOs" until the client signs it off.
 */

type Faq = { _key: string; question: string; answer: string };

export type ServiceCopy = {
  summary: string;
  deliverables: string[];
  outcomes: string[];
  faqs: Faq[];
  /** Industry slugs; becomes `relatedIndustries` references. */
  industries: string[];
};

export const SERVICE_COPY: Record<string, ServiceCopy> = {
  "strategy-management": {
    summary:
      "We help leadership teams set a clear direction, organise to deliver it and put the governance in place to keep it on track.",
    deliverables: [
      "Strategic plan with priorities, targets and an implementation roadmap",
      "Business transformation plan with sequencing and change-management steps",
      "Organisational structure and roles review",
      "Governance review with practical recommendations",
      "Facilitated leadership and board strategy sessions",
    ],
    outcomes: [
      "A written direction the whole organisation can act on",
      "Clear responsibilities and decision rights",
      "A roadmap with milestones you can monitor",
    ],
    faqs: [
      {
        _key: "timeline",
        question: "How long does a strategic plan take?",
        answer:
          "It depends on the size of the organisation and how much consultation is needed. We agree the scope, timeline and fee in writing before work starts.",
      },
      {
        _key: "implementation",
        question: "Do you help with implementation?",
        answer:
          "Yes. We can support implementation, review progress against the roadmap and help adjust the plan as conditions change.",
      },
    ],
    industries: ["smes", "public-sector", "development-organisations", "agribusiness"],
  },
  "agribusiness-advisory": {
    summary:
      "Investment-grade feasibility studies, market assessments and specialist livestock advice that show whether an agribusiness venture will work — and how to make it work.",
    deliverables: [
      "Investment-grade feasibility study with financial projections",
      "Market assessment and value chain analysis",
      "Investment advisory notes for owners, lenders and investors",
      "Livestock development plan covering breeding, nutrition and pasture",
      "Review of an existing farm or processing operation with improvement priorities",
    ],
    outcomes: [
      "A clear go/no-go decision backed by evidence",
      "Figures that lenders and investors can scrutinise",
      "Practical ways to raise productivity on existing operations",
    ],
    faqs: [
      {
        _key: "livestock",
        question: "Do you prepare feasibility studies for poultry, pig or cattle projects?",
        answer:
          "Yes. Livestock development is a core specialism. We assess the market, production system, costs and returns for the species and scale you are considering.",
      },
      {
        _key: "funding",
        question: "Can the study support a loan or grant application?",
        answer:
          "Our feasibility studies are prepared to the standard that lenders, investors and funders expect, and we can follow a specific funder's required format.",
      },
    ],
    industries: ["agriculture", "livestock", "agribusiness"],
  },
  "sme-development": {
    summary:
      "Donor-ready and investor-ready business plans, market entry strategies and financial analysis for small and medium enterprises ready to grow.",
    deliverables: [
      "Business plan with financial projections",
      "Market entry strategy with competitor analysis",
      "Financial analysis and performance review",
      "Growth plan with priorities and milestones",
    ],
    outcomes: [
      "A plan you can take to a bank, investor or funder",
      "Clarity on which markets and products to prioritise",
      "Better financial visibility for day-to-day decisions",
    ],
    faqs: [
      {
        _key: "loan",
        question: "Can you write a business plan for a bank loan?",
        answer:
          "Yes. We tailor the plan, projections and supporting analysis to what the bank or investor needs to see.",
      },
      {
        _key: "sectors",
        question: "Do you only work with agribusinesses?",
        answer:
          "No. We also support manufacturing and retail SMEs, as well as businesses across agricultural value chains.",
      },
    ],
    industries: ["smes", "light-manufacturing", "agribusiness"],
  },
  "project-development": {
    summary:
      "We design projects and write the proposals, grant applications and investment cases that put them in front of funders.",
    deliverables: [
      "Grant and donor proposals, including logical framework and budget",
      "Concept notes and expressions of interest",
      "Investor-readiness review and investment case",
      "Resource mobilisation strategy",
    ],
    outcomes: [
      "Proposals aligned with each funder's criteria",
      "A pipeline of suitable funding opportunities",
      "An organisation ready for funder or investor due diligence",
    ],
    faqs: [
      {
        _key: "guarantee",
        question: "Can you guarantee funding?",
        answer:
          "No one can guarantee a funding decision. We make sure your proposal is complete, compelling and aligned with what the funder is looking for.",
      },
      {
        _key: "find",
        question: "Can you help us find funding opportunities?",
        answer:
          "Yes. A resource mobilisation strategy identifies the funders and investors that fit your work, and how to approach them.",
      },
    ],
    industries: ["development-organisations", "agriculture", "smes", "public-sector"],
  },
  "research-policy": {
    summary:
      "Policy analysis, sector studies and economic assessments that give governments, development partners and businesses an evidence base for decisions.",
    deliverables: [
      "Policy analysis and policy briefs",
      "Sector and value chain studies",
      "Market research reports",
      "Economic and impact assessments",
      "Stakeholder consultation and validation workshops",
    ],
    outcomes: [
      "Decisions grounded in evidence",
      "Policy options with their trade-offs set out",
      "Reports that stand up to scrutiny from boards, ministers and funders",
    ],
    faqs: [
      {
        _key: "level",
        question: "Do you work at national and regional level?",
        answer:
          "Yes. Our experience runs from national agricultural programmes in Ghana to continental policy across the African Union's 55 member states.",
      },
    ],
    industries: ["public-sector", "development-organisations", "agriculture", "livestock"],
  },
  training: {
    summary:
      "Practical training for executives, managers, agriculture officers and farmers — from strategy and customer experience to AI in agriculture and agribusiness management.",
    deliverables: [
      "Tailored training programmes and workshops",
      "Training manuals and participant guides",
      "Executive and management short courses",
      "AI and digital transformation sessions for agriculture officers",
      "Training needs assessment",
    ],
    outcomes: [
      "Teams that can apply new skills on the job",
      "Materials your organisation keeps and reuses",
      "Training matched to the level and sector of the participants",
    ],
    faqs: [
      {
        _key: "onsite",
        question: "Can training be delivered at our premises?",
        answer:
          "Yes. Programmes can be delivered at your premises or another venue, and tailored to your team's level and sector.",
      },
      {
        _key: "materials",
        question: "Do participants receive materials?",
        answer:
          "Yes. Each programme comes with a manual or participant guide that your team keeps after the training.",
      },
    ],
    industries: ["agriculture", "livestock", "public-sector", "smes"],
  },
};

export const INDUSTRY_COPY: Record<string, { summary: string; challenges: string[] }> = {
  agriculture: {
    summary:
      "Strategy, feasibility and policy support for farming enterprises, agricultural programmes and the institutions that serve them.",
    challenges: [
      "Low and variable yields",
      "Limited access to finance and inputs",
      "Weak links to markets",
      "Climate and sustainability pressures",
    ],
  },
  livestock: {
    summary:
      "Specialist advice on livestock production systems — breeding, nutrition and pasture — and the business case behind them.",
    challenges: [
      "Low productivity and high feed costs",
      "Animal health risks",
      "Uncertain returns on new production units",
      "Access to quality breeding stock",
    ],
  },
  agribusiness: {
    summary:
      "Feasibility, investment and growth advice for businesses that process, trade and add value along agricultural value chains.",
    challenges: [
      "Securing a reliable supply of raw materials",
      "Showing investors the business is bankable",
      "Scaling processing capacity",
      "Meeting market and quality standards",
    ],
  },
  "development-organisations": {
    summary:
      "Programme design, proposals and studies for development partners, NGOs and donor-funded projects.",
    challenges: [
      "Designing programmes that funders will support",
      "Building an evidence base for programme decisions",
      "Strengthening partner capacity",
      "Reporting results clearly",
    ],
  },
  smes: {
    summary:
      "Business plans, growth strategy and investor readiness for small and medium enterprises in agriculture, manufacturing and retail.",
    challenges: [
      "Access to finance",
      "Planning for growth",
      "Financial management",
      "Entering new markets",
    ],
  },
  "light-manufacturing": {
    summary:
      "Strategy, business planning and market entry support for small and medium manufacturers, including agro-processors.",
    challenges: [
      "Scaling production profitably",
      "Finding and entering markets",
      "Financing equipment and working capital",
      "Organising the business for growth",
    ],
  },
  "public-sector": {
    summary:
      "Policy analysis, strategic planning and training for ministries, agencies and public institutions.",
    challenges: [
      "Turning policy into plans that can be implemented",
      "Evidence for policy choices",
      "Strengthening institutional capacity",
      "Coordinating many stakeholders",
    ],
  },
};

export const PAGE_INTROS = {
  servicesIntro:
    "Six service lines with one aim: to move your organisation from insight to a strategy it can fund, staff and deliver.",
  industriesIntro:
    "We work where agriculture, enterprise and public policy meet — from farms and processors to ministries and development programmes.",
};

export const HOME_COPY = {
  deliverables: [
    "Feasibility studies and market assessments",
    "Business plans and investment cases",
    "Grant and donor proposals",
    "Strategic and transformation plans",
    "Policy briefs and sector studies",
    "Training programmes and manuals",
  ],
  // Brief §2 audiences and their CTAs, verbatim; "needs" condensed from the brief's "Looking for" column.
  audiences: [
    {
      _key: "agribusiness",
      title: "Agribusiness and livestock companies and investors",
      needs: "Feasibility studies, investment advisory and value chain analysis.",
      ctaLabel: "Request a consultation",
      serviceSlug: "agribusiness-advisory",
    },
    {
      _key: "development",
      title: "Development partners, NGOs and donors",
      needs: "Programme design, proposals, and policy and sector studies.",
      ctaLabel: "Discuss a partnership",
      serviceSlug: "project-development",
    },
    {
      _key: "public",
      title: "Government and public sector",
      needs: "Policy analysis, strategic plans and training.",
      ctaLabel: "Request a proposal",
      serviceSlug: "research-policy",
    },
    {
      _key: "smes",
      title: "Small and medium enterprises",
      needs: "Business plans, growth strategy and investor readiness.",
      ctaLabel: "Book a discovery call",
      serviceSlug: "sme-development",
    },
  ],
  process: [
    {
      _key: "insight",
      title: "Insight",
      description:
        "We start with the evidence — your figures, your market, your sector and the people involved — so the problem is understood before anything is recommended.",
    },
    {
      _key: "strategy",
      title: "Strategy",
      description:
        "We turn that evidence into clear options and a recommended way forward, with the plan, figures and documents to support it.",
    },
    {
      _key: "delivery",
      title: "Delivery",
      description:
        "We help put the plan to work — with funders, teams and partners — and review it as results come in.",
    },
  ],
  // Detailed Profile, verbatim facts; attributed to where they happened (D-024).
  trackRecord: [
    {
      _key: "mofa",
      context: "Ministry of Food and Agriculture, Ghana",
      result:
        "Increased farm productivity by 20% through innovative livestock breeding and pasture development programmes.",
    },
    {
      _key: "csir",
      context: "Council for Scientific and Industrial Research (CSIR)",
      result:
        "Helped administer a $1 million World Bank-funded National Research Grant Scheme that funded over 100 national agricultural programmes.",
    },
    {
      _key: "ocranconsult",
      context: "OcranConsult, 2005–2012",
      result:
        "Secured over $200,000 in grant funding through competitively written proposals, and delivered a livestock programme with a 30% productivity gain.",
    },
    {
      _key: "au",
      context: "African Union Commission, 2012–2022",
      result:
        "Shaped continental agricultural policy across all 55 AU member states and spearheaded the Ecological Organic Agriculture (EOA) Initiative.",
    },
  ],
};
