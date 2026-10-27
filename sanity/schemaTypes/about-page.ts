import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton. The firm's story, mission, vision and values for /about (client's Website Structure doc). */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "companyStory",
      title: "Company story",
      description: "1–3 sentences under the page heading.",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 3 }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
