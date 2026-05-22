from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer
from reportlab.platypus.flowables import HRFlowable


INPUT_JSON = Path("docs/wording-handoff/website-wording-inventory-2026-05-21.json")
OUTPUT_PDF = Path("docs/wording-handoff/website-wording-inventory-2026-05-21.pdf")


def safe(text: str | None) -> str:
    text = text or ""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\n", "<br/>")
    )


def add_list(story, title, items, styles, limit=None):
    story.append(Paragraph(title, styles["section"]))
    selected = items[:limit] if limit else items
    if not selected:
        story.append(Paragraph("None found", styles["body"]))
    for item in selected:
        story.append(Paragraph(f"- {safe(item)}", styles["body"]))
    if limit and len(items) > limit:
        story.append(Paragraph(f"- ... {len(items) - limit} more items in the Markdown/JSON inventory", styles["muted"]))
    story.append(Spacer(1, 0.08 * inch))


def add_capture(story, label, capture, styles):
    story.append(Paragraph(label, styles["subhead"]))
    metadata = [
        f"Status: {capture.get('status')}",
        f"Title: {capture.get('title')}",
        f"Meta description: {capture.get('metaDescription')}",
        f"Canonical: {capture.get('canonical')}",
        f"OG title: {capture.get('ogTitle')}",
        f"OG description: {capture.get('ogDescription')}",
        f"JSON-LD types: {', '.join(capture.get('jsonLdTypes') or []) or 'None found'}",
    ]
    for item in metadata:
        story.append(Paragraph(safe(item), styles["body"]))
    story.append(Spacer(1, 0.08 * inch))
    add_list(story, f"{label} Visible Text", capture.get("visibleText") or [], styles)
    add_list(story, f"{label} Headings", capture.get("headings") or [], styles)
    add_list(story, f"{label} Buttons / Controls", capture.get("buttons") or [], styles)
    add_list(story, f"{label} Links", capture.get("links") or [], styles, limit=80)
    add_list(story, f"{label} Forms / Placeholders", capture.get("forms") or [], styles)


def build_pdf():
    data = json.loads(INPUT_JSON.read_text())
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)

    base = getSampleStyleSheet()
    styles = {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=colors.HexColor("#0C1E3C"),
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=17,
            textColor=colors.HexColor("#0C1E3C"),
            spaceBefore=10,
            spaceAfter=6,
        ),
        "subhead": ParagraphStyle(
            "Subhead",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=colors.HexColor("#0369A1"),
            spaceBefore=8,
            spaceAfter=4,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=colors.HexColor("#1C1917"),
            spaceBefore=4,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=9.4,
            spaceAfter=1.7,
        ),
        "muted": ParagraphStyle(
            "Muted",
            parent=base["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=7.2,
            leading=9,
            textColor=colors.HexColor("#64748B"),
        ),
    }

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=letter,
        rightMargin=0.45 * inch,
        leftMargin=0.45 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title="Pixel & Panel Website Wording Inventory",
    )

    story = [
        Paragraph("Pixel & Panel Website Wording Inventory", styles["title"]),
        Paragraph(f"Generated: {safe(data.get('generatedAt'))}", styles["body"]),
        Paragraph(f"Routes crawled: {len(data.get('routes', []))}", styles["body"]),
        Paragraph(
            "This PDF lists rendered desktop and mobile wording by page, plus backend/admin source strings. Use it as the source packet for an SEO rewrite in Gemini.",
            styles["body"],
        ),
        Spacer(1, 0.16 * inch),
    ]

    story.append(Paragraph("Route Summary", styles["h1"]))
    for route in data.get("routes", []):
        story.append(Paragraph(f"{safe(route['path'])} - {safe(route['desktop'].get('title'))}", styles["body"]))
    story.append(PageBreak())

    for index, route in enumerate(data.get("routes", []), start=1):
        story.append(Paragraph(f"{index}. {safe(route['path'])}", styles["h1"]))
        story.append(HRFlowable(width="100%", color=colors.HexColor("#CBD5E1"), thickness=0.5))
        add_capture(story, "Desktop", route["desktop"], styles)
        add_capture(story, "Mobile", route["mobile"], styles)
        story.append(PageBreak())

    story.append(Paragraph("Backend / Admin / Email Source Strings", styles["h1"]))
    for group in data.get("backendStrings", []):
        story.append(Paragraph(safe(group.get("file")), styles["subhead"]))
        for item in group.get("strings", []):
            story.append(Paragraph(f"- {safe(item)}", styles["body"]))
        story.append(Spacer(1, 0.08 * inch))

    doc.build(story)
    print(OUTPUT_PDF)


if __name__ == "__main__":
    build_pdf()
