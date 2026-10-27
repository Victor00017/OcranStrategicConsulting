import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt } from "../lib/fields";

/** Singleton. Founder profile for About, the home spotlight and the article author box. */
export const founder = defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Job title", type: "string" }),
    imageWithAlt("portrait", "Portrait", "A real photograph — no AI-generated images."),
    defineField({
      name: "shortBio",
      title: "Short bio",
      description: "2–3 sentences for the home page and article author box.",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "longBio", title: "Full bio", type: "blockContent" }),
    defineField({
      name: "credentials",
      title: "Credentials",
      description: "Degrees, memberships, certifications — one per line.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "alumniOf",
      title: "Universities attended",
      description: "Used by search engines (Person profile). One institution per line.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "expertise",
      title: "Areas of expertise",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "countries",
      title: "Countries worked in",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: { select: { title: "name", subtitle: "title", media: "portrait" } },
});
