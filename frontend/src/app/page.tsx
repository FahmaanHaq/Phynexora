import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ValuePoints } from "@/components/sections/ValuePoints";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { WhyPhynexora } from "@/components/sections/WhyPhynexora";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/jsonld";
import { faqs } from "@/content/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Phynexora | Software & Digital Solutions",
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePoints />
      <ServicesGrid />
      <ProblemSolution />
      <SolutionsSection />
      <Industries />
      <Process />
      <TechStack />
      <PortfolioPreview />
      <WhyPhynexora />
      <Testimonials />
      <FAQSection limit={6} />
      <CTASection />
      <JsonLd data={faqSchema(faqs.slice(0, 6))} />
    </>
  );
}
