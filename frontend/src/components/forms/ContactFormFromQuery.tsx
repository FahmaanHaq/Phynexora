"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/** Pre-selects the service from ?service=… (used by service-page CTAs). */
export function ContactFormFromQuery() {
  const params = useSearchParams();
  const service = params.get("service") ?? undefined;
  return <ContactForm key={service ?? "none"} defaultService={service} />;
}
