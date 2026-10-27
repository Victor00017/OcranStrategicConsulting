import { getServices } from "@/lib/content/services";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { SITE_NAME, STATIC_ROUTES, TAGLINE, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const PAGE_NAMES: Record<(typeof STATIC_ROUTES)[number], string> = {
  "/": "Home",
  "/services": "Services",
};

/**
 * /llms.txt — plain-text summary for AI search engines (docs/SEO.md §1, llmstxt.org format).
 * Facts only from the client's material: name, tagline, location, service lines, value proposition from Sanity.
 */
export async function GET() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const lines = [
    `# ${settings?.name || SITE_NAME}`,
    "",
    `> ${settings?.tagline || TAGLINE}`,
    "",
    ...(settings?.valueProp ? [settings.valueProp, ""] : []),
    "Based in Tema, Greater Accra, Ghana, serving clients across Sub-Saharan Africa.",
    "",
    "## Service lines",
    "",
    ...services.map(
      (service) => `- [${service.title}](${absoluteUrl(`/services/${service.slug}`)})`,
    ),
    "",
    "## Pages",
    "",
    ...STATIC_ROUTES.map((path) => `- [${PAGE_NAMES[path]}](${absoluteUrl(path)})`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
