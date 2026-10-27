import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Home hero (D-024): the offer first. 7/5 split — eyebrow, Bodoni H1 (tagline), value proposition and two
 * CTAs on the left; a "What we deliver" panel on the right listing the documents and programmes clients
 * receive. The founder appears further down (FounderStrip) and on About.
 */
export function HomeHero({
  tagline,
  valueProp,
  deliverables,
}: {
  tagline: string;
  valueProp: string | null;
  deliverables: string[];
}) {
  return (
    <section aria-labelledby="home-title">
      <Container className="grid items-center gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-7">
          <Eyebrow>Strategic consulting · Tema</Eyebrow>
          <h1
            id="home-title"
            className="font-display text-ink mt-5 max-w-[14ch] text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.05] font-medium text-balance"
          >
            {tagline}
          </h1>
          <span aria-hidden="true" className="bg-gold mt-8 block h-px w-24" />
          {valueProp ? (
            <p className="text-ink-muted mt-8 max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed">
              {valueProp}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Request a consultation
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore services
            </Button>
          </div>
        </div>

        {deliverables.length ? (
          <aside aria-labelledby="deliver-heading" className="md:col-span-5 md:pl-6">
            <div className="bg-paper border-line relative rounded-[2px] border p-8">
              <span aria-hidden="true" className="bg-gold absolute top-0 left-8 h-0.5 w-16" />
              <h2
                id="deliver-heading"
                className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase"
              >
                What we deliver
              </h2>
              <ul className="mt-6 flex flex-col">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-line text-ink flex gap-4 border-b py-3.5 font-medium last:border-b-0"
                  >
                    <span aria-hidden="true" className="bg-gold mt-[0.7em] h-px w-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
