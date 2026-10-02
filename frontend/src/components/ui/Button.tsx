"use client";

import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "text-on-primary bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] shadow-[0_10px_30px_-12px_rgb(var(--glow)/0.8)] hover:shadow-[0_16px_40px_-12px_rgb(var(--glow)/0.9)] border border-white/10",
  secondary: "text-fg bg-surface/70 border border-line-strong hover:border-primary-text/60 hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2 border border-transparent",
  whatsapp: "text-white bg-[#128c4b] hover:bg-[#0f7a41] border border-white/10 shadow-[0_10px_30px_-14px_rgba(31,168,85,0.9)]",
  inverse: "text-[#0a1023] bg-white hover:bg-white/90 border border-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-[0.95rem] gap-2 rounded-xl",
  lg: "h-13 px-6 text-base gap-2.5 rounded-xl",
};

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
  trackEvent?: AnalyticsEvent;
  trackProps?: Record<string, string>;
};

type AsLink = Common & { href: string; external?: boolean; type?: never; onClick?: () => void; disabled?: never };
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group relative inline-flex select-none items-center justify-center whitespace-nowrap font-medium",
    "transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", icon, iconRight, className, children, trackEvent, trackProps } = props;
  const classes = buttonClasses(variant, size, className);
  const inner = (
    <>
      {icon && <span className="inline-flex shrink-0 [&_svg]:h-[1.1em] [&_svg]:w-[1.1em]">{icon}</span>}
      <span>{children}</span>
      {iconRight && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 [&_svg]:h-[1.1em] [&_svg]:w-[1.1em]">
          {iconRight}
        </span>
      )}
    </>
  );

  const fire = () => trackEvent && track(trackEvent, trackProps);

  if (props.href !== undefined) {
    const { href, external, onClick } = props as AsLink;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      const newTab = /^https?:/.test(href);
      return (
        <a
          href={href}
          className={classes}
          onClick={() => { fire(); onClick?.(); }}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
          {newTab && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={() => { fire(); onClick?.(); }}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, iconRight: _ir, className: _c, children: _ch, trackEvent: _te, trackProps: _tp, onClick, type, ...rest } =
    props as AsButton;
  void _v; void _s; void _i; void _ir; void _c; void _ch; void _te; void _tp;
  return (
    <button
      type={type ?? "button"}
      className={classes}
      onClick={(e) => { fire(); onClick?.(e); }}
      {...rest}
    >
      {inner}
    </button>
  );
}
