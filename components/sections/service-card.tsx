import Link from "next/link";

/**
 * Service card (ocran-frontend-design "Cards"): paper, hairline border, 2px radius; hover turns the
 * border gold and slides in the title underline. The title link stretches over the whole card.
 */
export function ServiceCard({
  index,
  title,
  slug,
  summary,
  subServices,
}: {
  index: number;
  title: string;
  slug: string;
  summary?: string | null;
  subServices: string[] | null;
}) {
  return (
    <article className="group bg-paper border-line hover:border-gold relative flex h-full flex-col rounded-[2px] border p-6 transition-colors duration-200 md:p-8">
      <p aria-hidden="true" className="font-display text-gold text-2xl leading-none">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="text-ink mt-5 text-[clamp(1.375rem,2vw,1.5rem)] leading-snug font-medium">
        <Link
          href={`/services/${slug}`}
          className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] after:absolute after:inset-0 motion-reduce:transition-none"
        >
          {title}
        </Link>
      </h3>
      {summary ? <p className="text-ink mt-3 leading-relaxed">{summary}</p> : null}
      {subServices?.length ? (
        <ul className="border-line text-ink-muted mt-5 flex flex-col gap-1.5 border-t pt-4 text-[0.95rem]">
          {subServices.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
