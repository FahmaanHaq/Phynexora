import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { caseStudies } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description: "How Phynexora approaches business software projects — the challenge, the solution, key features, technology and implementation.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="From business challenge to working system"
        description="A closer look at how we approach projects: what the business needed, what we built, and how it was implemented."
        crumbs={[{ name: "Case Studies", path: "/case-studies" }]}
      />
      <section className="pb-12" aria-label="Case studies">
        <div className="container-x space-y-5">
          {caseStudies.map((cs, i) => <CaseStudyCard key={cs.slug} cs={cs} delay={i * 60} />)}
        </div>
      </section>
      <CTASection location="case_studies_cta" />
    </>
  );
}
