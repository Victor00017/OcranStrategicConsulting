import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";
import { typeTag } from "./tags";

/** Site settings, or null until the Sanity project exists (D-017). Cached under the `siteSettings` tag. */
export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  return sanityFetch({ query: SITE_SETTINGS_QUERY, tags: [typeTag("siteSettings")] });
}
