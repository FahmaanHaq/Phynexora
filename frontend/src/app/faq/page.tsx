import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/ui/JsonLd";
import { OpenChatButton } from "@/components/widgets/OpenChatButton";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { faqs } from "@/content/faqs";
import { faqSchema } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Phynexora's ERP, POS, website, app and custom software development services.",
  path: "/faq",
});

const categories = ["General", "Services", "Projects", "Support"] as const;

export default function FAQPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Straight answers to the questions businesses ask us most. If yours isn't here, just ask." crumbs={[{ name: "FAQ", path: "/faq" }]}>
        <div className="flex flex-wrap gap-3">
          <Button href={whatsappUrl()} variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "faq_page" }}>Ask on WhatsApp</Button>
          <OpenChatButton source="faq_page" />
        </div>
      </PageHero>
      <section className="pb-12" aria-label="Questions">
        <div className="container-x mx-auto max-w-4xl space-y-12">
          {categories.map((c) => {
            const items = faqs.filter((f) => f.category === c);
            if (!items.length) return null;
            return (
              <div key={c} data-reveal>
                <h2 className="mb-5 text-xl font-semibold text-fg">{c}</h2>
                <Accordion items={items} defaultOpen={null} />
              </div>
            );
          })}
        </div>
      </section>
      <CTASection location="faq_cta" />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
