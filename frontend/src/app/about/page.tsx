import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { CTASection } from "@/components/sections/CTASection";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { LogoMark } from "@/components/ui/Logo";
import { brandPillars, whyPhynexora } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: "Phynexora is a software and digital solutions company that designs and builds technology around the way businesses actually work.",
  path: "/about",
});

const facts = [
  { to: 15, suffix: "+", label: "Service areas, from ERP to AI" },
  { to: 7, suffix: "", label: "Steps in our delivery process" },
  { to: 10, suffix: "+", label: "Industries our approach applies to" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Phynexora"
        title={<>Technology that makes <span className="text-gradient">business easier.</span></>}
        description="Phynexora is a software and digital solutions company focused on building practical, modern technology that makes business and everyday activities easier."
        crumbs={[{ name: "About", path: "/about" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact#enquiry" size="lg" iconRight={<ArrowRight />}>Start a Project</Button>
          <Button href="/services" size="lg" variant="secondary">Our Services</Button>
        </div>
      </PageHero>

      <section className="section-y pt-0" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 id="story-title" className="text-3xl font-semibold text-fg sm:text-4xl">We build digital solutions around the way you work.</h2>
          </div>
          <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>We design and develop customized digital solutions based on the actual requirements, workflows and challenges of businesses. That means listening first: understanding how work flows today, where time is lost, and what the people using the system need.</p>
            <p>Our work spans custom ERP and POS systems, business management platforms, websites and web applications, e-commerce, mobile apps, APIs and integrations, automation, AI-powered features, database and cloud solutions — and the long-term maintenance and support that keeps them running well.</p>
            <p>Whether it&apos;s a focused business website or a complete enterprise platform, the goal is the same: technology that is reliable, easy to use and genuinely useful.</p>
          </div>
        </div>
        <div className="container-x mt-16">
          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }} className="surface-card p-7">
                <dd className="text-5xl font-semibold text-fg"><CountUp to={f.to} suffix={f.suffix} /></dd>
                <dt className="mt-2 text-sm text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-elevated" aria-labelledby="pillars-title">
        <div className="container-x">
          <SectionHeader id="pillars-title" eyebrow="What we stand for" title={<>{siteConfig.tagline}</>} description="Four commitments that shape every project we take on." />
          <ol className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
            {brandPillars.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }} className="surface-card flex gap-5 p-7">
                <span className="font-mono text-sm text-primary-text">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-fg">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal className="mx-auto mt-14 flex max-w-xl flex-col items-center text-center">
            <LogoMark className="h-12 w-12" />
            <p className="mt-4 text-lg text-muted">From the first conversation to long after launch, you work with one team that understands both your business and the technology behind it.</p>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeader id="values-title" eyebrow="How we think" title="Why businesses choose Phynexora" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPhynexora.map((w, i) => <FeatureCard key={w.title} {...w} index={i} delay={(i % 3) * 80} />)}
          </div>
        </div>
      </section>

      <Process />
      <TechStack />
      <CTASection location="about_cta" />
    </>
  );
}
