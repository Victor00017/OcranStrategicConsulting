import { defineField, defineType } from "sanity";

/**
 * Written by /api/contact (build step 9). Everything except `status` is read-only in the Studio,
 * so the editor can track follow-up without changing what the enquirer sent.
 */
export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", readOnly: true }),
    defineField({
      name: "sourcePage",
      title: "Sent from page",
      type: "string",
      readOnly: true,
    }),
    defineField({ name: "createdAt", title: "Received", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Replied", value: "replied" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "status" } },
});
