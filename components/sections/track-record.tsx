import { Container } from "@/components/ui/container";

type ProofPoint = { _key: string; value: string; label: string };
type Result = { _key: string; context: string; result: string };

/**
 * Track record (D-024) on the page's one field-green band (DESIGN.md §1): the headline numbers, then
 * results from the founder's career, each attributed to where it happened — the firm started in 2026.
 */
export function TrackRecord({ points, results }: { points: ProofPoint[]; results: Result[] }) {
  return (
    <section aria-labelledby="record-heading" className="bg-field text-ivory py-16 md:py-28">
      <Container>
        {/* Small text on field is ivory: gold-light measures 4.16:1 there, under AA for small text. */}
        <p className="text-ivory/80 text-xs font-medium tracking-[0.2em] uppercase">Track record</p>
        <h2
          id="record-heading"
          className="font-display mt-3 max-w-[22ch] text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.15] font-medium text-balance"
        >
          Experience behind the advice
        </h2>
        <p className="text-ivory/80 mt-4 max-w-[60ch]">
          Results from our founder&rsquo;s career across government, research, consulting and the
          African Union.
        </p>

        {points.length ? (
          <dl className="border-ivory/20 mt-12 grid grid-cols-2 border-y md:grid-cols-4">
            {points.map((point, index) => (
              <div
                key={point._key}
                className={[
                  "border-ivory/20 flex flex-col-reverse justify-end gap-2 py-8",
                  index % 2 === 1 && "border-l pl-6",
                  index >= 2 && "border-t md:border-t-0",
                  index > 0 && "md:border-l md:pl-8",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <dt className="text-ivory/80 max-w-[18ch] text-sm leading-snug">{point.label}</dt>
                <dd className="font-display text-gold-light text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-medium">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {results.length ? (
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {results.map((item) => (
              <li key={item._key} className="border-gold-light border-l-2 pl-5">
                <p className="text-ivory text-sm font-semibold">{item.context}</p>
                <p className="text-ivory/85 mt-2 leading-relaxed">{item.result}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
