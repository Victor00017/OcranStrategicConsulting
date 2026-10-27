/**
 * `pnpm seed` — load the seed (./content.ts facts + ./copy.ts drafts) into Sanity (docs/SETUP.md §5, step 7).
 * Runs through `sanity exec --with-user-token`, so it uses your Sanity login, not a stored token.
 * Safe to re-run: creates missing documents, and on existing ones fills only fields that are empty or
 * still hold a {{TODO}} marker. Anything the client has written is never overwritten.
 */
import { createReadStream } from "node:fs";
import { getCliClient } from "sanity/cli";
import { PORTRAIT_FILE, SEED } from "./content";
import { HOME_COPY, INDUSTRY_COPY, PAGE_INTROS, SERVICE_COPY } from "./copy";

const client = getCliClient({ apiVersion: "2026-10-01" });
const tx = client.transaction();
const report: string[] = [];

type Doc = { _id: string; _type: string } & Record<string, unknown>;

const isFillable = (value: unknown) =>
  value == null ||
  (typeof value === "string" && value.includes("{{TODO")) ||
  (Array.isArray(value) && value.length === 0);

const ref = (id: string, key: string) => ({ _type: "reference", _ref: id, _key: key });

async function upsert(doc: Doc) {
  const existing = await client.getDocument(doc._id);
  if (!existing) {
    tx.create(doc);
    report.push(`created ${doc._id}`);
    return;
  }
  const set = Object.fromEntries(
    Object.entries(doc).filter(([key]) => !key.startsWith("_") && isFillable(existing[key])),
  );
  if (Object.keys(set).length) {
    tx.patch(doc._id, (patch) => patch.set(set));
    report.push(`filled ${doc._id}: ${Object.keys(set).join(", ")}`);
  }
}

async function run() {
  const { siteSettings, founder, services, industries } = SEED;

  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettings,
    ...PAGE_INTROS,
    proofPoints: siteSettings.proofPoints.map((point) => ({ _type: "proofPoint", ...point })),
  });

  await upsert({
    _id: "homePage",
    _type: "homePage",
    deliverables: HOME_COPY.deliverables,
    audiences: HOME_COPY.audiences.map(({ serviceSlug, ...audience }) => ({
      _type: "audience",
      ...audience,
      service: { _type: "reference", _ref: `service-${serviceSlug}` },
    })),
    process: HOME_COPY.process.map((step) => ({ _type: "processStep", ...step })),
    trackRecord: HOME_COPY.trackRecord.map((item) => ({ _type: "trackRecordItem", ...item })),
  });

  const existingFounder = await client.getDocument("founder");
  const portraitAsset = existingFounder?.portrait
    ? null
    : await client.assets.upload("image", createReadStream(PORTRAIT_FILE), {
        filename: "founder-portrait.jpg",
      });
  await upsert({
    _id: "founder",
    _type: "founder",
    name: founder.name,
    title: founder.title,
    shortBio: founder.shortBio,
    credentials: founder.credentials,
    ...(portraitAsset
      ? {
          portrait: {
            _type: "image",
            alt: founder.portrait.alt,
            asset: { _type: "reference", _ref: portraitAsset._id },
          },
        }
      : {}),
  });

  for (const [index, service] of services.entries()) {
    const copy = SERVICE_COPY[service.slug];
    await upsert({
      _id: `service-${service.slug}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      order: index + 1,
      subServices: service.subServices,
      ...(copy
        ? {
            summary: copy.summary,
            deliverables: copy.deliverables,
            outcomes: copy.outcomes,
            faqs: copy.faqs.map((faq) => ({ _type: "faq", ...faq })),
            relatedIndustries: copy.industries.map((slug) => ref(`industry-${slug}`, slug)),
          }
        : {}),
    });
  }

  for (const [index, industry] of industries.entries()) {
    const copy = INDUSTRY_COPY[industry.slug];
    await upsert({
      _id: `industry-${industry.slug}`,
      _type: "industry",
      title: industry.title,
      slug: { _type: "slug", current: industry.slug },
      order: index + 1,
      ...(copy ? { summary: copy.summary, challenges: copy.challenges } : {}),
    });
  }

  await tx.commit();
  console.log(
    report.length ? report.join("\n") : "Nothing to do — every field already has content.",
  );
}

run().catch((error: unknown) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
