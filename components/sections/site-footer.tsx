import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EXPLORE, INDUSTRIES, LEGAL, SERVICES, type NavLink } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-2xl font-semibold">Ocran Strategic Consulting</p>
            <p className="text-ivory/70 mt-4 max-w-xs text-sm leading-relaxed">
              Transforming Businesses. Advancing Agriculture and Livestock. Delivering Sustainable
              Growth.
            </p>
            <p className="text-gold-light mt-6 text-xs tracking-[0.2em] uppercase">
              Tema · Greater Accra · Ghana
            </p>
          </div>

          <FooterColumn title="Services" links={SERVICES} className="md:col-span-3" />
          <FooterColumn title="Industries" links={INDUSTRIES} className="md:col-span-2" />
          <FooterColumn title="Explore" links={EXPLORE} className="md:col-span-3" />
        </div>

        <div className="border-ivory/15 mt-14 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ivory/60 text-sm">
            © {new Date().getFullYear()} Ocran Strategic Consulting. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ivory/70 hover:text-gold-light text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: readonly NavLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-gold-light text-xs font-medium tracking-[0.2em] uppercase">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-ivory/75 hover:text-ivory text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
