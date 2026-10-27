import Link from "next/link";
import { formatDate } from "@/lib/format";

/** Article card for insight lists: category, title (stretched link), excerpt, date. */
export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
}: {
  title: string;
  slug: string;
  excerpt: string;
  category: string | null;
  publishedAt: string;
}) {
  return (
    <article className="group border-line hover:border-gold relative flex h-full flex-col border-t pt-6 transition-colors duration-200">
      {category ? (
        <p className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase">{category}</p>
      ) : null}
      <h3 className="text-ink mt-3 text-[1.375rem] leading-snug font-medium">
        <Link
          href={`/insights/${slug}`}
          className="group-hover:text-gold-text transition-colors after:absolute after:inset-0"
        >
          {title}
        </Link>
      </h3>
      <p className="text-ink-muted mt-3 line-clamp-3">{excerpt}</p>
      <time dateTime={publishedAt} className="text-ink-muted mt-auto pt-5 text-sm">
        {formatDate(publishedAt)}
      </time>
    </article>
  );
}
