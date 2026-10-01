import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { CTASection } from "@/components/sections/CTASection";
import { Process } from "@/components/sections/Process";
import { servicePages, allCapabilities } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Software Development Services",
  description: "Custom ERP, POS, websites, web applications, e-commerce, mobile apps, integrations, AI and automation — software services from Phynexora.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">run your business digitally.</span></>}
        description="From a simple business website to a complete enterprise platform, we build technology based on what your business actually needs."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact#enquiry" size="lg" iconRight={<ArrowRight />}>Get a Quote</Button>
          <Button href={whatsappUrl(whatsappMessages.quote)} size="lg" variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "services_hero" }}>Discuss Your Project</Button>
        </div>
      </PageHero>

      <section className="pb-20 sm:pb-28" aria-labelledby="core-title">
        <div className="container-x">
          <h2 id="core-title" className="sr-only">Core services</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {servicePages.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}
                className={`group surface-card relative flex flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary-text)_40%,transparent)] sm:p-9 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.2),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <IconTile size="lg"><Icon name={s.icon} /></IconTile>
                  <ArrowUpRight className="h-5 w-5 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-text" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-fg">{s.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {s.features.slice(0, i === 0 ? 6 : 4).map((f) => (
                    <li key={f.title} className="rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs text-muted">{f.title}</li>
                  ))}
                </ul>
                <span className="mt-auto pt-7 text-sm font-medium text-primary-text">Explore {s.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-elevated" aria-labelledby="all-title">
        <div className="container-x">
          <SectionHeader id="all-title" eyebrow="Full capability list" title="All the ways we can help" description="Every service can be delivered on its own or combined into a connected solution." />
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allCapabilities.map((c, i) => (
              <li key={c.title} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <Link href={c.href} className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/60 p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface">
                  <Icon name={c.icon} className="mt-0.5 h-5 w-5 shrink-0 text-primary-text" />
                  <span>
                    <span className="block font-medium text-fg">{c.title}</span>
                    <span className="mt-1 block text-sm text-muted">{c.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <CTASection location="services_cta" title="Not sure which service you need?" text="Describe the problem you're trying to solve. We'll recommend the simplest solution that works — even if it's smaller than you expected." />
    </>
  );
}
