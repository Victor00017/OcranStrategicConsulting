import { defineArrayMember, defineField, defineType } from "sanity";
import { permissionField, seoField, slugField } from "../lib/fields";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
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
      name: "client",
      title: "Client",
      description: 'Use "Confidential client" unless the client agreed to be named.',
      type: "string",
      initialValue: "Confidential client",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "sector", title: "Sector", type: "string" }),
    defineField({ name: "challenge", title: "The challenge", type: "text", rows: 5 }),
    defineField({ name: "approach", title: "Our approach", type: "text", rows: 5 }),
    defineField({
      name: "results",
      title: "Results",
      description: "Only results the client has confirmed. One per line.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.integer().min(1950).max(2100),
    }),
    permissionField(),
    seoField(),
  ],
  preview: { select: { title: "title", subtitle: "client" } },
});
