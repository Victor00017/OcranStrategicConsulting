# DESIGN.md — Ocran Strategic Consulting

Design direction: **"Quiet authority, rooted in the land."** Editorial, unhurried, premium — like a well-made
annual report from a respected African institution. Gold from the monogram does the talking; generous ivory space;
deep ink type; a restrained field-green that nods to agriculture without becoming a farm-supply website.

Avoid: stock-photo handshakes, gradient blobs, glassmorphism, icon-grid-everything SaaS layouts, centred-everything
templates, more than one accent colour per section.

## 1. Colour tokens

Logo gold sampled from the supplied mark: `#996C28`.

| Token                | Hex                                   | Use                                                                                                |
| -------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `--color-ivory`      | `#FAF7F0`                             | Page background                                                                                    |
| `--color-paper`      | `#FFFFFF`                             | Cards, form fields                                                                                 |
| `--color-sand`       | `#F1EADC`                             | Alternate section background                                                                       |
| `--color-ink`        | `#1C1A17`                             | Primary text, dark sections                                                                        |
| `--color-ink-muted`  | `#5C564C`                             | Secondary text (6.8:1 on ivory)                                                                    |
| `--color-gold`       | `#996C28`                             | Brand gold — large headings ≥24px, rules, icons, monogram. **Not for small text** (4.3:1 on ivory) |
| `--color-gold-text`  | `#7D5719`                             | Gold links / small gold text on light bg (6.0:1)                                                   |
| `--color-gold-light` | `#C9A45C`                             | Gold on dark/ink backgrounds (7.4:1 on ink)                                                        |
| `--color-field`      | `#2F4A35`                             | Agriculture accent: tags, industry chips, one dark band max per page (9.1:1 on ivory)              |
| `--color-line`       | `#E4DCCB`                             | Borders, dividers                                                                                  |
| `--color-success`    | `#2F6B3F` · `--color-error` `#A23B2A` | Form states                                                                                        |

Primary button: ink background, ivory text, gold underline/hover rule. Secondary: transparent, ink border.
Gold is an accent, not a fill for large areas.

```css
/* app/globals.css */
@import "tailwindcss";
@theme {
  --color-ivory: #faf7f0;
  --color-paper: #ffffff;
  --color-sand: #f1eadc;
  --color-ink: #1c1a17;
  --color-ink-muted: #5c564c;
  --color-gold: #996c28;
  --color-gold-text: #7d5719;
  --color-gold-light: #c9a45c;
  --color-field: #2f4a35;
  --color-line: #e4dccb;
  --color-success: #2f6b3f;
  --color-error: #a23b2a;
  --font-display: var(--font-bodoni), "Times New Roman", serif;
  --font-sans: var(--font-jost), system-ui, sans-serif;
}
```

## 2. Typography

Mirrors the logo: high-contrast Didone monogram + geometric caps wordmark.

- **Display**: Bodoni Moda (Google Fonts, via `next/font`) — H1/H2 and pull quotes only, weights 500–600, sizes ≥ 32px.
- **Everything else**: Jost (geometric, Futura-like, matches the wordmark) — 400/500/600.
- Eyebrows/labels: Jost 500, uppercase, `tracking-[0.2em]`, 12–13px, `gold-text` — echoes "CONSULTING" in the logo.
- Body: 17–18px, line-height 1.65, max 68ch.

Scale (fluid, `clamp`): H1 40→64px · H2 30→44px · H3 22→26px · body 17→18px · small 14px.

## 3. Layout & spacing

- Container max 1200px; text column max 720px; 16px side gutter on mobile, 32px tablet, auto desktop.
- 12-column grid desktop; asymmetric splits (7/5, 8/4) preferred over 6/6.
- Section padding: 64px mobile / 112px desktop. Generous whitespace is part of the brand.
- Thin gold hairline rules (1px) to separate sections and introduce eyebrows.
- Radius: 2px (near-square, editorial). No heavy shadows; use borders + background shifts.

## 4. Components (build these first)

SiteHeader (sticky, condensed on scroll, mobile sheet menu) · SiteFooter · Button (primary/secondary/link) ·
Eyebrow · SectionHeading · ServiceCard · IndustryChip · TrackRecord (stat strip + results) · AudienceCards · ProcessSteps · FounderStrip / FounderSpotlight · ArticleCard ·
CTA band · ContactForm · Breadcrumbs · Prose (portable text renderer) · FAQ accordion · WhatsApp floating button.

## 5. Imagery

- Real photography only for people and projects. Warm natural light, landscape crops, slight warm grade.
- Field/landscape imagery (pasture, livestock, crops, processing) can be licensed stock — keep it documentary, not glossy.
- Monogram can be used as a large, low-opacity watermark in hero/footer.
- Every image needs meaningful alt text; decorative images use `alt=""`.

## 6. Motion

Subtle and purposeful: 200–300ms fades/rises on scroll for section headings and cards (CSS only,
`@media (prefers-reduced-motion: reduce)` disables). No parallax, no carousels auto-advancing.

## 7. Accessibility checklist

Focus rings visible (2px gold-text outline + offset) · 44px min touch targets · colour never the only signal ·
form labels always visible (no placeholder-only) · skip link · language `en-GH`.
