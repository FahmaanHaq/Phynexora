import { techGroups } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LogoMark } from "@/components/ui/Logo";

export function TechStack() {
  return (
    <section aria-labelledby="tech-title" className="section-y relative overflow-hidden bg-elevated">
      <div className="container-x">
        <SectionHeader
          id="tech-title"
          eyebrow="Technology"
          title="A modern, proven technology ecosystem"
          description="We choose technologies for reliability, security and long-term maintainability — not trends."
        />
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-line-strong bg-black shadow-[0_0_60px_-10px_rgb(var(--glow)/0.6)]">
              <LogoMark className="h-full w-full rounded-[22px]" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {techGroups.map((g, gi) => (
              <div
                key={g.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${gi * 80}ms` }}
                className="surface-card relative p-6 sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold text-fg">{g.title}</h3>
                  <span className="font-mono text-xs text-subtle">{String(g.items.length).padStart(2, "0")} tools</span>
                </div>
                <p className="mt-1 text-sm text-muted">{g.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {g.items.map((t) => (
                    <li key={t.name} className="group inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface-2/50 py-1.5 pl-1.5 pr-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--primary-text)_40%,transparent)]">
                      <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(140deg,color-mix(in_srgb,var(--primary)_22%,var(--surface)),var(--surface))] font-mono text-[11px] font-semibold text-primary-text">
                        {t.short}
                      </span>
                      <span className="text-sm font-medium text-fg">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
