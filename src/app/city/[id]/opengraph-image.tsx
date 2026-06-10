import { ImageResponse } from "next/og";
import { getCity } from "@/data/cities";

export const alt = "FanHop city guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const city = getCity(id);
  const name = city?.name ?? "Host city";
  const country = city?.country ?? "";
  const stadium = city?.stadium ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0f0d 0%, #0d1f17 60%, #0a0f0d 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 5,
            color: "#34d399",
            textTransform: "uppercase",
          }}
        >
          {country} · Soccer 2026 fan guide
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 38,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {stadium} · matches, kickoff weather, food & transit
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 60,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 9999,
              background: "#34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0f0d",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            <span>Fan</span>
            <span style={{ color: "#34d399" }}>Hop</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
