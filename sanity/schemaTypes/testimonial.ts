import { defineField, defineType } from "sanity";
import { permissionField } from "../lib/fields";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      description: "Exactly as the person wrote or approved it.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "org", title: "Organisation", type: "string" }),
    permissionField(),
  ],
  preview: { select: { title: "name", subtitle: "org" } },
});
