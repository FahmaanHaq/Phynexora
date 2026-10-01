"use client";

import Link from "next/link";
import { MessageSquareText, Phone, ArrowRight } from "lucide-react";
import { useChat } from "./ChatContext";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Sticky bottom contact bar for phones. */
export function MobileActionBar() {
  const { open, isOpen } = useChat();
  const phone = siteConfig.contact.phone;
  const item = "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-medium text-muted transition-colors active:bg-surface-2";

  return (
    <nav
      aria-label="Quick contact"
      className={cn(
        "glass fixed inset-x-3 bottom-3 z-[60] flex items-center gap-1 rounded-2xl p-1.5 shadow-[0_20px_40px_-15px_rgb(var(--shadow-color)/0.7)] transition-all md:hidden",
        "mb-[env(safe-area-inset-bottom)]",
        isOpen && "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "mobile_bar" })} className={item}>
        <WhatsAppIcon className="h-5 w-5 text-[#1fa855]" />
        WhatsApp
      </a>
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`} onClick={() => track("phone_click", { location: "mobile_bar" })} className={item}>
          <Phone className="h-5 w-5 text-primary-text" aria-hidden="true" />
          Call
        </a>
      )}
      <button type="button" onClick={() => open("mobile_bar")} className={item}>
        <MessageSquareText className="h-5 w-5 text-primary-text" aria-hidden="true" />
        Chat
      </button>
      <Link
        href="/contact#enquiry"
        onClick={() => track("quote_request", { location: "mobile_bar" })}
        className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] py-3 text-[13px] font-semibold text-white"
      >
        Get a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}
