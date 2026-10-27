# Logo candidate — rebuild brief (D-027 fallback, D-030)

**Status: proposal, not approved, not used on the site.** Prefer the client's Canva export (SVG, or PDF Print →
`pdftocairo -svg`); use this only if that can't be obtained, and only after the client approves it.

- Source: `public/brand/logo-reference.png` (500×500 Canva PNG; mark ink ~95 px tall — too small to trace well).
- Recraft (design-assets skill's first choice) was not connected, so this was hand-built — flagged per the skill.
- Wordmark: Jost, weight 370 (variable instance), "OCRAN STRATEGIC" cap height 29.5 px over 391 px, "CONSULTING"
  12.6 px over 168 px — tracking solved so each line matches the original's ink width exactly.
- Monogram: Bodoni Moda wght 500, opsz 96 (display, high contrast). O 97 px tall, right edge aligned to the original;
  S at 88 % of O, shifted −6/−2 px; S cut out of the O with a 3 px knockout (SVG mask).
- Colour: `#996c28` (= `--color-gold`); dark variant `#c9a45c` (`--color-gold-light`) for ink backgrounds.
- Known difference: Bodoni Moda's S is not the Canva font's S — curves and terminals differ slightly.
- Regenerate: `JOST=370 python build_logo.py <fonts-dir> out.svg 500o96 0.88 -6 -2 3` with Jost and Bodoni Moda
  variable fonts instanced via fontTools (`@fontsource-variable/jost@5.3.0`, `@fontsource-variable/bodoni-moda@5.3.0`).
- Comparison render (original / variants / overlay / ivory / ink): `logo-candidate-comparison.png`.
