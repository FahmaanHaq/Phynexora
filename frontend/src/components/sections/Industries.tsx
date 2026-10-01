import { ArrowRight } from "lucide-react";
import { industries } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="section-y relative bg-elevated">
      <div className="container-x">
        <SectionHeader
          id="industries-title"
          eyebrow="Industries"
          title="Technology For Different Industries"
          description="Our approach works across sectors because it starts with how each business operates."
        />
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li
              key={ind.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 60}ms` }}
              className="group rounded-2xl border border-line bg-surface/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface sm:p-5"
            >
              <Icon name={ind.icon} className="h-6 w-6 text-primary-text transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 text-sm font-semibold text-fg sm:text-base">{ind.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle sm:text-sm">{ind.text}</p>
            </li>
          ))}
          <li data-reveal className="col-span-2 flex flex-col justify-between gap-4 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--primary-text)_45%,transparent)] bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] p-5 sm:col-span-3 sm:flex-row sm:items-center lg:col-span-2">
            <div>
              <h3 className="text-base font-semibold text-fg">Have a different business or industry?</h3>
              <p className="mt-1 text-sm text-muted">Let&apos;s discuss your requirements.</p>
            </div>
            <Button href="/contact#enquiry" size="sm" iconRight={<ArrowRight />} className="h-10 self-start sm:self-auto">Let&apos;s talk</Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
