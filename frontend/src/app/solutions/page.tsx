import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Industries } from "@/components/sections/Industries";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { solutions } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business Solutions",
  description: "Business management, sales and retail, workforce management, data and reporting, automation and digital transformation solutions from Phynexora.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>Solutions Designed Around <span className="text-gradient">Your Business</span></>}
        description="Start with the outcome you need — better visibility, faster sales, simpler payroll, fewer manual steps. We bring together the right technology to get there."
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
      >
        <nav aria-label="Solutions on this page">
          <ul className="flex flex-wrap gap-2">
            {solutions.map((s) => (
              <li key={s.slug}><a href={`#${s.slug}`} className="inline-flex rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg">{s.title}</a></li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="pb-24" aria-label="Solutions">
        <div className="container-x space-y-5">
          {solutions.map((s, i) => (
            <article id={s.slug} key={s.slug} data-reveal className="surface-card scroll-mt-28 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-4">
                  <IconTile size="lg"><Icon name={s.icon} /></IconTile>
                  <span className="font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-fg sm:text-3xl">{s.title}</h2>
                <p className="mt-2 text-lg font-medium text-primary-text">{s.text}</p>
                <p className="mt-4 leading-relaxed text-muted">{s.details}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.services.map((sv) => (
                    <Link key={sv.href} href={sv.href} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm text-fg transition-colors hover:border-primary-text/50">
                      {sv.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-surface-2/40 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">Typical examples</h3>
                <ul className="mt-5 space-y-3.5">
                  {s.examples.map((e) => (
                    <li key={e} className="flex items-center gap-3 text-fg">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-hidden="true"><Check className="h-3.5 w-3.5" /></span>
                      {e}
                    </li>
                  ))}
                </ul>
                <Button href="/contact#enquiry" variant="secondary" size="sm" className="mt-7" iconRight={<ArrowRight />}>Discuss this solution</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProblemSolution />
      <Industries />
      <CTASection location="solutions_cta" />
    </>
  );
}
