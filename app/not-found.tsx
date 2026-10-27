import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/sections/site-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SERVICES } from "@/lib/nav";

// Next adds `noindex` to 404 responses itself. The root template appends the site name.
export const metadata: Metadata = {
  title: "Page not found",
};

// docs/SEO.md §1: the 404 page links back to the services.
export default function NotFound() {
  return (
    <SiteShell>
      <Container className="py-16 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="font-display text-ink mt-4 max-w-[18ch] text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] font-medium text-balance">
              This page could not be found.
            </h1>
            <p className="text-ink-muted mt-6 max-w-[56ch]">
              The link may be out of date, or the page may have moved. Try one of the services
              below, or go back to the home page.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/" variant="primary" size="lg">
                Go to the home page
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact us
              </Button>
            </div>
          </div>

          <nav
            aria-labelledby="not-found-services"
            className="border-line md:col-span-5 md:border-l md:pl-12"
          >
            <h2
              id="not-found-services"
              className="text-gold-text text-xs font-medium tracking-[0.2em] uppercase"
            >
              Services
            </h2>
            <ul className="mt-4 flex flex-col">
              {SERVICES.map((link) => (
                <li key={link.href} className="border-line border-b">
                  <Link
                    href={link.href}
                    className="text-ink hover:text-gold-text block py-3 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </SiteShell>
  );
}
