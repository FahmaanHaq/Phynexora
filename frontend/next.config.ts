import type { NextConfig } from "next";

/**
 * Content Security Policy.
 * Third-party origins are only added when the matching integration is enabled
 * through environment variables, so the default policy stays tight.
 */
function buildCsp() {
  const script = ["'self'", "'unsafe-inline'"];
  const connect = ["'self'"];
  const frame = ["'self'"];
  const img = ["'self'", "data:", "blob:"];

  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    script.push("https://challenges.cloudflare.com");
    frame.push("https://challenges.cloudflare.com");
  }
  if (process.env.NEXT_PUBLIC_GA_ID) {
    script.push("https://www.googletagmanager.com");
    connect.push("https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com");
    img.push("https://*.google-analytics.com", "https://www.googletagmanager.com");
  }
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io";
    script.push(host);
    connect.push(host);
  }
  if (process.env.NODE_ENV === "development") script.push("'unsafe-eval'");

  return [
    "default-src 'self'",
    `script-src ${script.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${img.join(" ")}`,
    "font-src 'self' data:",
    `connect-src ${connect.join(" ")}`,
    `frame-src ${frame.join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["lucide-react"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/process", destination: "/#process", permanent: false },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
