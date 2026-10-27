import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

// next-sanity's metadata includes `robots: noindex` and the viewport the Studio needs.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-ink text-3xl font-medium">Studio not connected</h1>
        <p className="text-ink-muted mt-4">
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>{" "}
          in <code>.env.local</code> (or in Vercel), then restart the server. See docs/SETUP.md §5.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
