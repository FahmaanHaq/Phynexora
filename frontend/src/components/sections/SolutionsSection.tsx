import { solutions } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SolutionCard } from "@/components/cards/SolutionCard";

export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className="section-y">
      <div className="container-x">
        <SectionHeader
          id="solutions-title"
          eyebrow="Solutions"
          title="Solutions Designed Around Your Business"
          description="Start with the outcome you need. We'll bring together the right systems, integrations and automation to get you there."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <SolutionCard key={s.slug} title={s.title} text={s.text} icon={s.icon} href={`/solutions#${s.slug}`} delay={(i % 3) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
