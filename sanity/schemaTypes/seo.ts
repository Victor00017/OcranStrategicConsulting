import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search & sharing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Search title",
      description: "Shown as the link in Google. Up to 60 characters.",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Search description",
      description: "Shown under the link in Google. Aim for 140–160 characters.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Sharing image",
      description: "Shown when the page is shared on WhatsApp, LinkedIn or X. 1200 × 630 px.",
      type: "image",
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
