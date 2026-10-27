/**
 * Sanity connection settings. Public values only — tokens are read server-side where they are used.
 * The site builds without a project (D-017): `isSanityConfigured` is false until
 * NEXT_PUBLIC_SANITY_PROJECT_ID is set, and the Studio shows setup instructions instead.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-10-01";

export const isSanityConfigured = projectId !== "";
