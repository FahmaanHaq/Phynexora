"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { servicePages } from "@/content/services";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ThemeToggle } from "./ThemeToggle";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary">
        Skip to content
      </a>
      <div className={cn("transition-all duration-300", scrolled ? "pt-2 sm:pt-3" : "pt-0")}>
        <nav
          aria-label="Main"
          className={cn(
            "container-x transition-all duration-300",
            scrolled ? "max-w-[1180px]" : "",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl border transition-all duration-300",
              scrolled ? "glass h-14 px-3 pl-4 shadow-[0_20px_50px_-25px_rgb(var(--shadow-color)/0.6)] sm:h-16" : "h-20 border-transparent px-0",
            )}
          >
            <Logo compact={scrolled} />

            <ul className="hidden items-center lg:flex">
              {mainNav.map((item) =>
                item.label === "Services" ? (
                  <li key={item.href} ref={servicesRef} className="relative" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="nav-link rounded-lg py-2 pl-3 pr-1 text-sm font-medium text-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="rounded-md p-1.5 text-subtle transition-colors hover:text-fg"
                      >
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} aria-hidden="true" />
                      </button>
                    </div>
                    <div
                      id="services-menu"
                      className={cn(
                        "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                        servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="glass rounded-2xl p-3 shadow-[0_30px_60px_-20px_rgb(var(--shadow-color)/0.6)]">
                        <ul className="grid grid-cols-2 gap-1">
                          {servicePages.map((s) => (
                            <li key={s.slug}>
                              <Link href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2">
                                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-primary-text transition-colors group-hover:border-primary-text/40">
                                  <Icon name={s.icon} className="h-4 w-4" />
                                </span>
                                <span>
                                  <span className="block text-sm font-medium text-fg">{s.label}</span>
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-subtle">{s.summary}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link href="/services" className="flex h-full items-center justify-between gap-2 rounded-xl border border-dashed border-line-strong p-3 text-sm font-medium text-primary-text transition-colors hover:bg-surface-2">
                              View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="nav-link block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <ThemeToggle />
                <Button href="/contact#enquiry" size="sm" className="h-10 px-4" iconRight={<ArrowRight />} trackEvent="cta_click" trackProps={{ location: "navbar" }}>
                  Let&apos;s Talk
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-fg lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn("fixed inset-0 z-[55] lg:hidden", mobileOpen ? "visible" : "invisible")}
      >
        <div className={cn("absolute inset-0 bg-bg/70 backdrop-blur-sm transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-elevated transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-20 items-center justify-between px-5">
            <Logo />
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-fg transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-subtle" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-2 mt-6 px-3">Services</p>
            <ul className="grid grid-cols-2 gap-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm text-muted hover:text-fg">
                    <Icon name={s.icon} className="h-4 w-4 text-primary-text" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 border-t border-line p-5">
            <Button href="/contact#enquiry" className="w-full" iconRight={<ArrowRight />} onClick={() => setMobileOpen(false)}>Let&apos;s Talk</Button>
            <div className="flex gap-2">
              <Button href={whatsappUrl()} variant="whatsapp" className="flex-1" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "mobile_menu" }}>WhatsApp</Button>
              <ThemeToggle className="h-11 w-11" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
