import { defineField, defineType } from "sanity";
import { slugField } from "../lib/fields";

/** Privacy notice and terms of use (/privacy, /terms). Editable so the client's lawyer can revise them. */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
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
      name: "lastUpdated",
      title: "Last updated",
      description: "Shown at the top of the page. Change it whenever the text changes.",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "lastUpdated" } },
});
