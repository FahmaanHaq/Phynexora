import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroEcosystem } from "./HeroEcosystem";
import { CountUp } from "@/components/ui/CountUp";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.28),transparent_65%)] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--violet)_24%,transparent),transparent_65%)] blur-3xl" />

      <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:pb-24">
        <div className="max-w-2xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-1.5 pr-4 text-xs font-medium text-muted backdrop-blur">
            <span className="rounded-full bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary">Phynexora</span>
            Software &amp; Digital Solutions
          </p>
          <h1 id="hero-title" className="mt-6 animate-fade-up text-[2.6rem] font-semibold leading-[1.03] text-fg [animation-delay:80ms] sm:text-6xl lg:text-[4.1rem]">
            We Build Software That <span className="text-gradient">Makes Business Easier.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted [animation-delay:160ms] sm:text-lg">
            From ERP and POS systems to websites, applications, integrations and intelligent digital solutions, Phynexora builds technology around the way your business works.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
            <Button href="/contact#enquiry" size="lg" iconRight={<ArrowRight />} trackEvent="cta_click" trackProps={{ location: "hero", cta: "start_project" }}>
              Start a Project
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              Explore Our Services
            </Button>
            <Button href={whatsappUrl()} size="lg" variant="ghost" icon={<WhatsAppIcon className="text-[#1fa855]" />} trackEvent="whatsapp_click" trackProps={{ location: "hero" }}>
              Chat on WhatsApp
            </Button>
          </div>
          <dl className="mt-12 grid max-w-lg animate-fade-up grid-cols-3 gap-6 border-t border-line pt-6 [animation-delay:320ms]">
            {([
              [<CountUp key="a" to={15} suffix="+" />, "Service areas"],
              [<CountUp key="b" to={7} suffix="-step" />, "Delivery process"],
              ["1", "Technology partner"],
            ] as const).map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-semibold text-fg sm:text-3xl">{v}</dd>
                <dd className="mt-1 text-xs text-subtle sm:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:200ms]">
          <HeroEcosystem />
        </div>
      </div>
    </section>
  );
}
