import { postForm, postJson } from "./client";
import type { ChatLeadInput, FeedbackInput } from "@/lib/validation";

export const api = {
  submitEnquiry: (form: FormData) => postForm<{ ok: true; reference?: string }>("/api/enquiries", form),
  submitFeedback: (data: FeedbackInput) => postJson("/api/feedback", data),
  submitChatLead: (data: ChatLeadInput) => postJson<{ ok: true; reference?: string }>("/api/chat/leads", data),
  sendChatMessage: (messages: { role: "user" | "assistant"; content: string }[]) =>
    postJson<{ reply: string }>("/api/chat/message", { messages }),
};
