import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Top of an inner page: optional breadcrumbs, gold eyebrow, the page's single H1, an intro paragraph,
 * and a gold hairline. Same type scale as the home hero, one step smaller.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string | null;
  breadcrumbs?: ReactNode;
}) {
  return (
    <header className="border-line border-b">
      <Container className="py-12 md:py-20">
        {breadcrumbs ? <div className="mb-10">{breadcrumbs}</div> : null}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-ink mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] leading-[1.08] font-medium text-balance">
          {title}
        </h1>
        <span aria-hidden="true" className="bg-gold mt-8 block h-px w-24" />
        {intro ? (
          <p className="text-ink-muted mt-8 max-w-[60ch] text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed">
            {intro}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
