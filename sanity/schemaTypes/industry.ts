import { defineArrayMember, defineField, defineType } from "sanity";
import { orderField, seoField, slugField } from "../lib/fields";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField(),
    orderField(),
    defineField({
      name: "summary",
      title: "Summary",
      description: "1–2 sentences for the industry page and the industries grid.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Page content", type: "blockContent" }),
    defineField({
      name: "challenges",
      title: "Challenges we help with",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    seoField(),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});
