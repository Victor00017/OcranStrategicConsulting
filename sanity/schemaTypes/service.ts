import { defineArrayMember, defineField, defineType } from "sanity";
import { seoField, slugField } from "../lib/fields";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    slugField(),
    defineField({
      name: "summary",
      title: "Summary",
      description: "Shown under the title on the service page and on service cards. 1–2 sentences.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subServices",
      title: "What's included",
      description: 'e.g. "Feasibility Studies", "Value Chain Analysis".',
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "body", title: "Page content", type: "blockContent" }),
    defineField({
      name: "outcomes",
      title: "Outcomes for clients",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "faqs",
      title: "Frequently asked questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "relatedIndustries",
      title: "Related industries",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })],
    }),
    seoField(),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});
