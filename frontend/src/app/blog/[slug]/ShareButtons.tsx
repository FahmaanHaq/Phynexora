"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
  ];
  const cls = "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-fg";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-subtle">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}><Icon className="h-4 w-4" /></a>
      ))}
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cls}
        onClick={async () => {
          try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
        }}
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
