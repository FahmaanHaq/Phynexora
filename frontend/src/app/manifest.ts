import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Phynexora — Software & Digital Solutions",
    short_name: "Phynexora",
    description: "Technology That Makes Business Easier.",
    start_url: "/",
    display: "standalone",
    background_color: "#020405",
    theme_color: "#020405",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }, { src: "/brand/phynexora-mark.png", sizes: "512x512", type: "image/png" }],
  };
}
