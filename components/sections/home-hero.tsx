import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type Portrait = { url: string | null; alt: string } | null;

/**
 * Home hero (ocran-frontend-design "Hero"): 7/5 split — eyebrow, Bodoni H1, value proposition and two
 * CTAs on the left; founder portrait on the right. The portrait is a circle with an offset gold ring
 * until an uncropped original arrives (D-019).
 */
export function HomeHero({
  tagline,
  valueProp,
  portrait,
}: {
  tagline: string;
  valueProp: string | null;
  portrait: Portrait;
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

        {portrait?.url ? (
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[19rem] md:max-w-[24rem]">
              <span
                aria-hidden="true"
                className="border-gold absolute inset-0 translate-x-3 translate-y-3 rounded-full border"
              />
              <Image
                src={portrait.url}
                alt={portrait.alt}
                fill
                preload
                sizes="(min-width: 768px) 24rem, 19rem"
                className="relative rounded-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
