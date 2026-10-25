---
name: ocran-frontend-design
description: Use for any visual or UI work on the Ocran site — new sections, components, page layouts, restyles. Enforces the "quiet authority, rooted in the land" direction and the design tokens in docs/DESIGN.md.
---

# Frontend design playbook

Read `docs/DESIGN.md` first. This skill is how to apply it without drifting into a generic template.
It overrides general design skills (e.g. Anthropic's `frontend-design`) wherever they disagree — never change
fonts, colours or style direction on a general skill's suggestion.

## Before writing code
Answer in 3 lines: What is this section's single job? What should the visitor feel? What's the one action?
If you can't answer, ask.

## Principles
1. **Editorial, not SaaS.** Think annual report / quality journal. Asymmetric grids (7/5, 8/4), strong typographic
   hierarchy, hairline gold rules, lots of ivory space. Avoid rows of identical icon cards unless content truly is a grid.
2. **Type does the heavy lifting.** Bodoni Moda only for H1/H2/pull quotes ≥ 32px. Jost for everything else.
   Uppercase tracked eyebrows (`text-xs tracking-[0.2em] uppercase text-gold-text`) above section headings.
3. **Gold is jewellery.** Rules, numbers in the stat strip, monogram, hover states, large headings. Never small body
   text in `gold` (use `gold-text`). Never large gold fills. On dark sections use `gold-light`.
4. **Field green sparingly** — industry chips, one dark band per page max.
5. **Evidence over adjectives.** Prefer real numbers (35+ years, 30 countries, 43 publications) in big Bodoni numerals
   over decorative illustrations.
6. **Mobile first.** Design at 375px, then expand. Tap targets ≥ 44px. Test at 320px for overflow.
7. **Tokens only.** Tailwind classes mapped to `@theme` tokens. No raw hex, no arbitrary colours.

## Patterns to reuse
- Section: `<section class="py-16 md:py-28"><div class="container">` → Eyebrow → SectionHeading → content → optional CTA.
- Hero: left 7 cols (eyebrow, Bodoni H1, value prop in Jost 20px, two buttons), right 5 cols portrait with a thin gold
  frame offset by 12px. Large faint monogram watermark behind.
- Stat strip: 4 columns, Bodoni numerals in `gold` 48–56px, Jost labels in `ink-muted`, hairline dividers.
- Cards: paper background, 1px `line` border, 2px radius, hover → border becomes `gold`, title underline slides in.
- CTA band: ink background, ivory Bodoni heading, gold-light eyebrow, primary button inverted (ivory bg, ink text).

## Anti-patterns (reject in review)
Gradient backgrounds · drop shadows larger than `shadow-sm` · emoji icons · centred long paragraphs ·
auto-playing carousels · stock "handshake" photos · fake testimonials/logos · more than 2 font families ·
`"use client"` on a whole page for one interactive widget.

## Self-review before finishing
- [ ] Screenshot at 375 / 768 / 1280 — no overflow, nothing cramped
- [ ] Contrast meets AA (check gold usage)
- [ ] Keyboard: tab through, focus visible, menu operable, Esc closes
- [ ] `prefers-reduced-motion` respected
- [ ] Looks like *this* brand, not a template — if you swapped the logo would it still feel specific?
