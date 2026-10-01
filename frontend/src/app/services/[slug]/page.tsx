import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProjectMockup } from "@/components/mockups/ProjectMockup";
import { TrackView } from "@/components/widgets/TrackView";
import { OpenChatButton } from "@/components/widgets/OpenChatButton";
import { getServicePage, servicePages } from "@/content/services";
import type { MockupVariant } from "@/content/portfolio";
import { processSteps } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/jsonld";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

const mockups: Record<string, MockupVariant> = {
  erp: "erp", pos: "pos", "web-development": "web", "mobile-apps": "mobile", "custom-software": "workflow", "ai-automation": "analytics", integrations: "analytics",
};

const enquiryService: Record<string, string> = {
  erp: "ERP System", pos: "POS System", "web-development": "Business Website", "mobile-apps": "Mobile Application",
  "custom-software": "Custom Software", "ai-automation": "AI & Automation", integrations: "API & System Integration",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.summary, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const related = s.related.map(getServicePage).filter(Boolean) as NonNullable<ReturnType<typeof getServicePage>>[];
  const contactHref = `/contact?service=${encodeURIComponent(enquiryService[s.slug])}#enquiry`;

  return (
    <>
      <TrackView event="service_page_view" props={{ service: s.slug }} />
      <PageHero
        eyebrow={s.title}
        title={s.heroTitle}
        description={s.heroText}
        crumbs={[{ name: "Services", path: "/services" }, { name: s.label, path }]}
        aside={<div className="aspect-[4/3] w-full"><ProjectMockup variant={mockups[s.slug]} /></div>}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={contactHref} size="lg" iconRight={<ArrowRight />} trackEvent="quote_request" trackProps={{ location: "service_hero", service: s.slug }}>Get a Quote</Button>
          <Button href={whatsappUrl(whatsappMessages.service(s.title))} size="lg" variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "service_hero", service: s.slug }}>Discuss on WhatsApp</Button>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="pb-20 sm:pb-28" aria-labelledby="overview-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="overview-title" data-reveal className="text-3xl font-semibold text-fg sm:text-4xl">Overview</h2>
          <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {s.overview.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-y bg-elevated" aria-labelledby="features-title">
        <div className="container-x">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Capabilities</p>
            <h2 id="features-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl">What&apos;s included</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, i) => (
              <div key={f.title} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }} className="surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                <span className="font-mono text-xs text-primary-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / good for / deliverables */}
      <section className="section-y" aria-label="Benefits and deliverables">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {[
            { title: "Benefits", items: s.benefits },
            { title: "A good fit for", items: s.goodFor },
            { title: "What you receive", items: s.deliverables },
          ].map((col, ci) => (
            <div key={col.title} data-reveal style={{ ["--reveal-delay" as string]: `${ci * 80}ms` }} className="surface-card p-7">
              <h2 className="text-xl font-semibold text-fg">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.95rem] text-muted">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_18%,transparent)] text-primary-text" aria-hidden="true"><Check className="h-3 w-3" /></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech + process */}
      <section className="section-y bg-elevated" aria-labelledby="approach-title">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">Approach</p>
            <h2 id="approach-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl">How we deliver {s.label.toLowerCase()}</h2>
            <p className="mt-4 text-muted">Every project follows our seven-step process, with regular demos so you see progress early and often.</p>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-subtle">Typical technologies</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.tech.map((t) => <li key={t} className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg">{t}</li>)}
            </ul>
          </div>
          <ol data-reveal className="space-y-2">
            {processSteps.map((p) => (
              <li key={p.number} className="flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4">
                <IconTile size="sm"><Icon name={p.icon} /></IconTile>
                <span className="font-mono text-xs text-subtle">{p.number}</span>
                <span className="font-medium text-fg">{p.title}</span>
                <span className="hidden text-sm text-muted sm:inline">— {p.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-y" aria-labelledby="service-faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="service-faq-title" className="mt-4 text-3xl font-semibold text-fg sm:text-4xl">Common questions</h2>
            <div className="mt-8"><OpenChatButton source={`service_${s.slug}`}>Ask our assistant</OpenChatButton></div>
          </div>
          <div data-reveal><Accordion items={s.faqs} /></div>
        </div>
      </section>

      {/* Related */}
      <section className="pb-8" aria-labelledby="related-title">
        <div className="container-x">
          <h2 id="related-title" className="text-2xl font-semibold text-fg">Related services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong">
                <IconTile><Icon name={r.icon} /></IconTile>
                <span className="flex-1 font-medium text-fg">{r.title}</span>
                <ArrowRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary-text" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection location={`service_${s.slug}_cta`} title={`Let's talk about your ${s.label.replace(/s$/, "")} project.`} text="Share your requirements and we'll suggest a practical approach, timeline and next steps." whatsappMessage={whatsappMessages.service(s.title)} />
      <JsonLd data={[serviceSchema({ name: s.title, description: s.summary, path }), faqSchema(s.faqs)]} />
    </>
  );
}
