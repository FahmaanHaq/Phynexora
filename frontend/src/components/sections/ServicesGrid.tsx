import { homeServices } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="What We Build"
          description="From a simple business website to a complete enterprise platform, we build technology based on what your business actually needs."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {homeServices.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={(i % 3) * 80} className={s.featured ? "lg:col-span-3" : "lg:col-span-2"} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="secondary" iconRight={<ArrowRight />}>View all services</Button>
        </div>
      </div>
    </section>
  );
}
