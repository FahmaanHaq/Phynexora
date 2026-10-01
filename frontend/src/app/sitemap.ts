import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { servicePages } from "@/content/services";
import { caseStudies } from "@/content/portfolio";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${siteConfig.url}${p}`;
  const main = ["", "/about", "/services", "/solutions", "/portfolio", "/case-studies", "/contact", "/faq", "/blog"].map((p) => ({
    url: u(p || "/"), lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...main,
    ...servicePages.map((s) => ({ url: u(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...caseStudies.map((c) => ({ url: u(`/case-studies/${c.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...["/privacy-policy", "/terms"].map((p) => ({ url: u(p), lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
