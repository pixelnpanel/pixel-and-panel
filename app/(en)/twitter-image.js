import { ImageResponse } from "next/og";

export const alt =
  "Pixel & Panel — Websites, Signs, Print Marketing, Local SEO, and QR Campaigns for Southeast Texas businesses";

export const size = {
  width: 1200,
  height: 628,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0C1E3C 0%, #0369A1 55%, #0EA5E9 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "32px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "13px",
              background: "#F59E0B",
            }}
          />
          <span>Pixel & Panel</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              color: "#F59E0B",
              fontSize: "26px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Your Vision. Made Visible.
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: "900px",
            }}
          >
            Websites, Signs & QR Campaigns for Southeast Texas
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "22px",
            fontSize: "26px",
            color: "#E8F7FF",
          }}
        >
          <span>Beaumont</span>
          <span>·</span>
          <span>Nederland</span>
          <span>·</span>
          <span>Port Arthur</span>
          <span>·</span>
          <span>www.pixelnpanel.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
