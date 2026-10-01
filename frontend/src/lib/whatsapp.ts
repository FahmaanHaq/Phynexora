import { siteConfig } from "@/config/site";

/**
 * Builds a WhatsApp click-to-chat URL using the single configured number.
 * If no number is configured yet, wa.me opens WhatsApp and lets the user
 * pick a contact, so the link never breaks.
 */
export function whatsappUrl(message: string = siteConfig.contact.whatsappDefaultMessage) {
  const number = siteConfig.contact.whatsapp;
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const whatsappMessages = {
  general: siteConfig.contact.whatsappDefaultMessage,
  quote: "Hi Phynexora, I would like to get a quote for a software project.",
  project: "Hi Phynexora, I would like to discuss my project requirements.",
  service: (service: string) => `Hi Phynexora, I'm interested in ${service}. Could we discuss my requirements?`,
  support: "Hi Phynexora, I need technical support for an existing system.",
};
