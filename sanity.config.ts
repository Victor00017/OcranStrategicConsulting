"use client";

/**
 * Sanity Studio, embedded at /studio (app/studio/[[...tool]]/page.tsx).
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { SINGLETON_TYPES, schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Singletons can only be edited and published — not duplicated or deleted.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Ocran Strategic Consulting",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
    // Enquiries are created by the contact form only.
    newDocumentOptions: (options) => options.filter(({ templateId }) => templateId !== "enquiry"),
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
