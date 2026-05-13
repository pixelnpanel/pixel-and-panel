from PIL import Image, ImageDraw, ImageFont
import os

FONTS_DIR = "/Users/fastsigns/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/915956f9-4ceb-4a07-a19b-e667aa726ec8/01d9a299-4017-466d-86c5-230b48441362/skills/canvas-design/canvas-fonts"

NAVY    = "#0d2137"
GOLD    = "#F5A623"
WHITE   = "#ffffff"
MUTED   = "#7a90a8"
INACTIVE= "#b8cfe0"
BG      = "#07111d"

W, H = 1320, 760
canvas = Image.new("RGB", (W, H), color=BG)
draw   = ImageDraw.Draw(canvas)

def f(name, size):
    return ImageFont.truetype(os.path.join(FONTS_DIR, name), size)

font_logo    = f("BricolageGrotesque-Bold.ttf", 15)
font_nav_reg = f("InstrumentSans-Regular.ttf",  13)
font_nav_bold= f("InstrumentSans-Bold.ttf",     13)
font_btn     = f("InstrumentSans-Bold.ttf",     11)
font_label_n = f("WorkSans-Bold.ttf",           11)
font_label_b = f("WorkSans-Bold.ttf",           20)
font_title   = f("BricolageGrotesque-Bold.ttf", 28)
font_sub     = f("InstrumentSans-Regular.ttf",  14)

NAV_ITEMS  = ["Digital Services", "Signage & Print", "Portfolio", "Pricing", "Contact"]
ACTIVE_IDX = 2

PANEL_X   = 80
PANEL_W   = W - PANEL_X * 2
PANEL_H   = 64
START_Y   = 130
GAP       = 72

# ── Title ─────────────────────────────────────────────────────────────────────
title_text = "Nav Active State — Options"
sub_text   = "Portfolio page is active  ·  Pixel & Panel brand"
tw = draw.textlength(title_text, font=font_title)
sw = draw.textlength(sub_text, font=font_sub)
draw.text(((W - tw) / 2, 44), title_text, font=font_title, fill=WHITE)
draw.text(((W - sw) / 2, 82), sub_text,   font=font_sub,   fill=MUTED)

# thin gold rule under title
draw.rectangle([(W // 2 - 200, 108), (W // 2 + 200, 110)], fill=GOLD)


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def draw_navbar(dy: int, style: str, label_num: str, label_name: str):
    px, py, pw, ph = PANEL_X, dy, PANEL_W, PANEL_H

    # ── label column ──────────────────────────────────────────────────────────
    num_w  = draw.textlength(label_num,  font=font_label_b)
    name_w = draw.textlength(label_name, font=font_label_n)
    lx = px - max(num_w, name_w) - 20
    draw.text((lx + (max(num_w, name_w) - num_w)  / 2, py + 8),
              label_num,  font=font_label_b, fill=GOLD)
    draw.text((lx + (max(num_w, name_w) - name_w) / 2, py + 34),
              label_name, font=font_label_n, fill=MUTED)

    # ── navbar background ─────────────────────────────────────────────────────
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=10, fill=NAVY)

    # ── logo ──────────────────────────────────────────────────────────────────
    lgo_x = px + 22
    cy    = py + ph // 2
    # pixel-art accent block
    draw.rounded_rectangle([lgo_x, cy - 11, lgo_x + 22, cy + 11], radius=3, fill=GOLD)
    draw.text((lgo_x + 28, cy), "PIXEL & PANEL", font=font_logo, fill=WHITE, anchor="lm")

    # ── nav links ─────────────────────────────────────────────────────────────
    spacing   = 32
    widths    = [draw.textlength(t, font=font_nav_reg)  for t in NAV_ITEMS]
    bwidths   = [draw.textlength(t, font=font_nav_bold) for t in NAV_ITEMS]
    total_nav = sum(widths) + spacing * (len(NAV_ITEMS) - 1)
    nav_sx    = px + pw // 2 - total_nav // 2

    lx2 = nav_sx
    for i, item in enumerate(NAV_ITEMS):
        tw_i  = widths[i]
        btw_i = bwidths[i]
        cx    = lx2 + tw_i / 2
        active = (i == ACTIVE_IDX)

        if active:
            if style == "underline":
                draw.text((cx, cy), item, font=font_nav_bold, fill=WHITE, anchor="mm")
                bar_y = py + ph - 9
                draw.rounded_rectangle(
                    [cx - tw_i / 2 - 3, bar_y, cx + tw_i / 2 + 3, bar_y + 3],
                    radius=2, fill=GOLD)

            elif style == "pill":
                ppx, ppy = 14, 6
                draw.rounded_rectangle(
                    [cx - btw_i / 2 - ppx, cy - 11 - ppy,
                     cx + btw_i / 2 + ppx, cy + 11 + ppy],
                    radius=22, fill=GOLD)
                draw.text((cx, cy), item, font=font_nav_bold, fill="#0d2137", anchor="mm")

            elif style == "color":
                draw.text((cx, cy), item, font=font_nav_bold, fill=GOLD, anchor="mm")

            elif style == "dot":
                draw.text((cx, cy), item, font=font_nav_bold, fill=WHITE, anchor="mm")
                dot_y = py + ph - 10
                draw.ellipse([cx - 3, dot_y - 3, cx + 3, dot_y + 3], fill=GOLD)
        else:
            col = MUTED if style == "color" else INACTIVE
            draw.text((cx, cy), item, font=font_nav_reg, fill=col, anchor="mm")

        lx2 += tw_i + spacing

    # ── CTA button ────────────────────────────────────────────────────────────
    btn_text = "GET A FREE QUOTE  →"
    btw      = draw.textlength(btn_text, font=font_btn)
    bh       = 34
    bpx      = 16
    bx       = px + pw - btw - bpx * 2 - 20
    by_      = cy - bh // 2
    draw.rounded_rectangle([bx, by_, bx + btw + bpx * 2, by_ + bh], radius=6, fill=GOLD)
    draw.text((bx + btw / 2 + bpx, cy), btn_text, font=font_btn, fill="#0d2137", anchor="mm")


panels = [
    ("1", "Underline",   "underline"),
    ("2", "Pill Badge",  "pill"),
    ("3", "Color Only",  "color"),
    ("4", "Dot Mark",    "dot"),
]

for idx, (num, name, style) in enumerate(panels):
    y = START_Y + idx * (PANEL_H + GAP)
    draw_navbar(y, style, num, name)

# ── footer note ───────────────────────────────────────────────────────────────
note = "Active page: Portfolio   ·   Brand color: #F5A623   ·   Nav bg: #0d2137"
nw   = draw.textlength(note, font=font_sub)
draw.text(((W - nw) / 2, H - 36), note, font=font_sub, fill="#445566")

out = "/Users/fastsigns/Projects/pixel-and-panel/public/nav-active-mockups.png"
canvas.save(out, "PNG")
print(f"Saved → {out}")
