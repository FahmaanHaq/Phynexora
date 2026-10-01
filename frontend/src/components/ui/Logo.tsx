import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Temporary text-based Phynexora logo.
 * To use the official logo, replace <LogoMark /> with an <Image src="/brand/logo.svg" .../>
 * — every placement on the site uses this single component.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={cn("h-8 w-8 shrink-0", className)}>
      <defs>
        <linearGradient id="px-mark-g" x1="6" y1="4" x2="60" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D7BFF" />
          <stop offset="0.55" stopColor="#6D5BFF" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#px-mark-g)" />
      <path d="M22 47V17h12.5a10 10 0 0 1 0 20H22" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 37l8.5 8.5" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22" cy="47" r="4.2" fill="#fff" />
      <circle cx="47.5" cy="46.5" r="3.6" fill="#fff" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-[0.2em] text-fg", className)}>
      PHYNE<span className="text-primary-text">X</span>ORA
    </span>
  );
}

export function Logo({ className, compact = false, href = "/" }: { className?: string; compact?: boolean; href?: string | null }) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("transition-all duration-300", compact ? "h-7 w-7" : "h-8 w-8")} />
      <Wordmark className={cn("transition-all duration-300", compact ? "text-[0.95rem]" : "text-[1.05rem]")} />
    </span>
  );
  if (!href) return content;
  return (
    <Link href={href} aria-label="Phynexora — home" className="inline-flex rounded-lg py-1.5">
      {content}
    </Link>
  );
}
