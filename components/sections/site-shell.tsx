import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Public page frame: skip link → header → <main id="main"> → footer.
 * Used by app/(site)/layout.tsx and app/not-found.tsx, which sits outside the (site) group.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-ink text-ivory sr-only z-[60] rounded-[2px] px-4 py-3 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      {/* tabIndex lets the skip link move focus here; main itself is not interactive. */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
