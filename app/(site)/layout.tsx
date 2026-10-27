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
    </SiteShell>
  );
}
