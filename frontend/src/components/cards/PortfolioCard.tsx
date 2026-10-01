import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { hasCaseStudy } from "@/content/portfolio";
import { ProjectMockup } from "@/components/mockups/ProjectMockup";
import { Badge } from "@/components/ui/Badge";

export function PortfolioCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const caseStudy = hasCaseStudy(project.slug);
  const href = caseStudy ? `/case-studies/${project.slug}` : "/contact#enquiry";
  return (
    <article
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className="group surface-card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[radial-gradient(circle_at_30%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_60%)] p-5">
        <div className="h-full transition-transform duration-500 group-hover:scale-[1.03]">
          {project.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.images[0].src} alt={project.images[0].alt} loading="lazy" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <ProjectMockup variant={project.mockup} />
          )}
        </div>
        {/* Hover reveal: features */}
        <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,var(--bg-elevated)_10%,color-mix(in_srgb,var(--bg-elevated)_80%,transparent)_55%,transparent)] p-5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-subtle">Main features</p>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-fg"><span className="h-1 w-1 rounded-full bg-primary-text" aria-hidden="true" />{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{project.category}</Badge>
          <Badge>{project.industry}</Badge>
          {project.isSample && <Badge tone="muted">Sample project</Badge>}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-fg">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-subtle">{t}</li>
          ))}
        </ul>
        <Link href={href} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary-text">
          {caseStudy ? "View Case Study" : "Discuss a similar project"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          <span className="sr-only">: {project.name}</span>
        </Link>
      </div>
    </article>
  );
}
