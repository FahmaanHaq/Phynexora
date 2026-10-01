import { z } from "zod";
import { serviceOptions } from "@/content/services";

/**
 * Shared validation schemas — used by client forms AND by the Next.js route
 * handlers (server-side). The ASP.NET Core API validates again independently.
 */

const clean = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    // strip control characters and angle brackets to prevent markup injection
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[<>]/g, ""));

const optionalText = (max: number) => clean(max).optional().or(z.literal(""));

export const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

export const budgetOptions = ["Not sure yet", "Under USD 1,000", "USD 1,000 – 5,000", "USD 5,000 – 15,000", "USD 15,000 – 50,000", "Above USD 50,000"] as const;
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3 – 6 months", "Flexible / not decided"] as const;
export const industryOptions = [
  "Retail", "Agriculture", "Manufacturing", "Restaurants & Hospitality", "Education", "Healthcare", "Logistics",
  "E-commerce", "Professional Services", "Recruitment", "Finance", "Other",
] as const;

export const ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;
export const ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/png",
  "image/jpeg",
  "text/plain",
];
export const ATTACHMENT_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.pptx,.png,.jpg,.jpeg,.txt";

export const enquirySchema = z.object({
  fullName: clean(100).pipe(z.string().min(2, "Please enter your full name.")),
  companyName: optionalText(150),
  email: z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address.")).pipe(z.string().max(200)),
  whatsapp: z.string().trim().regex(phoneRegex, "Please enter a valid phone number, including country code.").optional().or(z.literal("")),
  country: optionalText(80),
  industry: optionalText(80),
  service: z.enum(serviceOptions, { error: "Please choose the service you need." }),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  description: clean(4000).pipe(z.string().min(20, "Please describe your project in a little more detail (at least 20 characters).")),
  consent: z.literal(true, { error: "Please agree to be contacted about your enquiry." }),
  /** Honeypot – must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds the form was open – bots submit instantly. */
  elapsedMs: z.coerce.number().optional(),
  turnstileToken: z.string().optional(),
});
export type EnquiryInput = z.input<typeof enquirySchema>;

export const feedbackSchema = z.object({
  name: clean(100).pipe(z.string().min(2, "Please enter your name.")),
  company: optionalText(150),
  role: optionalText(100),
  rating: z.coerce.number().int().min(1, "Please choose a rating.").max(5),
  feedback: clean(2000).pipe(z.string().min(20, "Please share a little more (at least 20 characters).")),
  consentToPublish: z.boolean().optional(),
  website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.coerce.number().optional(),
  turnstileToken: z.string().optional(),
});
export type FeedbackInput = z.input<typeof feedbackSchema>;

export const chatLeadSchema = z.object({
  intent: clean(100),
  name: clean(100).pipe(z.string().min(2)),
  company: optionalText(150),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  whatsapp: z.string().trim().regex(phoneRegex).optional().or(z.literal("")),
  service: clean(100),
  description: clean(3000).pipe(z.string().min(5)),
  transcript: z.array(z.object({ role: z.enum(["bot", "user"]), text: clean(3000) })).max(60).optional(),
});
export type ChatLeadInput = z.input<typeof chatLeadSchema>;

export const chatMessageSchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: clean(2000).pipe(z.string().min(1)) }))
    .min(1)
    .max(30),
});

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
