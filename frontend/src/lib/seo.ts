import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Use the raw title without the brand suffix. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({ title, description, path, absoluteTitle, type = "website", publishedTime, noIndex }: SeoInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Phynexora`;
  const url = absoluteUrl(path);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
