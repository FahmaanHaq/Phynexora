"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageSquareText, Phone, Plus, Bot } from "lucide-react";
import { useChat } from "./ChatContext";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Desktop/tablet floating actions (bottom-right):
 *  - WhatsApp button with a subtle attention ring
 *  - Contact menu: WhatsApp · Call · Email · Chat
 * On small screens the MobileActionBar is used instead.
 */
export function FloatingDock() {
  const { isOpen: chatOpen, open: openChat, close: closeChat } = useChat();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { phone, email } = siteConfig.contact;

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const actions = [
    { label: "WhatsApp", icon: <WhatsAppIcon className="h-4 w-4" />, href: whatsappUrl(), event: "whatsapp_click" as const, tone: "text-[#1fa855]" },
    ...(phone ? [{ label: "Call", icon: <Phone className="h-4 w-4" />, href: `tel:${phone.replace(/\s/g, "")}`, event: "phone_click" as const, tone: "text-primary-text" }] : []),
    ...(email ? [{ label: "Email", icon: <Mail className="h-4 w-4" />, href: `mailto:${email}`, event: "email_click" as const, tone: "text-primary-text" }] : []),
  ];

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[65] hidden flex-col items-end gap-3 md:flex">
      {/* Contact menu */}
      <div
        id="contact-menu"
        className={cn(
          "glass w-56 origin-bottom-right rounded-2xl p-2 shadow-[0_30px_60px_-20px_rgb(var(--shadow-color)/0.6)] transition-all duration-200",
          menuOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <p className="px-3 pb-1.5 pt-2 text-xs font-medium text-subtle">Get in touch</p>
        <ul>
          {actions.map((a) => (
            <li key={a.label}>
              <a
                href={a.href}
                {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { track(a.event, { location: "floating_menu" }); setMenuOpen(false); }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg transition-colors hover:bg-surface-2"
              >
                <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface", a.tone)}>{a.icon}</span>
                {a.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => { setMenuOpen(false); openChat("floating_menu"); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg transition-colors hover:bg-surface-2"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-primary-text"><Bot className="h-4 w-4" aria-hidden="true" /></span>
              Chat with us
            </button>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "floating_button" })}
          aria-label="Chat with Phynexora on WhatsApp (opens in a new tab)"
          className={cn("relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#128c4b] text-white shadow-[0_14px_30px_-10px_rgba(18,140,75,0.8)] transition-all hover:-translate-y-0.5", chatOpen && "pointer-events-none scale-90 opacity-0")}
        >
          <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#1fa855]" />
          <WhatsAppIcon className="relative h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={() => (chatOpen ? closeChat() : setMenuOpen((v) => !v))}
          aria-expanded={chatOpen || menuOpen}
          aria-controls="contact-menu"
          aria-label={chatOpen ? "Close chat" : menuOpen ? "Close contact menu" : "Open contact options"}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,var(--primary),var(--primary-2))] text-on-primary shadow-[0_18px_40px_-12px_rgb(var(--glow)/0.9)] transition-all hover:-translate-y-0.5"
        >
          {chatOpen || menuOpen ? (
            <Plus className="h-6 w-6 rotate-45 transition-transform" aria-hidden="true" />
          ) : (
            <MessageSquareText className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
