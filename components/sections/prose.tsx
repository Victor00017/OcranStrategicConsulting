import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { BlockContent } from "@/sanity.types";

/**
 * Rich text from Sanity (`blockContent`), styled to DESIGN.md: Bodoni H2, Jost H3, 68ch measure.
 * Internal links use next/link; external ones open normally (no new tab).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-display text-ink mt-12 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-medium">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-ink mt-10 text-[clamp(1.375rem,2vw,1.625rem)] font-medium">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-gold font-display text-ink my-8 border-l-2 pl-6 text-2xl leading-snug">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const className =
        "text-gold-text decoration-gold/50 underline underline-offset-4 hover:decoration-gold";
      return href.startsWith("/") ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <a href={href} className={className}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image
          src={urlForImage(value, 1360)}
          alt={value.alt ?? ""}
          width={1360}
          height={765}
          sizes="(min-width: 768px) 680px, 100vw"
          className="my-10 h-auto w-full rounded-[2px]"
        />
      ) : null,
  },
};

export function Prose({ value }: { value: BlockContent }) {
  return (
    <div className="text-ink max-w-[68ch] text-[1.0625rem] leading-[1.7]">
      <PortableText value={value} components={components} />
    </div>
  );
}
