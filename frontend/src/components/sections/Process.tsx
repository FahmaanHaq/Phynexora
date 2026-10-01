import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeader
          id="process-title"
          eyebrow="How we work"
          title="A clear process, from first conversation to long-term support"
          description="Seven steps that keep projects predictable — with regular demos, honest communication and no surprises at launch."
        />
        <div className="mt-16">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
