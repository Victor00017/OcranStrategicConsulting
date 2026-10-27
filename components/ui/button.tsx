import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "link";
type Size = "md" | "lg";

// Focus-ring colour lives in each variant: dark backgrounds need gold-light, not gold-text.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] font-medium transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

// 44px touch target (DESIGN.md §7). Not applied to the inline `link` variant.
const touchTarget = "min-h-11 min-w-11";

const variants: Record<Variant, string> = {
  // Ink background, ivory text, gold underline on hover (DESIGN.md §1). Top border balances the
  // bottom one so the label stays vertically centred.
  primary:
    "bg-ink text-ivory border-y-2 border-transparent hover:border-b-gold-light hover:bg-ink/90 focus-visible:outline-gold-text",
  // Transparent, ink border
  secondary:
    "border border-ink text-ink bg-transparent hover:border-gold hover:text-gold-text focus-visible:outline-gold-text",
  // Primary turned inside out, for ink bands (CTA band)
  inverse:
    "bg-ivory text-ink border-y-2 border-transparent hover:border-b-gold focus-visible:outline-gold-light",
  // Inline text link with sliding gold underline
  link: "text-gold-text underline-offset-4 decoration-gold/50 underline hover:decoration-gold p-0 focus-visible:outline-gold-text",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
    external?: boolean;
  };

function buttonClasses(variant: Variant, size: Size, className: string) {
  return variant === "link"
    ? `${base} ${variants.link} ${className}`.trim()
    : `${base} ${touchTarget} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  if (props.href !== undefined) {
    const { variant = "primary", size = "md", className = "", href, external, ...rest } = props;
    const classes = buttonClasses(variant, size, className);
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest} />
      );
    }
    return <Link href={href} className={classes} {...rest} />;
  }

  const { variant = "primary", size = "md", className = "", ...rest } = props;
  return <button className={buttonClasses(variant, size, className)} {...rest} />;
}
