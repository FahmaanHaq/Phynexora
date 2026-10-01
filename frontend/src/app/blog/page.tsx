import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { posts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { BlogList } from "./BlogList";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Insights on Software, ERP, POS & Automation",
  description: "Practical articles from Phynexora on business software, ERP, POS, automation, AI, web development and digital transformation.",
  path: "/blog",
});

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow="Blog" title="Insights for businesses using technology" description="Practical, plain-language articles on software, systems and making business easier." crumbs={[{ name: "Blog", path: "/blog" }]} />
      <section className="pb-12" aria-label="Articles">
        <div className="container-x"><BlogList posts={sorted} /></div>
      </section>
      <CTASection location="blog_cta" />
    </>
  );
}
