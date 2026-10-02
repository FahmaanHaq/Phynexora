import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

export function SolutionCard({ title, text, icon, href, delay = 0 }: { title: string; text: string; icon: IconName; href: string; delay?: number }) {
  return (
    <Link
      href={href}
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--primary-text)_40%,transparent)] hover:bg-surface sm:p-6"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-[linear-gradient(to_bottom,var(--primary-text),var(--cyan))] transition-transform duration-500 group-hover:scale-y-100" />
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary-text transition-colors group-hover:bg-primary group-hover:text-on-primary" aria-hidden="true">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-base font-semibold text-fg">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
      </span>
    </Link>
  );
}
