import { whyPhynexora } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/cards/FeatureCard";

export function WhyPhynexora() {
  return (
    <section aria-labelledby="why-title" className="section-y relative overflow-hidden bg-elevated">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <SectionHeader id="why-title" eyebrow="Why Phynexora" title="Why Phynexora?" description="A technology partner that starts with your business and stays with you after launch." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPhynexora.map((w, i) => (
            <FeatureCard key={w.title} {...w} index={i} delay={(i % 3) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
