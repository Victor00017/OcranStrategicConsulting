import { defineField } from "sanity";

/** Image with hotspot and a required alt text (sanity-content skill: every image needs alt). */
export function imageWithAlt(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        description:
          'Describe the image for people who can\'t see it. Leave out "image of". Required.',
        type: "string",
        validation: (rule) => rule.required(),
      }),
    ],
  });
}

export function slugField() {
  return defineField({
    name: "slug",
    title: "Web address",
    description: 'The last part of the page address, e.g. "agribusiness-advisory". Click Generate.',
    type: "slug",
    options: { source: "title", maxLength: 96 },
    validation: (rule) => rule.required(),
  });
}

/** Position in lists (services, industries). Lower numbers come first. */
export function orderField() {
  return defineField({
    name: "order",
    title: "Position",
    description: "Where this appears in lists. 1 = first.",
    type: "number",
    validation: (rule) => rule.integer().min(1),
  });
}

export function seoField() {
  return defineField({
    name: "seo",
    title: "Search & sharing",
    description: "Optional. Leave blank to use the title and summary.",
    type: "seo",
  });
}

/**
 * Case studies and testimonials may only be published with the client's written permission
 * (D-008). An error-level validation blocks publishing in the Studio.
 */
export function requirePermission(value: unknown): true | string {
  return value === true
    ? true
    : "Tick this only once you have written permission. Publishing is blocked until then.";
}

export function permissionField() {
  return defineField({
    name: "permissionConfirmed",
    title: "Written permission received",
    description: "Required before publishing. Keep the written permission on file.",
    type: "boolean",
    initialValue: false,
    validation: (rule) => rule.custom(requirePermission),
  });
}
