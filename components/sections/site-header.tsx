"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRIMARY_NAV as NAV } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu on route change (incl. back/forward). Adjusting state during
  // render is React's recommended alternative to setState in an effect.
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Condense the header once the page scrolls a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the <dialog> element and our state in sync, and lock page scroll.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`bg-ivory/95 border-line sticky top-0 z-50 border-b backdrop-blur transition-[padding] duration-200 motion-reduce:transition-none ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <Container className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-ink font-display rounded-[2px] text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Ocran Strategic Consulting
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              // Section stays highlighted on its child pages (/services/x → Services).
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`hover:text-gold-text text-sm font-medium transition-colors ${
                      active ? "text-gold-text" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" size="md">
            Contact
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="text-ink inline-flex min-h-11 min-w-11 items-center justify-center rounded-[2px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Container>

      {/* Mobile sheet — native <dialog>, slides from the right */}
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Site menu"
        className="backdrop:bg-ink/40 m-0 h-dvh max-h-dvh w-full max-w-none bg-transparent p-0 lg:hidden"
        onClose={() => setOpen(false)}
        // Closing via the native Escape key or backdrop click.
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="bg-ivory border-line ml-auto flex h-full w-[86%] max-w-sm flex-col border-l p-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-ink text-base font-semibold">Menu</span>
            <button
              type="button"
              className="text-ink inline-flex min-h-11 min-w-11 items-center justify-center rounded-[2px]"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink hover:text-gold-text font-display block min-h-11 py-2.5 text-2xl font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="/contact" variant="primary" size="lg" className="w-full">
            Contact
          </Button>
        </div>
      </dialog>
    </header>
  );
}
