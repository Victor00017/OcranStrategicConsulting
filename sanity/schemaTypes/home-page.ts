import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton. The home page's own sections (D-024): what we deliver, who we work with, how we work,
 * and the founder's track record. Services, industries and proof numbers come from their own documents.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "deliverables",
      title: "What we deliver",
      description:
        "Short list beside the main heading — the documents and programmes clients receive. Up to 6.",
      type: "array",
      of: [defineArrayMember({ type: "string", validation: (rule) => rule.max(60) })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "audiences",
      title: "Who we work with",
      description:
        "One card per type of client. Each links to the most relevant service's enquiry form.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "audience",
          fields: [
            defineField({
              name: "title",
              title: "Who",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "needs",
              title: "What they come to us for",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "ctaLabel",
              title: "Button text",
              description: 'e.g. "Request a consultation".',
              type: "string",
              validation: (rule) => rule.required().max(30),
            }),
            defineField({
              name: "service",
              title: "Service the button enquires about",
              type: "reference",
              to: [{ type: "service" }],
            }),
          ],
          preview: { select: { title: "title", subtitle: "ctaLabel" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "process",
      title: "How we work",
      description: "The steps behind the tagline, in order. Up to 4.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: [
            defineField({
              name: "title",
              title: "Step",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "What happens",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "trackRecord",
      title: "Track record",
      description:
        "Results from the founder's career. Say where each happened — the firm itself started in 2026 (D-024).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "trackRecordItem",
          fields: [
            defineField({
              name: "context",
              title: "Where / when",
              description: 'e.g. "CSIR" or "African Union Commission, 2012–2022".',
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "result",
              title: "Result",
              description: "Exact, verifiable wording only.",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "context", subtitle: "result" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
