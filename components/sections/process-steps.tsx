import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = { _key: string; title: string; description: string };

/** "How we work": the tagline as numbered steps, joined by a gold hairline on desktop. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <section aria-labelledby="process-heading" className="border-line border-t py-16 md:py-28">
      <Container>
        <SectionHeading id="process-heading" eyebrow="How we work">
          From insights to strategy, step by step
        </SectionHeading>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li key={step._key} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-gold text-4xl leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="bg-gold/40 hidden h-px flex-1 md:block" />
              </div>
              <h3 className="text-ink mt-5 text-[1.5rem] font-medium">{step.title}</h3>
              <p className="text-ink-muted mt-3 max-w-[40ch] leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
