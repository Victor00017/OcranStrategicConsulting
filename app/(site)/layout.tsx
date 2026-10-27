import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/sections/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { organizationJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <SiteShell>
      <JsonLd data={organizationJsonLd(settings)} />
      {children}
      {/* Cookie-free visitor counts and Core Web Vitals (D-029). Public pages only, not /studio. */}
      <Analytics />
      <SpeedInsights />
    </SiteShell>
  );
}
