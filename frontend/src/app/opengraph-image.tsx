import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Phynexora — Technology That Makes Business Easier.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const brand = join(process.cwd(), "public", "brand");
  const [mark, word] = await Promise.all([
    readFile(join(brand, "phynexora-mark.png")),
    readFile(join(brand, "phynexora-wordmark-dark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const wordSrc = `data:image/png;base64,${word.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "radial-gradient(circle at 18% 12%, rgba(0,200,240,0.35) 0%, #020405 55%), #020405", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={markSrc} width={120} height={120} alt="" style={{ borderRadius: 28 }} />
          <img src={wordSrc} width={500} height={60} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05, maxWidth: 980, color: "#eef4f7" }}>Technology That Makes Business Easier.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4fdcff" }}>ERP · POS · Web · Mobile · Custom Software · AI & Automation · Integrations</div>
        </div>
      </div>
    ),
    size,
  );
}
