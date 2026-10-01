import { siteConfig } from "@/config/site";

/**
 * Provider-agnostic analytics. Events are forwarded to whichever provider is
 * configured (GA4 via gtag, Plausible, or a GTM dataLayer). When none is
 * configured, calls are no-ops (and logged in development).
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "contact_form_submit"
  | "quote_request"
  | "feedback_submit"
  | "chatbot_open"
  | "chatbot_option"
  | "chatbot_lead"
  | "service_page_view"
  | "portfolio_view"
  | "case_study_view"
  | "cta_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Props }) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    const { gaId, plausibleDomain } = siteConfig.integrations;
    if (gaId && window.gtag) window.gtag("event", event, props);
    if (plausibleDomain && window.plausible) window.plausible(event, { props });
    if (window.dataLayer) window.dataLayer.push({ event, ...props });
    if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, props);
  } catch {
    /* analytics must never break the UI */
  }
}
