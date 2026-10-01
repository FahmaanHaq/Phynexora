import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard } from "@/components/cards/BlogCard";
import { BlogCover } from "@/components/mockups/BlogCover";
import { CTASection } from "@/components/sections/CTASection";
import { getPost, posts, relatedPosts, type Block } from "@/content/blog";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import { ShareButtons } from "./ShareButtons";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: "article", publishedTime: p.date });
}

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "h2": return <h2>{block.text}</h2>;
    case "h3": return <h3>{block.text}</h3>;
    case "ul": return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "ol": return <ol>{block.items.map((i) => <li key={i}>{i}</li>)}</ol>;
    case "quote": return <blockquote>{block.text}</blockquote>;
    default: return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }];
  const related = relatedPosts(post);

  return (
    <>
      <article className="pt-32 sm:pt-40">
        <header className="container-x max-w-4xl">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-subtle">
            <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-3 py-1 font-medium text-primary-text">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] text-fg sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-8 flex flex-col justify-between gap-4 border-y border-line py-5 sm:flex-row sm:items-center">
            <p className="text-sm"><span className="text-subtle">Written by</span> <span className="font-medium text-fg">{post.author}</span></p>
            <ShareButtons url={absoluteUrl(path)} title={post.title} />
          </div>
        </header>
        <div className="container-x mt-10 max-w-5xl">
          <div className="aspect-[2/1] overflow-hidden rounded-3xl border border-line"><BlogCover post={post} large /></div>
        </div>
        <div className="container-x prose-px mt-14 max-w-3xl">
          {post.content.map((b, i) => <Render key={i} block={b} />)}
        </div>
        <div className="container-x mt-12 max-w-3xl border-t border-line pt-6">
          <ShareButtons url={absoluteUrl(path)} title={post.title} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-y" aria-labelledby="related-posts">
          <div className="container-x">
            <h2 id="related-posts" className="text-2xl font-semibold text-fg">Related articles</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
      <CTASection location="blog_post_cta" />
      <JsonLd data={[articleSchema({ title: post.title, description: post.excerpt, path, date: post.date, author: post.author }), breadcrumbSchema(crumbs)]} />
    </>
  );
}
