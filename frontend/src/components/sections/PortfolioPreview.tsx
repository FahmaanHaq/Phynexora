import { ArrowRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { Button } from "@/components/ui/Button";

export function PortfolioPreview() {
  return (
    <section aria-labelledby="work-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Portfolio</p>
            <h2 id="work-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl lg:text-[2.75rem]">Our Work</h2>
            <p className="mt-4 text-lg text-muted">A look at the kinds of systems we design and build — from ERP and POS to web and mobile.</p>
          </div>
          <Button href="/portfolio" variant="secondary" iconRight={<ArrowRight />}>View all work</Button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <PortfolioCard key={p.slug} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
