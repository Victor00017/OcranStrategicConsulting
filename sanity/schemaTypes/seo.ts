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
      description:
        'The complete title shown as the link in Google, up to 60 characters — end with the firm name if it fits. Leave blank to use the page name + " | Ocran Strategic Consulting".',
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
