import Link from "next/link";
import { faqs } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/whatsapp";

export function FAQSection({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section aria-labelledby="faq-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl">Questions businesses often ask us</h2>
          <p className="mt-4 text-lg text-muted">Can&apos;t find what you&apos;re looking for? Ask us directly — we&apos;re happy to help.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappUrl()} variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "faq" }}>Ask on WhatsApp</Button>
            {limit && <Link href="/faq" className="inline-flex h-11 items-center px-2 text-sm font-medium text-primary-text hover:underline">See all FAQs →</Link>}
          </div>
        </div>
        <div data-reveal>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
