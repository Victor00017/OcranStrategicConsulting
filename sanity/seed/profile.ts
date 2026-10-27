import type { BlockContent } from "@/sanity.types";

/**
 * Client facts for /about, from the client's documents — kept verbatim apart from British spelling
 * (brief §6), "Cote d'Ivoire" → "Côte d'Ivoire", and the "referred" → "refereed" typo (PROGRESS).
 *   - ABOUT: Website Structure doc, "About Us".
 *   - FOUNDER_PROFILE: Detailed Profile.
 */

export const ABOUT = {
  companyStory:
    "Ocran Strategic Consulting is based in Tema in the Greater Accra Region of Ghana and focuses on agriculture, livestock, strategy and management consulting.",
  mission:
    "To provide high-impact strategic advisory services that help SMEs achieve sustainable growth and operational excellence.",
  vision:
    "To become a leading strategic advisory firm supporting African enterprises to grow into globally competitive organisations.",
  values: ["Excellence", "Integrity", "Professional Service"],
};

type Para = { style?: "normal" | "h2"; text: string };

/** Plain paragraphs → Sanity portable text (`blockContent`) with stable keys. */
function toBlocks(paras: Para[]): BlockContent {
  return paras.map(({ style = "normal", text }, index) => ({
    _type: "block",
    _key: `p${index}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}

export const FOUNDER_PROFILE = {
  longBio: toBlocks([
    {
      text: "He has advised governments, development organisations, and private sector clients on agricultural policy, livestock systems improvement, market development, and investment-ready business planning, earning a reputation as a trusted thought leader with a track record of securing funding, building high-impact partnerships, and driving measurable productivity gains across food and agriculture value chains.",
    },
    {
      text: "Jonathan brings a rare combination of deep technical grounding in agriculture and animal science with executive-level strategic advisory capability — a blend forged over three decades of work that spans farm management, applied research, continental policymaking, and independent consulting.",
    },
    { style: "h2", text: "A career built across the value chain" },
    {
      text: "Jonathan's career began at the ground level, as a Farm Manager with Ghana's Ministry of Food and Agriculture, where he increased farm productivity by 20% through innovative livestock breeding and pasture development programmes, and as a Tutor in Animal Science and Biology at Kwadaso Agricultural College, shaping the next generation of agricultural professionals.",
    },
    {
      text: "He went on to spend six years at the Council for Scientific and Industrial Research (CSIR), where he helped administer a $1 million World Bank-funded National Research Grant Scheme, which funded over 100 national agricultural programmes. He also co-authored the Ghana Agricultural Research Grants Manual and ultimately led the institution's Livestock and Fisheries Section.",
    },
    {
      text: "Between 2005 and 2012, Jonathan built an independent consulting practice under OcranConsult, delivering market intelligence, competitive analysis, and business strategy advisory to agribusinesses and SMEs. During this period, he secured over $200,000 in grant funding through competitively written proposals and delivered a livestock productivity programme that achieved a 30% productivity gain for clients.",
    },
    {
      text: "From 2012 to 2022, Jonathan served as Policy Officer in the Department of Rural Economy and Agriculture at the African Union Commission in Addis Ababa, Ethiopia, where he shaped continental agricultural policy across all 55 AU member states. He spearheaded the Ecological Organic Agriculture (EOA) Initiative, a flagship continental programme advancing sustainable farming practices; led policy analysis and high-level negotiations on livestock and food security agendas; forged strategic agricultural partnerships with the League of Arab States and Turkey; and authored policy briefs and strategic plans that directly informed decisions by AU ministers. In this role, he led and participated in missions across thirty countries spanning Africa, Asia, and Europe.",
    },
    {
      text: "In 2026, Jonathan started his own independent senior consulting practice based in Tema, Ghana, providing high-level strategic advisory to governments, development organisations, NGOs, and private sector clients across Sub-Saharan Africa. His work includes end-to-end business transformation engagements, investment-grade feasibility studies and market assessments, specialist livestock development advisory, and donor-ready business plans and grant proposals. He has also developed a training manual for agriculture officers on applying artificial intelligence to farmer challenges across Africa, and a comprehensive livestock production training guide for officers and farmers.",
    },
    { style: "h2", text: "Publications and professional development" },
    {
      text: "Jonathan has 43 publications to his credit, including books, refereed journal papers, articles, business plans, policy briefs, project proposals, feasibility study reports, dissertations, theses, conference reports, and book chapters.",
    },
    {
      text: "His professional development includes short courses on strategic planning, managerial leadership development, agricultural reporting, project management, project planning and development, AI in project management, agile project management, grants management, finance for non-financial managers, modern guide to strategy implementation, applied AI for social good and strategy business analysis.",
    },
  ]),
  alumniOf: [
    "University of Ghana",
    "Sokoine University of Agriculture",
    "Girne American University",
  ],
  expertise: [
    "Agricultural and livestock systems",
    "Business strategy development and execution",
    "Business transformation",
    "Management consulting",
    "Feasibility studies and investment analysis",
    "General management",
    "Leadership",
    "Project management",
    "Strategy planning",
    "Organisation change management",
    "Market research and competitive analysis",
    "Agribusiness development",
    "Policy formulation and advocacy",
    "Animal nutrition",
    "Business plan development",
    "Proposal and grant writing",
    "Stakeholder and partnership management",
    "SME advisory and capacity building",
    "Programme management",
    "Executive advisory",
  ],
  // The profile's list, in its order. Counting Zanzibar separately is what makes 30 (PROGRESS: confirm).
  countries: [
    "Benin",
    "Botswana",
    "Cameroon",
    "Chad",
    "China",
    "Côte d'Ivoire",
    "Egypt",
    "Ethiopia",
    "Equatorial Guinea",
    "Ghana",
    "Italy",
    "Kenya",
    "Mali",
    "Mauritius",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Saudi Arabia",
    "Senegal",
    "South Africa",
    "Sudan",
    "Tanzania",
    "Togo",
    "Turkey",
    "the UAE",
    "Uganda",
    "Zambia",
    "Zanzibar",
    "Zimbabwe",
  ],
};
