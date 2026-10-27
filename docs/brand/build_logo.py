"""Rebuild the Ocran logo as SVG from Jost + Bodoni Moda outlines, matched to measurements of
public/brand/logo-reference.png (500x500 canvas coordinates). Fallback per D-027 (no Recraft here).

Usage: build_logo.py <fonts-dir> <out.svg> [bodoni-weight] [s_scale] [s_dx] [s_dy] [gap]
"""
import sys
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

fonts, out = sys.argv[1], sys.argv[2]
bw = sys.argv[3] if len(sys.argv) > 3 else "500"
s_scale = float(sys.argv[4]) if len(sys.argv) > 4 else 0.80
s_dx = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
s_dy = float(sys.argv[6]) if len(sys.argv) > 6 else 0.0
gap = float(sys.argv[7]) if len(sys.argv) > 7 else 3.0
GOLD = "#996c28"


def glyph(font, char):
    gs = font.getGlyphSet()
    name = font.getBestCmap()[ord(char)]
    return gs, name, gs[name].width


def text_path(font, text, cap_px, x0, baseline, width_px):
    """Path for `text` with capitals `cap_px` tall, tracked so the ink spans exactly `width_px`."""
    upm = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight
    k = cap_px / cap
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    # Natural ink extent of each glyph, to solve the tracking.
    items = []
    for ch in text:
        name = cmap[ord(ch)]
        bp = BoundsPen(gs)
        gs[name].draw(bp)
        items.append((name, gs[name].width, bp.bounds))
    letters = [i for i in items if i[2]]
    adv = sum(i[1] for i in items[:-1]) * k
    first_l = letters[0][2][0] * k
    last_r = letters[-1][2][2] * k
    natural = adv - first_l + last_r
    tracking = (width_px - natural) / (len(items) - 1)
    pen = SVGPathPen(gs)
    x = x0 - first_l
    for name, advance, _ in items:
        tp = TransformPen(pen, (k, 0, 0, -k, x, baseline))
        gs[name].draw(tp)
        x += advance * k + tracking
    return pen.getCommands(), tracking


def glyph_path(font, char, height_px, cx, bottom):
    """Path for one glyph scaled so its ink is `height_px` tall, centred on `cx`, ink bottom at `bottom`."""
    gs = font.getGlyphSet()
    name = font.getBestCmap()[ord(char)]
    bp = BoundsPen(gs)
    gs[name].draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    k = height_px / (ymax - ymin)
    tx = cx - (xmin + xmax) / 2 * k
    ty = bottom + ymin * k
    pen = SVGPathPen(gs)
    gs[name].draw(TransformPen(pen, (k, 0, 0, -k, tx, ty)))
    return pen.getCommands(), (xmax - xmin) * k


import os
jost = TTFont(f"{fonts}/jost-{os.environ.get('JOST', '300')}.woff")
bodoni = TTFont(f"{fonts}/bodoni-{bw}.woff")

# Measured from the PNG: line 1 ink x 54–444, caps y 295–325 (O overshoot included);
# line 2 ink x 166–333, caps y 338–350; monogram ink y 184–280, x 208–296.
line1, t1 = text_path(jost, "OCRAN STRATEGIC", 29.5, 54, 324.3, 391)
line2, t2 = text_path(jost, "CONSULTING", 12.6, 166, 350.2, 168)

o_h = 97
o_path, o_w = glyph_path(bodoni, "O", o_h, 296 - 0, 281)
o_cx = 296 - o_w / 2
o_path, _ = glyph_path(bodoni, "O", o_h, o_cx, 281)
s_h = o_h * s_scale
s_path, s_w = glyph_path(bodoni, "S", s_h, 208 + s_dx + 0, 281 - (o_h - s_h) / 2 + s_dy)
s_path, _ = glyph_path(bodoni, "S", s_h, 208 + s_w / 2 + s_dx, 281 - (o_h - s_h) / 2 + s_dy)

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="44 174 410 186" role="img" aria-labelledby="t">
  <title id="t">Ocran Strategic Consulting</title>
  <defs>
    <mask id="knockout" maskUnits="userSpaceOnUse" x="44" y="174" width="410" height="186">
      <rect x="44" y="174" width="410" height="186" fill="#fff"/>
      <path d="{s_path}" fill="#000" stroke="#000" stroke-width="{gap * 2}" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g fill="{GOLD}">
    <path d="{o_path}" mask="url(#knockout)"/>
    <path d="{s_path}"/>
    <path d="{line1}"/>
    <path d="{line2}"/>
  </g>
</svg>
"""
open(out, "w").write(svg)
print(f"bodoni {bw}, S scale {s_scale}, tracking line1 {t1:.2f}px line2 {t2:.2f}px, O width {o_w:.1f}px")
