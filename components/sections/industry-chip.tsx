import Link from "next/link";

/** Industry chip: field-green outline, the one place the agriculture accent appears (DESIGN.md §1). */
export function IndustryChip({ title, slug }: { title: string; slug: string }) {
  return (
    <Link
      href={`/industries/${slug}`}
      className="border-field text-field hover:bg-field hover:text-ivory focus-visible:outline-gold-text inline-flex min-h-11 items-center rounded-[2px] border px-5 py-2.5 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {title}
    </Link>
  );
}
