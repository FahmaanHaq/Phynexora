import { ImageResponse } from "next/og";

export const alt = "Phynexora — Technology That Makes Business Easier.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "radial-gradient(circle at 15% 10%, #1d3fae 0%, #05070d 55%), #05070d", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#3D7BFF,#6D5BFF,#22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 700 }}>P</div>
          <div style={{ fontSize: 38, letterSpacing: 10, fontWeight: 600 }}>PHYNEXORA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 950 }}>Technology That Makes Business Easier.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9aa6c4" }}>ERP · POS · Web · Mobile · Custom Software · AI & Automation · Integrations</div>
        </div>
      </div>
    ),
    size,
  );
}
