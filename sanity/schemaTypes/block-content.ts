import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt } from "../lib/fields";

/** Rich text for article bodies, long bios and service/industry pages. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // No H1: the page title is the only H1 (AGENTS.md §5).
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Address",
                type: "url",
                validation: (rule) =>
                  rule
                    .required()
                    .uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember(imageWithAlt("image", "Image")),
  ],
});
