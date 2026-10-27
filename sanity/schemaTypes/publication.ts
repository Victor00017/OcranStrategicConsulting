import { defineField, defineType } from "sanity";

/** Listed on /publications. Books appear here as type "book" while the books showcase is on hold (D-016). */
export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "Journal article", value: "journal" },
          { title: "Policy brief", value: "brief" },
          { title: "Report", value: "report" },
          { title: "Book chapter", value: "chapter" },
          { title: "Thesis", value: "thesis" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required().integer().min(1950).max(2100),
    }),
    defineField({ name: "publisher", title: "Publisher or journal", type: "string" }),
    defineField({
      name: "url",
      title: "Link",
      description: "Where to read or buy it.",
      type: "url",
    }),
    defineField({ name: "doi", title: "DOI", description: "e.g. 10.1000/xyz123", type: "string" }),
  ],
  orderings: [
    { title: "Newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", type: "type", year: "year" },
    prepare: ({ title, type, year }) => ({
      title,
      subtitle: [type, year].filter(Boolean).join(" · "),
    }),
  },
});
