import Link from "next/link";
import type { BlogPost } from "@/content/blog";
import { BlogCover } from "@/components/mockups/BlogCover";
import { formatDate } from "@/lib/format";

export function BlogCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }} className="group surface-card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="aspect-[16/9] overflow-hidden border-b border-line">
          <BlogCover post={post} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-xs text-subtle">
            <span className="font-medium text-primary-text">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-fg">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-auto pt-5 text-sm font-medium text-primary-text">Read article →</span>
        </div>
      </Link>
    </article>
  );
}
