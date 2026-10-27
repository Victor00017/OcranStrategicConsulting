import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Audience = {
  _key: string;
  title: string;
  needs: string;
  ctaLabel: string;
  serviceSlug: string | null;
};

/**
 * "Who we work with" (brief §2, D-024): one card per client type, each with its own call to action.
 * The button prefills the contact form with the most relevant service (D-021).
 */
export function AudienceCards({ audiences }: { audiences: Audience[] }) {
  return (
    <section aria-labelledby="audiences-heading" className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeading id="audiences-heading" eyebrow="Who we work with">
          Advice shaped to the client in front of us
        </SectionHeading>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <li
              key={audience._key}
              className="bg-paper border-line flex flex-col rounded-[2px] border p-6"
            >
              <h3 className="text-ink text-xl leading-snug font-medium">{audience.title}</h3>
              <p className="text-ink-muted mt-3 flex-1">{audience.needs}</p>
              <Button
                href={
                  audience.serviceSlug ? `/contact?service=${audience.serviceSlug}` : "/contact"
                }
                variant="link"
                className="mt-6 self-start"
              >
                {audience.ctaLabel}
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
