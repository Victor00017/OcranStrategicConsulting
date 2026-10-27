/**
 * Site navigation — one list shared by SiteHeader, SiteFooter and the 404 page.
 * Service/industry slugs are placeholders until Sanity owns them (build step 2).
 * Books, Resources and Refunds are on hold for Phase 1 (D-016).
 */
export type NavLink = { href: string; label: string };

export const PRIMARY_NAV: readonly NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export const SERVICES: readonly NavLink[] = [
  { href: "/services/strategy-management", label: "Strategy & Management" },
  { href: "/services/agribusiness-advisory", label: "Agribusiness Advisory" },
  { href: "/services/sme-development", label: "SME Development" },
  { href: "/services/project-development", label: "Project Development" },
  { href: "/services/research-policy", label: "Research & Policy" },
  { href: "/services/training", label: "Training & Capacity Building" },
];

export const INDUSTRIES: readonly NavLink[] = [
  { href: "/industries/agriculture", label: "Agriculture" },
  { href: "/industries/livestock", label: "Livestock" },
  { href: "/industries/agribusiness", label: "Agribusiness" },
  { href: "/industries/development-organisations", label: "Development Organisations" },
  { href: "/industries/smes", label: "SMEs" },
  { href: "/industries/light-manufacturing", label: "Light Manufacturing" },
  { href: "/industries/public-sector", label: "Public Sector" },
];

export const EXPLORE: readonly NavLink[] = [
  { href: "/insights", label: "Insights" },
  { href: "/publications", label: "Publications" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export const LEGAL: readonly NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
