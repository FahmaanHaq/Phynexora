/**
 * Guided chatbot flow — a small, pure state machine.
 * It has no UI or network code, so it can be unit-tested and later combined
 * with (or replaced by) an AI provider without touching the widget.
 */
import { phoneRegex } from "@/lib/validation";

export type Step = "intent" | "name" | "company" | "email" | "whatsapp" | "description" | "review" | "done";

export type Lead = {
  intent: string;
  service: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  description: string;
};

export type QuickReply = { label: string; value: string };

export type BotMessage = { text: string; replies?: QuickReply[] };

export type FlowState = { step: Step; lead: Partial<Lead>; initialNote?: string };

export type Input = { kind: "option" | "text"; value: string };

export type Advance = { state: FlowState; messages: BotMessage[]; error?: string; submit?: boolean };

export const intents: { value: string; label: string; service: string; reply: string; descriptionPrompt?: string }[] = [
  { value: "erp", label: "I need an ERP", service: "ERP System", reply: "Great. We build ERP systems around how your business actually runs — operations, HR and payroll, inventory, finance and reporting." },
  { value: "pos", label: "I need a POS", service: "POS System", reply: "We can help with that. Our POS systems cover sales, inventory, customers, payments and reporting, and can connect to your accounts." },
  { value: "website", label: "I need a website", service: "Business Website", reply: "We build fast, professional business websites designed to turn visitors into enquiries — with an admin panel if you need one." },
  { value: "mobile", label: "I need a mobile app", service: "Mobile Application", reply: "We build mobile apps for customers and teams, connected to the systems you already use." },
  { value: "custom", label: "I need custom software", service: "Custom Software", reply: "Custom software is what we do best — built around requirements that off-the-shelf products can't handle." },
  { value: "idea", label: "I have a business idea", service: "Not sure yet", reply: "We'd love to hear it. We can help shape an idea into clear requirements and a sensible first version.", descriptionPrompt: "Tell us a little about your idea. What problem does it solve, and who is it for?" },
  { value: "integration", label: "I need system integration", service: "API & System Integration", reply: "We connect ERP, POS, accounting, e-commerce and third-party platforms so data is entered once and stays consistent.", descriptionPrompt: "Which systems would you like to connect, and what should flow between them?" },
  { value: "support", label: "I need technical support", service: "Maintenance & Support", reply: "We can help. We support and maintain existing systems, including ones we didn't originally build.", descriptionPrompt: "Which system do you need help with, and what's happening?" },
];

const keywordMap: [RegExp, string][] = [
  [/\berp\b|payroll|hr\b|attendance|inventory management/i, "erp"],
  [/\bpos\b|point of sale|billing|cashier|retail/i, "pos"],
  [/web ?site|landing page|e-?commerce|online store|web ?app/i, "website"],
  [/mobile|android|ios|\bapp\b/i, "mobile"],
  [/integrat|api\b|connect/i, "integration"],
  [/support|bug|issue|error|maintenance|fix/i, "support"],
  [/idea|startup|concept/i, "idea"],
  [/custom|software|system/i, "custom"],
];

const skip: QuickReply[] = [{ label: "Skip", value: "__skip" }];

export const welcome: BotMessage[] = [
  { text: "Hi 👋 Welcome to Phynexora." },
  { text: "How can we help you today?", replies: intents.map((i) => ({ label: i.label, value: i.value })) },
];

export function initialState(): FlowState {
  return { step: "intent", lead: {} };
}

export function detectIntent(text: string) {
  for (const [re, key] of keywordMap) if (re.test(text)) return key;
  return null;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function advance(state: FlowState, input: Input): Advance {
  const value = input.value.trim();
  const isSkip = input.kind === "option" && value === "__skip";

  switch (state.step) {
    case "intent": {
      const key = input.kind === "option" ? value : detectIntent(value) ?? "idea";
      const intent = intents.find((i) => i.value === key) ?? intents.find((i) => i.value === "idea")!;
      const note = input.kind === "text" ? value : undefined;
      return {
        state: { step: "name", lead: { intent: intent.label, service: intent.service }, initialNote: note },
        messages: [{ text: intent.reply }, { text: "I'll take a few quick details so the right person can follow up. What's your name?" }],
      };
    }
    case "name": {
      if (value.length < 2) return { state, messages: [], error: "Please enter your name." };
      const name = value.slice(0, 100);
      return {
        state: { ...state, step: "company", lead: { ...state.lead, name } },
        messages: [{ text: `Nice to meet you, ${name.split(" ")[0]}. Which company or organisation are you with?`, replies: skip }],
      };
    }
    case "company": {
      return {
        state: { ...state, step: "email", lead: { ...state.lead, company: isSkip ? "" : value.slice(0, 150) } },
        messages: [{ text: "What's the best email address to reach you?" }],
      };
    }
    case "email": {
      if (!emailRe.test(value)) return { state, messages: [], error: "That doesn't look like a valid email address." };
      return {
        state: { ...state, step: "whatsapp", lead: { ...state.lead, email: value.toLowerCase() } },
        messages: [{ text: "And your WhatsApp number, including the country code? This is optional.", replies: skip }],
      };
    }
    case "whatsapp": {
      if (!isSkip && !phoneRegex.test(value)) return { state, messages: [], error: "Please enter a valid number with country code, e.g. +94 77 123 4567." };
      const intent = intents.find((i) => i.label === state.lead.intent);
      const prompt = intent?.descriptionPrompt ?? "Briefly, what would you like to build or improve?";
      const replies = state.initialNote ? [{ label: "Use what I wrote earlier", value: "__note" }] : undefined;
      return {
        state: { ...state, step: "description", lead: { ...state.lead, whatsapp: isSkip ? "" : value } },
        messages: [{ text: prompt, replies }],
      };
    }
    case "description": {
      const text = input.kind === "option" && value === "__note" ? state.initialNote ?? "" : value;
      if (text.length < 5) return { state, messages: [], error: "Please add a little more detail." };
      const lead = { ...state.lead, description: text.slice(0, 3000) };
      return {
        state: { ...state, step: "review", lead },
        messages: [{ text: "Thanks — sending your details to our team now…" }],
        submit: true,
      };
    }
    default:
      return { state, messages: [] };
  }
}

export function summaryForWhatsApp(lead: Partial<Lead>) {
  const parts = [
    `Hi Phynexora, I'm ${lead.name ?? ""}${lead.company ? ` from ${lead.company}` : ""}.`,
    lead.service && lead.service !== "Not sure yet" ? `I'm interested in: ${lead.service}.` : "I'd like to discuss a project.",
    lead.description ? `Details: ${lead.description.slice(0, 500)}` : "",
  ];
  return parts.filter(Boolean).join("\n");
}

export const inputHint: Partial<Record<Step, { placeholder: string; type: "text" | "email" | "tel"; autoComplete?: string }>> = {
  intent: { placeholder: "Or type your question…", type: "text" },
  name: { placeholder: "Your name", type: "text", autoComplete: "name" },
  company: { placeholder: "Company name", type: "text", autoComplete: "organization" },
  email: { placeholder: "you@company.com", type: "email", autoComplete: "email" },
  whatsapp: { placeholder: "+94 77 123 4567", type: "tel", autoComplete: "tel" },
  description: { placeholder: "Describe your project…", type: "text" },
};
