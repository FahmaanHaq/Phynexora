import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeader({ eyebrow, title, description, align = "center", as = "h2", className, id }: Props) {
  const Heading = as;
  return (
    <div
      data-reveal
      className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4 inline-flex items-center gap-2", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-[var(--primary-text)]" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-semibold text-fg",
          as === "h1" ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl" : "text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
