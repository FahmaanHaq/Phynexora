import { Icon } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

/** Generic icon + title + text card (value points, why-us, solutions). */
export function FeatureCard({ title, text, icon, className, delay = 0, index }: { title: string; text: string; icon: IconName; className?: string; delay?: number; index?: number }) {
  return (
    <div
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn("group surface-card relative p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong", className)}
    >
      <div className="flex items-center justify-between">
        <IconTile><Icon name={icon} /></IconTile>
        {index !== undefined && <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
