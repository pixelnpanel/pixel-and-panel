import { ImageResponse } from "next/og";

export const alt = "Free Visibility Check — See How Your Business Looks Online | Pixel & Panel";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0C1E3C 0%, #0369A1 55%, #0EA5E9 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "34px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#F59E0B",
            }}
          />
          <span>Pixel & Panel</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#F59E0B",
              fontSize: "30px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Free — No Obligation
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              maxWidth: "920px",
            }}
          >
            See How Your Business Looks Online — Free Visibility Check
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "22px",
            fontSize: "28px",
            color: "#E8F7FF",
          }}
        >
          <span>Google Presence</span>
          <span>•</span>
          <span>Website Review</span>
          <span>•</span>
          <span>Local SEO</span>
          <span>•</span>
          <span>Quick Feedback</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
