import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const links = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div className="container-x relative text-center">
        <div aria-hidden="true" className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-dashed border-line-strong animate-spin-slow" />
          <span className="absolute inset-6 rounded-full border border-line" />
          <span className="absolute right-2 top-6 h-3 w-3 rounded-full bg-[var(--cyan)]" />
          <LogoMark className="h-14 w-14" />
        </div>
        <p className="mt-8 font-mono text-sm text-primary-text">Error 404</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold text-fg sm:text-5xl">Looks like this page took a wrong turn.</h1>
        <p className="mt-4 text-lg text-muted">Let&apos;s get you back to Phynexora.</p>
        <div className="mt-9 flex justify-center">
          <Button href="/" size="lg" icon={<ArrowLeft />}>Back to Home</Button>
        </div>
        <nav aria-label="Popular pages" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((l) => <li key={l.href}><Link href={l.href} className="text-muted hover:text-fg">{l.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
