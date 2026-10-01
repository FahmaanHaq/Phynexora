import { Check, X, ArrowRight } from "lucide-react";
import { comparison } from "@/content/company";

export function ProblemSolution() {
  return (
    <section aria-labelledby="problem-title" className="section-y relative overflow-hidden bg-elevated">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--glow)/0.12),transparent_65%)]" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">The Phynexora approach</p>
            <h2 id="problem-title" className="mt-4 text-3xl font-semibold leading-[1.08] text-fg sm:text-5xl">
              Your Business Is Unique. <span className="text-gradient">Your Software Should Be Too.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Every business works differently. Instead of forcing your business into a standard system, we understand your workflow and build technology around it.
            </p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2">
            <div data-reveal className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">Traditional approach</p>
              <ul className="mt-6 space-y-4">
                {comparison.traditional.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[0.95rem] text-muted">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-subtle" aria-hidden="true"><X className="h-3.5 w-3.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-elevated text-primary-text shadow-lg sm:inline-flex">
              <ArrowRight className="h-4 w-4" />
            </span>
            <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--primary-text)_40%,transparent)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--primary)_16%,var(--surface)),var(--surface))] p-6 shadow-[0_30px_60px_-30px_rgb(var(--glow)/0.6)] sm:p-7">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--cyan)_30%,transparent),transparent_70%)]" />
              <p className="relative text-xs font-medium uppercase tracking-[0.14em] text-primary-text">Phynexora approach</p>
              <ul className="relative mt-6 space-y-4">
                {comparison.phynexora.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[0.95rem] font-medium text-fg">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-hidden="true"><Check className="h-3.5 w-3.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
