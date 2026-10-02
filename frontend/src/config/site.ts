/**
 * Single source of truth for company details and integrations.
 *
 * Every value that may change (contact details, WhatsApp number, socials,
 * analytics IDs) is read from environment variables here and ONLY here.
 * Components import `siteConfig` – never hardcode these values elsewhere.
 *
 * Empty values are treated as "not provided yet" and the UI hides or
 * gracefully degrades the related element instead of showing invented data.
 */

const env = (value: string | undefined) => (value ?? "").trim();

/** Digits only, international format without "+" (e.g. 94771234567). */
const whatsappNumber = (env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || "+94711523123").replace(/\D/g, "");

export const siteConfig = {
  name: "Phynexora",
  legalName: env(process.env.NEXT_PUBLIC_LEGAL_NAME) || "Phynexora",
  tagline: "Technology That Makes Business Easier.",
  statement: "We build digital solutions around the way you work.",
  description:
    "Phynexora builds custom ERP, POS, websites, web applications, mobile apps and digital solutions designed to make business easier.",
  shortDescription:
    "Phynexora builds practical digital solutions that help businesses simplify operations, connect systems and grow through technology.",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) || "https://www.phynexora.com").replace(/\/$/, ""),
  locale: "en",
  foundingYear: 2026,

  contact: {
    whatsapp: whatsappNumber,
    whatsappDisplay: env(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY) || "+94 71 152 3123",
    whatsappDefaultMessage: "Hi Phynexora, I would like to discuss a software project.",
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "phynexora@gmail.com",
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) || "+94711523123",
    phoneDisplay: env(process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY) || "+94 71 152 3123",
    location: env(process.env.NEXT_PUBLIC_CONTACT_LOCATION) || "Colombo, Sri Lanka",
    workingHours: env(process.env.NEXT_PUBLIC_WORKING_HOURS) || "24 Hours",
  },

  social: {
    linkedin: env(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    facebook: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    instagram: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    github: env(process.env.NEXT_PUBLIC_SOCIAL_GITHUB),
  },

  integrations: {
    turnstileSiteKey: env(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
    gaId: env(process.env.NEXT_PUBLIC_GA_ID),
    plausibleDomain: env(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    plausibleHost: env(process.env.NEXT_PUBLIC_PLAUSIBLE_HOST) || "https://plausible.io",
    /** "guided" (default, no AI) or "ai" (uses backend /api/chat/message). */
    chatMode: (env(process.env.NEXT_PUBLIC_CHAT_MODE) || "guided") as "guided" | "ai",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "ERP", href: "/services/erp" },
    { label: "POS", href: "/services/pos" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "AI & Automation", href: "/services/ai-automation" },
    { label: "Integrations", href: "/services/integrations" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
