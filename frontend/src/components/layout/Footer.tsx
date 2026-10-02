import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/lib/whatsapp";

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { email, phone } = siteConfig.contact;
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-elevated">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--primary-text)] to-transparent opacity-40" />
      <div className="container-x pb-28 pt-16 md:pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 text-lg font-medium text-fg">{siteConfig.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.shortDescription}</p>
            <SocialLinks className="mt-6" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <Column title="Company" links={footerNav.company} />
            <Column title="Services" links={footerNav.services} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-fg">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <TrackedLink href={whatsappUrl()} event="whatsapp_click" eventProps={{ location: "footer" }} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg">
                    <WhatsAppIcon className="h-4 w-4 text-[#1fa855]" /> {siteConfig.contact.whatsappDisplay}
                  </TrackedLink>
                </li>
                <li>
                  {email ? (
                    <TrackedLink href={`mailto:${email}`} event="email_click" eventProps={{ location: "footer" }} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg">
                      <Mail className="h-4 w-4 text-primary-text" aria-hidden="true" /> {email}
                    </TrackedLink>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 text-subtle"><Mail className="h-4 w-4" aria-hidden="true" /> Email — coming soon</span>
                  )}
                </li>
                {phone && (
                <li>
                  {(
                    <TrackedLink href={`tel:${phone.replace(/\s/g, "")}`} event="phone_click" eventProps={{ location: "footer" }} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg">
                      <Phone className="h-4 w-4 text-primary-text" aria-hidden="true" /> {siteConfig.contact.phoneDisplay}
                    </TrackedLink>
                  )}
                </li>
                )}
                {siteConfig.contact.location && (
                  <li className="inline-flex items-center gap-2.5 text-muted"><MapPin className="h-4 w-4 text-primary-text" aria-hidden="true" /> {siteConfig.contact.location}</li>
                )}
                {siteConfig.contact.workingHours && (
                  <li className="flex items-center gap-2.5 text-muted"><Clock className="h-4 w-4 text-primary-text" aria-hidden="true" /> {siteConfig.contact.workingHours}</li>
                )}
              </ul>
              <Link href="/contact#enquiry" className="mt-4 inline-flex py-2.5 text-sm font-medium text-primary-text hover:underline">Start a project →</Link>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="mt-16 select-none overflow-hidden">
          <p className="bg-gradient-to-b from-[color-mix(in_srgb,var(--fg)_9%,transparent)] to-transparent bg-clip-text text-center text-[14vw] font-semibold leading-none tracking-[0.04em] text-transparent lg:text-[156px]">
            PHYNEXORA
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center">
          <p>© {siteConfig.foundingYear} Phynexora. All rights reserved.</p>
          <ul className="flex gap-5">
            {footerNav.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="transition-colors hover:text-fg">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
