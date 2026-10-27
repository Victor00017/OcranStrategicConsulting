import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton. The only place contact details live (AGENTS.md §5, D-004). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Business name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "valueProp",
      title: "Value proposition",
      description: "One or two sentences used on the home page and in search results.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "servicesIntro",
      title: "Services page introduction",
      description: "1–2 sentences under the heading on /services.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "industriesIntro",
      title: "Industries page introduction",
      description: "1–2 sentences under the heading on /industries.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "proofPoints",
      title: "Proof points",
      description:
        'The headline numbers on the home page, e.g. "43" + "publications". Use exact, verifiable figures. Up to 4.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "proofPoint",
          fields: [
            defineField({
              name: "value",
              title: "Number",
              description: 'Shown large, e.g. "35+".',
              type: "string",
              validation: (rule) => rule.required().max(8),
            }),
            defineField({
              name: "label",
              title: "Label",
              description: 'e.g. "years of experience".',
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "contactEmails",
      title: "Contact email addresses",
      type: "array",
      of: [defineArrayMember({ type: "string", validation: (rule) => rule.email() })],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      description: "International format, e.g. +233 …",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      description: "International format without spaces, e.g. +233…",
      type: "string",
    }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({
      name: "geo",
      title: "Map location",
      description: "Used for Google and the contact page map.",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["LinkedIn", "X", "Facebook", "YouTube", "Instagram", "Other"] },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Address",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default sharing image",
      description: "Used when a page has no sharing image of its own. 1200 × 630 px.",
      type: "image",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
