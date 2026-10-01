import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Hourglass } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectMockup } from "@/components/mockups/ProjectMockup";
import { Badge } from "@/components/ui/Badge";
import { TrackView } from "@/components/widgets/TrackView";
import { caseStudies, getCaseStudy } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({ title: `${cs.client} — Case Study`, description: cs.summary, path: `/case-studies/${cs.slug}`, type: "article" });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-text">{title}</h2>
      <div className="text-lg leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <TrackView event="case_study_view" props={{ slug: cs.slug }} />
      <PageHero
        eyebrow="Case study"
        title={cs.client}
        description={cs.summary}
        crumbs={[{ name: "Case Studies", path: "/case-studies" }, { name: cs.client, path: `/case-studies/${cs.slug}` }]}
      >
        <dl className="grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-3">
          <div><dt className="text-xs uppercase tracking-wider text-subtle">Client / Project</dt><dd className="mt-1 font-medium text-fg">{cs.client}</dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-subtle">Industry</dt><dd className="mt-1 font-medium text-fg">{cs.industry}</dd></div>
          {cs.isSample && <div><dt className="text-xs uppercase tracking-wider text-subtle">Status</dt><dd className="mt-1"><Badge tone="muted">Sample case study</Badge></dd></div>}
        </dl>
      </PageHero>

      <div className="container-x">
        <div data-reveal className="aspect-[16/8] w-full overflow-hidden rounded-3xl border border-line bg-[radial-gradient(circle_at_30%_0%,color-mix(in_srgb,var(--primary)_20%,transparent),transparent_60%)] p-4 sm:p-10">
          <ProjectMockup variant={cs.screenshots[0].mockup} />
        </div>

        <article className="mx-auto mt-16 max-w-5xl">
          <Block title="Challenge">{cs.challenge.map((p) => <p key={p} className="mb-4 last:mb-0">{p}</p>)}</Block>
          <Block title="Solution">{cs.solution.map((p) => <p key={p} className="mb-4 last:mb-0">{p}</p>)}</Block>
          <Block title="Key features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.keyFeatures.map((f) => (
                <li key={f.title} className="rounded-2xl border border-line bg-surface/60 p-5">
                  <span className="block text-base font-semibold text-fg">{f.title}</span>
                  <span className="mt-1 block text-sm">{f.text}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Technology">
            <ul className="flex flex-wrap gap-2">{cs.technology.map((t) => <li key={t} className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-sm text-fg">{t}</li>)}</ul>
          </Block>
          <Block title="Screenshots">
            <div className="grid gap-5 sm:grid-cols-2">
              {cs.screenshots.map((s) => (
                <figure key={s.caption}>
                  <div className="aspect-[4/3]">
                    {s.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.src} alt={s.caption} loading="lazy" className="h-full w-full rounded-xl border border-line object-cover" />
                    ) : (
                      <ProjectMockup variant={s.mockup} />
                    )}
                  </div>
                  <figcaption className="mt-2 text-sm text-subtle">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Block>
          <Block title="Implementation">
            <ol className="space-y-4">
              {cs.implementation.map((s, i) => (
                <li key={s.phase} className="flex gap-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-xs text-primary-text">{i + 1}</span>
                  <span><span className="font-semibold text-fg">{s.phase}.</span> {s.text}</span>
                </li>
              ))}
            </ol>
          </Block>
          <Block title="Results">
            {cs.results?.length ? (
              <ul className="space-y-2">{cs.results.map((r) => <li key={r}>{r}</li>)}</ul>
            ) : (
              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-line-strong bg-surface/40 p-5 text-base">
                <Hourglass className="mt-0.5 h-5 w-5 shrink-0 text-subtle" aria-hidden="true" />
                <p>Results will be published once they have been measured and approved by the client.</p>
              </div>
            )}
          </Block>
        </article>

        <nav aria-label="More case studies" className="mx-auto mt-6 flex max-w-5xl flex-col justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <Link href="/case-studies" className="inline-flex items-center gap-2 py-2 text-sm font-medium text-muted hover:text-fg"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All case studies</Link>
          {next.slug !== cs.slug && (
            <Link href={`/case-studies/${next.slug}`} className="inline-flex items-center gap-2 py-2 text-sm font-medium text-primary-text">Next: {next.client} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          )}
        </nav>
      </div>
      <CTASection location="case_study_cta" title="Facing a similar challenge?" />
    </>
  );
}
