import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Compact founder introduction for the home page (D-024): small portrait, name, title, one-paragraph bio
 * and a link to About, where the full profile and credentials live.
 */
export function FounderStrip({
  name,
  title,
  shortBio,
  portrait,
}: {
  name: string;
  title: string | null;
  shortBio: string | null;
  portrait: { url: string | null; alt: string } | null;
}) {
  return (
    <section aria-labelledby="founder-heading" className="py-16 md:py-24">
      <Container className="grid items-center gap-8 md:grid-cols-12">
        {portrait?.url ? (
          <div className="md:col-span-2">
            <div className="relative size-28 md:size-32">
              <span
                aria-hidden="true"
                className="border-gold absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full border"
              />
              <Image
                src={portrait.url}
                alt={portrait.alt}
                fill
                sizes="8rem"
                className="relative rounded-full object-cover"
              />
            </div>
          </div>
        ) : null}
        <div className="md:col-span-10">
          <p className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase">
            Who leads the work
          </p>
          <h2
            id="founder-heading"
            className="font-display text-ink mt-3 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium"
          >
            {name}
          </h2>
          {title ? <p className="text-ink-muted mt-1">{title}</p> : null}
          {shortBio ? (
            <p className="text-ink mt-4 max-w-[70ch] leading-relaxed">{shortBio}</p>
          ) : null}
          <Button href="/about" variant="link" className="mt-6">
            About the founder
          </Button>
        </div>
      </Container>
    </section>
  );
}
