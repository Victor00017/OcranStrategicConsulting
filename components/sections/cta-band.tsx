import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * CTA band (ocran-frontend-design): ink background, gold-light eyebrow, ivory Bodoni heading,
 * inverted primary button. One dark band per page.
 */
export function CtaBand({
  eyebrow,
  heading,
  action,
}: {
  eyebrow: string;
  heading: ReactNode;
  action: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="cta-heading" className="bg-ink text-ivory">
      <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
        <div>
          <p className="text-gold-light text-xs font-medium tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
          <h2
            id="cta-heading"
            className="font-display mt-4 max-w-[20ch] text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.15] font-medium text-balance"
          >
            {heading}
          </h2>
        </div>
        <Button href={action.href} variant="inverse" size="lg" className="self-start md:self-auto">
          {action.label}
        </Button>
      </Container>
    </section>
  );
}
