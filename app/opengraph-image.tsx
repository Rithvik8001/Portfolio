import { ImageResponse } from "next/og";
import { USER } from "@/constants/user";

export const runtime = "edge";
export const alt = `${USER.fullName} — Full Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        background: "#09090b",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(315deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: "22px",
            color: "#71717a",
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {USER.website.replace("https://", "")}
        </p>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#fafafa",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {USER.fullName}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            margin: 0,
          }}
        >
          Full Stack Engineer
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "8px",
            flexWrap: "wrap",
          }}
        >
          {["Next.js", "React", "TypeScript"].map((tag) => (
            <span
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#a1a1aa",
                fontSize: "18px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
