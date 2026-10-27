import { article } from "./article";
import { blockContent } from "./block-content";
import { caseStudy } from "./case-study";
import { enquiry } from "./enquiry";
import { founder } from "./founder";
import { homePage } from "./home-page";
import { industry } from "./industry";
import { publication } from "./publication";
import { seo } from "./seo";
import { service } from "./service";
import { siteSettings } from "./site-settings";
import { testimonial } from "./testimonial";

// Content model: docs/PROJECT-BRIEF.md §5. `book` and `resource` are on hold (D-016).
export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  founder,
  // Documents
  service,
  industry,
  article,
  publication,
  caseStudy,
  testimonial,
  enquiry,
  // Objects
  seo,
  blockContent,
];

/** One document each, edited in place; hidden from "Create new" (see sanity/structure.ts). */
export const SINGLETON_TYPES = new Set(["siteSettings", "homePage", "founder"]);
