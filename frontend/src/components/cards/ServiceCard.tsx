import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  text: string;
  icon: IconName;
  href: string;
  cta?: string;
  points?: string[];
  featured?: boolean;
  className?: string;
  delay?: number;
};

export function ServiceCard({ title, text, icon, href, cta = "Learn more", points, featured, className, delay = 0 }: Props) {
  return (
    <Link
      href={href}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn(
        "group surface-card relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary-text)_40%,transparent)] sm:p-7",
        featured && "lg:p-8",
        className,
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <IconTile size={featured ? "lg" : "md"}><Icon name={icon} /></IconTile>
        <ArrowUpRight className="h-5 w-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-text" aria-hidden="true" />
      </div>
      <h3 className={cn("mt-6 font-semibold text-fg", featured ? "text-2xl" : "text-lg")}>{title}</h3>
      <p className={cn("mt-2.5 leading-relaxed text-muted", featured ? "text-[0.975rem]" : "text-sm")}>{text}</p>
      {points && (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${title} features`}>
          {points.map((p) => (
            <li key={p} className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-xs text-muted">{p}</li>
          ))}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary-text">
        {cta}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
