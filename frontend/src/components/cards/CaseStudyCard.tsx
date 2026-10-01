import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/portfolio";
import { ProjectMockup } from "@/components/mockups/ProjectMockup";
import { Badge } from "@/components/ui/Badge";

export function CaseStudyCard({ cs, delay = 0 }: { cs: CaseStudy; delay?: number }) {
  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }} className="group surface-card grid overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-strong md:grid-cols-[1fr_1.1fr]">
      <div className="aspect-[16/11] border-b border-line bg-[radial-gradient(circle_at_30%_0%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_60%)] p-5 md:aspect-auto md:border-b-0 md:border-r">
        <ProjectMockup variant={cs.screenshots[0].mockup} className="transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-col p-7">
        <div className="flex flex-wrap gap-2">
          <Badge tone="primary">{cs.industry}</Badge>
          {cs.isSample && <Badge tone="muted">Sample case study</Badge>}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-fg">{cs.client}</h2>
        <p className="mt-2 leading-relaxed text-muted">{cs.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {cs.technology.map((t) => <li key={t} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-subtle">{t}</li>)}
        </ul>
        <Link href={`/case-studies/${cs.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary-text">
          Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          <span className="sr-only">: {cs.client}</span>
        </Link>
      </div>
    </article>
  );
}
