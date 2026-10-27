/**
 * `pnpm seed` — load sanity/seed/content.ts into the Sanity project (docs/SETUP.md §5, step 7).
 * Runs through `sanity exec --with-user-token`, so it uses your Sanity login, not a stored token.
 * Uses createIfNotExists with fixed IDs: safe to re-run, and it never overwrites the client's edits.
 */
import { createReadStream } from "node:fs";
import { getCliClient } from "sanity/cli";
import { PORTRAIT_FILE, SEED, summaryTodo } from "./content";

const client = getCliClient({ apiVersion: "2026-10-01" });

async function run() {
  const { siteSettings, founder, services, industries } = SEED;
  const tx = client.transaction();

  tx.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettings,
    proofPoints: siteSettings.proofPoints.map((point) => ({ _type: "proofPoint", ...point })),
  });

  const existingFounder = await client.getDocument("founder");
  if (!existingFounder) {
    const asset = await client.assets.upload("image", createReadStream(PORTRAIT_FILE), {
      filename: "founder-portrait.jpg",
    });
    tx.createIfNotExists({
      _id: "founder",
      _type: "founder",
      name: founder.name,
      title: founder.title,
      shortBio: founder.shortBio,
      credentials: founder.credentials,
      portrait: {
        _type: "image",
        alt: founder.portrait.alt,
        asset: { _type: "reference", _ref: asset._id },
      },
    });
  }

  services.forEach((service, index) =>
    tx.createIfNotExists({
      _id: `service-${service.slug}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      order: index + 1,
      summary: summaryTodo(service.title),
      subServices: service.subServices,
    }),
  );

  industries.forEach((industry, index) =>
    tx.createIfNotExists({
      _id: `industry-${industry.slug}`,
      _type: "industry",
      title: industry.title,
      slug: { _type: "slug", current: industry.slug },
      order: index + 1,
      summary: summaryTodo(industry.title),
    }),
  );

  const result = await tx.commit();
  console.log(
    `Seed done: ${result.results.length} documents checked (existing ones left untouched).`,
  );
}

run().catch((error: unknown) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
