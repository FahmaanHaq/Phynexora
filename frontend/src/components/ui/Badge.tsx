import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className, tone = "default" }: { children: ReactNode; className?: string; tone?: "default" | "primary" | "muted" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "default" && "border-line bg-surface-2/70 text-muted",
        tone === "primary" && "border-[color-mix(in_srgb,var(--primary-text)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-primary-text",
        tone === "muted" && "border-transparent bg-surface-2 text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
