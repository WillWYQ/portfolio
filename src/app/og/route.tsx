import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || DATA.name;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 35%, #1f2937 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {DATA.initials}
          </div>
          <div style={{ fontSize: 28, opacity: 0.9 }}>{DATA.name}</div>
        </div>
        <div style={{ height: 28 }} />
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 28, opacity: 0.8 }}>{DATA.description}</div>
        <div style={{ height: 32 }} />
        <div style={{ fontSize: 24, opacity: 0.7 }}>{DATA.url}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

