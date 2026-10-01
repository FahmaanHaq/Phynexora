import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

/** Consistent header for all inner pages (H1 + breadcrumbs + BreadcrumbList schema). */
export function PageHero({ eyebrow, title, description, crumbs, children, aside, className }: Props) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className={cn("relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40", className)}>
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--glow)/0.22),transparent_65%)] blur-2xl" />
      <div className={cn("container-x relative", aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]")}>
        <div className="max-w-3xl">
          <Breadcrumbs items={all} />
          {eyebrow && <p className="eyebrow mb-4 animate-fade-up">{eyebrow}</p>}
          <h1 className="animate-fade-up text-4xl font-semibold leading-[1.06] text-fg [animation-delay:60ms] sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-muted [animation-delay:120ms]">{description}</p>}
          {children && <div className="mt-9 animate-fade-up [animation-delay:180ms]">{children}</div>}
        </div>
        {aside && <div className="animate-fade-up [animation-delay:160ms]">{aside}</div>}
      </div>
      <JsonLd data={breadcrumbSchema(all)} />
    </section>
  );
}
