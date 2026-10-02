import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactFormFromQuery } from "@/components/forms/ContactFormFromQuery";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { OpenChatButton } from "@/components/widgets/OpenChatButton";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Have an idea? Let's talk. Send a project enquiry or chat with Phynexora on WhatsApp about your ERP, POS, website, app or custom software project.",
  path: "/contact",
});

function Channel({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-line bg-surface/60 p-5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary-text" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-subtle">{label}</p>
        <div className="mt-1 break-words text-[0.95rem] font-medium text-fg">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { email, phone, location, workingHours, whatsappDisplay } = siteConfig.contact;
  const pending = <span className="font-normal text-subtle">To be announced</span>;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Have an Idea? <span className="text-gradient">Let&apos;s Talk.</span></>}
        description="Tell us what you're trying to build, improve or automate. Send an enquiry, message us on WhatsApp or chat with our assistant — whichever suits you."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="pb-20 sm:pb-28" aria-label="Contact options and enquiry form">
        <div className="container-x grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <ul className="space-y-3">
              <Channel icon={<WhatsAppIcon className="h-5 w-5 text-[#1fa855]" />} label="WhatsApp">
                <TrackedLink href={whatsappUrl()} event="whatsapp_click" eventProps={{ location: "contact_page" }} className="hover:text-primary-text">{whatsappDisplay}</TrackedLink>
              </Channel>
              <Channel icon={<Mail className="h-5 w-5" />} label="Email">
                {email ? <TrackedLink href={`mailto:${email}`} event="email_click" eventProps={{ location: "contact_page" }} className="hover:text-primary-text">{email}</TrackedLink> : pending}
              </Channel>
              <Channel icon={<Phone className="h-5 w-5" />} label="Phone">
                {phone ? <TrackedLink href={`tel:${phone.replace(/\s/g, "")}`} event="phone_click" eventProps={{ location: "contact_page" }} className="hover:text-primary-text">{siteConfig.contact.phoneDisplay}</TrackedLink> : <span className="font-normal text-muted">Call us via WhatsApp</span>}
              </Channel>
              <Channel icon={<MapPin className="h-5 w-5" />} label="Location">{location || pending}</Channel>
              <Channel icon={<Clock className="h-5 w-5" />} label="Working hours">{workingHours || pending}</Channel>
            </ul>
            <div className="rounded-2xl border border-line bg-surface/60 p-5">
              <p className="text-sm font-medium text-fg">Prefer a quick chat?</p>
              <p className="mt-1 text-sm text-muted">Our assistant can collect your requirements in under two minutes.</p>
              <div className="mt-4"><OpenChatButton source="contact_page" /></div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-fg">Follow Phynexora</p>
              <SocialLinks />
            </div>
          </aside>

          <div id="enquiry" className="surface-card scroll-mt-28 p-6 sm:p-10">
            <h2 className="text-2xl font-semibold text-fg sm:text-3xl">Let&apos;s Build Something Useful.</h2>
            <p className="mt-2 text-muted">Share a few details and our team will review your requirements.</p>
            <div className="relative mt-8">
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromQuery />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section id="feedback" className="section-y scroll-mt-24 bg-elevated" aria-labelledby="feedback-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <div>
            <p className="eyebrow">Feedback</p>
            <h2 id="feedback-title" className="mt-4 text-3xl font-semibold text-fg">Worked with us? Tell us how it went.</h2>
            <p className="mt-4 text-muted">Your feedback helps us improve. Every submission is reviewed by our team before anything is published on the website.</p>
          </div>
          <div className="surface-card relative p-6 sm:p-10">
            <FeedbackForm />
          </div>
        </div>
      </section>
    </>
  );
}
