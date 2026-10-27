import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getServices } from "@/lib/content/services";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Request a consultation with Ocran Strategic Consulting in Tema, Ghana — strategy, agribusiness advisory, SME growth, fundraising, policy research and training.",
  path: "/contact",
});

/**
 * /contact (build step 9, D-028). Reads `?service=<slug>` so "Request a consultation" buttons
 * preselect the service (D-021). Contact details come only from Sanity Site settings (D-004) and
 * appear once they're entered there.
 */
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [{ service }, services, settings] = await Promise.all([
    searchParams,
    getServices(),
    getSiteSettings(),
  ]);
  const options = services.map(({ slug, title }) => ({ slug, title }));
  const preselected =
    typeof service === "string" && options.some((o) => o.slug === service) ? service : undefined;

  const emails = settings?.contactEmails ?? [];
  const whatsappDigits = settings?.whatsapp?.replace(/\D/g, "");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a consultation"
        intro="Tell us about your organisation and what you need. We'll reply by email to arrange a conversation."
      />
      <Container className="grid gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-8 md:pr-8">
          <ContactForm services={options} defaultService={preselected} />
        </div>

        <aside aria-label="Other ways to reach us" className="md:col-span-4">
          <div className="border-gold border-t pt-6">
            <Eyebrow>Where we are</Eyebrow>
            <p className="text-ink mt-3">Tema, Greater Accra, Ghana</p>
            <p className="text-ink-muted mt-1 text-sm">Serving clients across Sub-Saharan Africa</p>
          </div>

          {emails.length || settings?.phone || whatsappDigits ? (
            <div className="border-line mt-10 border-t pt-6">
              <Eyebrow>Direct contact</Eyebrow>
              <ul className="mt-3 flex flex-col gap-2">
                {emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="text-gold-text underline underline-offset-4"
                    >
                      {email}
                    </a>
                  </li>
                ))}
                {settings?.phone ? (
                  <li>
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-ink">
                      {settings.phone}
                    </a>
                  </li>
                ) : null}
                {whatsappDigits ? (
                  <li>
                    <a href={`https://wa.me/${whatsappDigits}`} className="text-ink">
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </aside>
      </Container>
    </>
  );
}
