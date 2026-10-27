import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Founder spotlight: name and title left (5 cols), short bio and credentials right (7 cols).
 * No portrait here — the hero already shows it.
 */
export function FounderSpotlight({
  name,
  title,
  shortBio,
  credentials,
}: {
  name: string;
  title: string | null;
  shortBio: string | null;
  credentials: string[] | null;
}) {
  return (
    <section aria-labelledby="founder-heading" className="py-16 md:py-28">
      <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Eyebrow>The founder</Eyebrow>
          <h2
            id="founder-heading"
            className="font-display text-ink mt-3 max-w-[14ch] text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.15] font-medium text-balance"
          >
            {name}
          </h2>
          {title ? <p className="text-ink-muted mt-3">{title}</p> : null}
        </div>

        <div className="md:border-line md:col-span-7 md:border-l md:pl-12">
          {shortBio ? (
            <p className="text-ink max-w-[60ch] text-lg leading-relaxed">{shortBio}</p>
          ) : null}
          {credentials?.length ? (
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="border-gold text-ink border-l-2 pl-4 text-[0.95rem]"
                >
                  {credential}
                </li>
              ))}
            </ul>
          ) : null}
          <Button href="/about" variant="link" className="mt-10">
            About the founder
          </Button>
        </div>
      </Container>
    </section>
  );
}
