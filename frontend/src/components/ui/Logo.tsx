import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import markSrc from "../../../public/brand/phynexora-mark.png";
import wordDark from "../../../public/brand/phynexora-wordmark-dark.png";
import wordLight from "../../../public/brand/phynexora-wordmark-light.png";

/**
 * Official Phynexora logo.
 * Assets live in /public/brand — every placement on the site uses these components,
 * so replacing those files updates the logo everywhere.
 */
export function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={markSrc}
      alt=""
      aria-hidden="true"
      priority={priority}
      sizes="96px"
      className={cn("h-8 w-8 shrink-0 rounded-[22%] bg-black object-cover", className)}
    />
  );
}

/** Wordmark: silver version on dark backgrounds, graphite version on light backgrounds. */
export function Wordmark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("relative inline-block h-[18px] w-auto", className)}>
      <Image src={wordDark} alt="Phynexora" priority={priority} sizes="200px" className="hidden h-full w-auto dark:block" />
      <Image src={wordLight} alt="Phynexora" priority={priority} sizes="200px" className="block h-full w-auto dark:hidden" />
    </span>
  );
}

export function Logo({ className, compact = false, href = "/" }: { className?: string; compact?: boolean; href?: string | null }) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark priority className={cn("transition-all duration-300", compact ? "h-8 w-8" : "h-9 w-9")} />
      <Wordmark priority className={cn("transition-all duration-300", compact ? "h-[16px]" : "h-[18px]")} />
    </span>
  );
  if (!href) return content;
  return (
    <Link href={href} aria-label="Phynexora — home" className="inline-flex rounded-lg py-1.5">
      {content}
    </Link>
  );
}
