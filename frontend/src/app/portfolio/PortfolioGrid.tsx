"use client";

import { useMemo, useState } from "react";
import { FolderOpen } from "lucide-react";
import type { PortfolioCategory, Project } from "@/content/portfolio";
import { portfolioCategories } from "@/content/portfolio";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { PortfolioCard } from "@/components/cards/PortfolioCard";

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"All" | PortfolioCategory>("All");
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter, projects]);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {portfolioCategories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => { setFilter(c); track("portfolio_view", { filter: c }); }}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === c ? "border-transparent bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] text-on-primary" : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {c}
              <span className={cn("rounded-full px-1.5 text-xs", filter === c ? "bg-white/20" : "bg-surface-2")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>
      {visible.length ? (
        <div key={filter} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <div key={p.slug} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}><PortfolioCard project={p} /></div>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
          <FolderOpen className="h-8 w-8 text-subtle" aria-hidden="true" />
          <p className="mt-4 font-medium text-fg">No {filter} projects published yet</p>
          <p className="mt-1 text-sm text-muted">We&apos;re adding more work regularly. Ask us about relevant examples.</p>
        </div>
      )}
    </>
  );
}
