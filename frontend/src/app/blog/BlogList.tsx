"use client";

import { useState } from "react";
import { Newspaper } from "lucide-react";
import { blogCategories, type BlogCategory, type BlogPost } from "@/content/blog";
import { BlogCard } from "@/components/cards/BlogCard";
import { cn } from "@/lib/cn";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [cat, setCat] = useState<"All" | BlogCategory>("All");
  const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {(["All", ...blogCategories] as const).map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all", cat === c ? "border-transparent bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] text-on-primary" : "border-line text-muted hover:border-line-strong hover:text-fg")}>
            {c}
          </button>
        ))}
      </div>
      {shown.length ? (
        <div key={cat} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
          <Newspaper className="h-8 w-8 text-subtle" aria-hidden="true" />
          <p className="mt-4 font-medium text-fg">No articles in {cat} yet</p>
          <p className="mt-1 text-sm text-muted">New articles are on the way. Check back soon.</p>
        </div>
      )}
    </>
  );
}
