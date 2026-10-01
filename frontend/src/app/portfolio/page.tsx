import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { TrackView } from "@/components/widgets/TrackView";
import { projects } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";
import { PortfolioGrid } from "./PortfolioGrid";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio — Our Work",
  description: "ERP, POS, web, mobile and custom software projects designed and built by Phynexora.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <TrackView event="portfolio_view" props={{ page: "portfolio" }} />
      <PageHero
        eyebrow="Portfolio"
        title="Our Work"
        description="The kinds of systems we design and build — each one shaped around a specific business and the people who use it."
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
      />
      <section className="pb-12" aria-label="Projects">
        <div className="container-x">
          <PortfolioGrid projects={projects} />
          <p className="mt-10 text-center text-xs text-subtle">Entries marked “Sample project” illustrate the type of work we deliver; client names and results are shown only with permission.</p>
        </div>
      </section>
      <CTASection location="portfolio_cta" title="Have a project like these in mind?" />
    </>
  );
}
