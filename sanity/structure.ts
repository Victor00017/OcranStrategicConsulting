import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: singletons first (opened directly, one document each), then content, then enquiries. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Founder")
        .id("founder")
        .child(S.document().schemaType("founder").documentId("founder")),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("industry").title("Industries"),
      S.documentTypeListItem("article").title("Insights"),
      S.documentTypeListItem("publication").title("Publications"),
      S.documentTypeListItem("caseStudy").title("Case studies"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("enquiry").title("Enquiries"),
    ]);
