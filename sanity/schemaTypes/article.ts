import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt, seoField, slugField } from "../lib/fields";

export const article = defineType({
  name: "article",
  title: "Article",
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
      name: "excerpt",
      title: "Excerpt",
      description: "1–2 sentences shown on article cards and in search results.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    imageWithAlt("coverImage", "Cover image"),
    defineField({
      name: "body",
      title: "Article",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "One category, used for the filter on the Insights page.",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedServices",
      title: "Related services",
      description: "At least one — the article links readers to these services (seo-page skill).",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last meaningful update",
      description: "Set only when the content changes substantially (shown to readers and Google).",
      type: "datetime",
    }),
    seoField(),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
