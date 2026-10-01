import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass = (invalid?: boolean) =>
  cn(
    "block w-full rounded-xl border bg-surface px-4 py-3 text-[16px] text-fg placeholder:text-subtle transition-colors sm:text-[0.95rem]",
    "focus:border-[color-mix(in_srgb,var(--primary-text)_70%,transparent)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primary)_18%,transparent)]",
    invalid ? "border-red-500/70" : "border-line hover:border-line-strong",
  );

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
        {required ? <span className="ml-0.5 text-primary-text" aria-hidden="true">*</span> : <span className="ml-1.5 text-xs font-normal text-subtle">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-500">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}
