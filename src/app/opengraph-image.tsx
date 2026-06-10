import { ImageResponse } from "next/og";

export const alt = "FanHop — Soccer 2026 Fan Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0f0d 0%, #0d1f17 60%, #0a0f0d 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 9999,
              background: "#34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0f0d",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", fontSize: 110, fontWeight: 800, letterSpacing: -4 }}>
            <span>Fan</span>
            <span style={{ color: "#34d399" }}>Hop</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          Host-city guides · Match schedules · Kickoff weather
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 28,
            letterSpacing: 6,
            color: "#34d399",
            textTransform: "uppercase",
          }}
        >
          USA · Canada · Mexico 2026
        </div>
      </div>
    ),
    size,
  );
}
