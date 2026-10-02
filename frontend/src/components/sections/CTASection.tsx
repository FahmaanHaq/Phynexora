import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

type Props = { title?: string; text?: string; whatsappMessage?: string; location?: string };

export function CTASection({
  title = "Have a Problem We Can Solve?",
  text = "Tell us what you're trying to build, improve or automate. We'll help you find the right digital solution.",
  whatsappMessage = whatsappMessages.project,
  location = "final_cta",
}: Props) {
  return (
    <section aria-labelledby={`${location}-title`} className="py-20 sm:py-28">
      <div className="container-x">
        <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#020507] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,200,240,0.40),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(201,214,222,0.16),transparent_55%),radial-gradient(ellipse_at_60%_40%,rgba(0,225,250,0.14),transparent_50%)]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path d="M-20 320 C150 260 250 120 400 160 S650 60 820 90" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" strokeDasharray="3 9" className="animate-dash" />
            <path d="M-20 360 C180 330 300 230 450 250 S700 170 820 200" fill="none" stroke="rgba(34,211,238,.35)" strokeWidth="1" strokeDasharray="2 12" className="animate-dash" />
            <circle cx="400" cy="160" r="3" fill="#fff" fillOpacity=".8" />
            <circle cx="650" cy="98" r="2.5" fill="#22d3ee" />
            <circle cx="180" cy="290" r="2" fill="#fff" fillOpacity=".6" />
          </svg>
          <h2 id={`${location}-title`} className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact#enquiry" size="lg" variant="inverse" iconRight={<ArrowRight />} trackEvent="cta_click" trackProps={{ location, cta: "start_project" }}>Start a Project</Button>
            <Button href={whatsappUrl(whatsappMessage)} size="lg" variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location }}>Chat on WhatsApp</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
