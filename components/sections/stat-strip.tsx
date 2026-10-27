import { Container } from "@/components/ui/container";

type ProofPoint = { _key: string; value: string; label: string };

/**
 * Proof strip (ocran-frontend-design "Stat strip"): Bodoni numerals in gold, Jost labels, hairline dividers.
 * Numbers come from Sanity siteSettings.proofPoints — exact figures only (brief §1).
 */
export function StatStrip({ points }: { points: ProofPoint[] }) {
  return (
    <section aria-label="Key figures" className="border-line border-y">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {points.map((point, index) => (
            <div
              key={point._key}
              // Hairlines: 2×2 grid on mobile (left rule on the right column, top rule on row 2),
              // one row of four from md (left rule on all but the first).
              className={[
                // justify-end packs from the top in column-reverse, so numbers line up when a label wraps.
                "border-line flex flex-col-reverse justify-end gap-2 py-8 md:py-10",
                index % 2 === 1 && "border-l pl-6",
                index >= 2 && "border-t md:border-t-0",
                index > 0 && "md:border-l md:pl-8",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className="text-ink-muted max-w-[18ch] text-sm leading-snug">{point.label}</dt>
              <dd className="font-display text-gold text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-medium">
                {point.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
