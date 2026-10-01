import { valuePoints } from "@/content/company";
import { Icon } from "@/components/ui/Icon";

export function ValuePoints() {
  return (
    <section aria-label="Why businesses work with Phynexora" className="relative border-y border-line bg-elevated/60">
      <div className="container-x">
        <ul className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {valuePoints.map((v, i) => (
            <li key={v.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }} className="group flex gap-4 px-1 py-6 sm:px-5 lg:flex-col lg:gap-3 lg:py-9 lg:first:pl-0">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-primary-text transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[color-mix(in_srgb,var(--primary-text)_45%,transparent)]" aria-hidden="true">
                <Icon name={v.icon} className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h2 className="text-[0.95rem] font-semibold text-fg">{v.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
