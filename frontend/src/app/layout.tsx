import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { ChatWidget } from "@/components/widgets/ChatWidget";
import { FloatingDock } from "@/components/widgets/FloatingDock";
import { MobileActionBar } from "@/components/widgets/MobileActionBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Phynexora | Software & Digital Solutions", template: "%s | Phynexora" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["custom ERP", "POS system", "software development", "web development", "mobile apps", "system integration", "business automation", "AI solutions", "Phynexora"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Phynexora | Software & Digital Solutions",
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Phynexora | Software & Digital Solutions", description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020405" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7f9" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingDock />
          <MobileActionBar />
          <ChatWidget />
        </Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
