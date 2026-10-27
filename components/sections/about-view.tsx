import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { AboutContent } from "@/lib/content/about";
import { personJsonLd } from "@/lib/seo";
import { CtaBand } from "./cta-band";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

const h2 = "font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium";

/**
 * /about (brief page job: the founder's story, credentials and reach; the firm's mission, vision and
 * values). Order: firm intro · mission/vision/values · founder profile · credentials + expertise ·
 * countries · CTA. Sections hide when their content is empty.
 */
export function AboutView({ content }: { content: AboutContent }) {
  const { about, founder } = content;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Ocran Strategic Consulting"
        intro={about?.companyStory}
      />

      {about?.mission || about?.vision || about?.values?.length ? (
        <section aria-label="Mission, vision and values" className="py-16 md:py-24">
          <Container className="grid gap-12 md:grid-cols-3 md:gap-8">
            {about.mission ? <Statement label="Mission" text={about.mission} /> : null}
            {about.vision ? <Statement label="Vision" text={about.vision} /> : null}
            {about.values?.length ? (
              <div className="border-gold border-t pt-6">
                <Eyebrow>Values</Eyebrow>
                <ul className="text-ink mt-4 flex flex-col gap-2 text-xl font-medium">
                  {about.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {founder ? (
        <>
          <JsonLd data={personJsonLd(founder)} />
          <section aria-labelledby="founder-heading" className="bg-sand py-16 md:py-28">
            <Container className="grid gap-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                {founder.portrait?.url ? (
                  <div className="relative aspect-square w-full max-w-[16rem]">
                    <span
                      aria-hidden="true"
                      className="border-gold absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-full border"
                    />
                    <Image
                      src={founder.portrait.url}
                      alt={founder.portrait.alt}
                      fill
                      sizes="16rem"
                      className="relative rounded-full object-cover"
                    />
                  </div>
                ) : null}
                <Eyebrow className="mt-10">The founder</Eyebrow>
                <h2 id="founder-heading" className={`${h2} mt-3`}>
                  {founder.name}
                </h2>
                {founder.title ? <p className="text-ink-muted mt-2">{founder.title}</p> : null}
              </div>
              <div className="md:col-span-8">
                {founder.shortBio ? (
                  <p className="text-ink max-w-[68ch] text-[1.25rem] leading-relaxed">
                    {founder.shortBio}
                  </p>
                ) : null}
                {founder.longBio?.length ? (
                  <div className="mt-6">
                    <Prose value={founder.longBio} />
                  </div>
                ) : null}
              </div>
            </Container>
          </section>

          {founder.credentials?.length || founder.expertise?.length ? (
            <section aria-label="Credentials and expertise" className="py-16 md:py-24">
              <Container className="grid gap-14 md:grid-cols-12 md:gap-8">
                {founder.credentials?.length ? (
                  <div className="md:col-span-5">
                    <h2 className={h2}>Education and credentials</h2>
                    <ul className="mt-8 flex flex-col gap-4">
                      {founder.credentials.map((credential) => (
                        <li key={credential} className="border-gold text-ink border-l-2 pl-4">
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {founder.expertise?.length ? (
                  <div className="md:col-span-7 md:pl-8">
                    <h2 className={h2}>Areas of expertise</h2>
                    <ul className="mt-8 flex flex-wrap gap-2.5">
                      {founder.expertise.map((area) => (
                        <li
                          key={area}
                          className="border-line text-ink bg-paper rounded-[2px] border px-3.5 py-2 text-[0.95rem]"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Container>
            </section>
          ) : null}

          {founder.countries?.length ? (
            <section
              aria-labelledby="countries-heading"
              className="border-line border-t py-16 md:py-24"
            >
              <Container>
                <h2 id="countries-heading" className={h2}>
                  Missions across Africa, Asia and Europe
                </h2>
                <ul className="text-ink mt-8 columns-2 gap-8 sm:columns-3 lg:columns-5">
                  {founder.countries.map((country) => (
                    <li key={country} className="border-line break-inside-avoid border-b py-2.5">
                      {country}
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          ) : null}
        </>
      ) : null}

      <CtaBand
        eyebrow="Contact"
        heading="Start a conversation"
        action={{ href: "/contact", label: "Request a consultation" }}
      />
    </>
  );
}

function Statement({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-gold border-t pt-6">
      <Eyebrow>{label}</Eyebrow>
      {/* Jost, not Bodoni: DESIGN.md §2 keeps Bodoni for 32px+ headings. */}
      <p className="text-ink mt-4 text-xl leading-relaxed">{text}</p>
    </div>
  );
}
