import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Consistent icon container used on cards across the site. */
export function IconTile({ children, className, size = "md" }: { children: ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-xl border text-primary-text",
        "border-[color-mix(in_srgb,var(--primary-text)_22%,transparent)]",
        "bg-[linear-gradient(140deg,color-mix(in_srgb,var(--primary)_16%,transparent),color-mix(in_srgb,var(--violet)_8%,transparent))]",
        size === "sm" && "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
        size === "md" && "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
        size === "lg" && "h-14 w-14 rounded-2xl [&_svg]:h-6 [&_svg]:w-6",
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
