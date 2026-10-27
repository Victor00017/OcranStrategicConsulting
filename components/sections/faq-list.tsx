import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo";

type Faq = { _key: string; question: string; answer: string };

/**
 * FAQ accordion on native <details> — keyboard and screen-reader support with zero JS (DESIGN.md §4).
 * Renders FAQPage JSON-LD for exactly the questions shown.
 */
export function FaqList({ id, faqs }: { id: string; faqs: Faq[] }) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="font-display text-ink text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium"
      >
        Frequently asked questions
      </h2>
      <div className="border-line mt-8 border-t">
        {faqs.map((faq) => (
          <details key={faq._key} className="group border-line border-b">
            <summary className="text-ink hover:text-gold-text flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden="true"
                className="text-gold text-2xl leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="text-ink-muted max-w-[68ch] pb-6 leading-relaxed whitespace-pre-line">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
