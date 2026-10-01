import { chatMessageSchema, fieldErrors } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { errors, json } from "@/lib/server/respond";
import { backendConfigured, backendFetch } from "@/lib/server/backend";

/**
 * AI chat proxy. The AI provider and its API key live ONLY in the backend.
 * If the backend / AI is not configured, returns 503 and the widget falls
 * back to the guided flow.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`chat:${ip}`, 20, 5 * 60 * 1000)) return errors.rateLimited();
  if (!backendConfigured) return errors.unavailable();

  const body = await req.json().catch(() => null);
  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) return errors.validation(fieldErrors(parsed.error));

  try {
    const res = await backendFetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      clientIp: ip,
    });
    if (res.status === 429) return errors.rateLimited();
    if (!res.ok) return errors.unavailable();
    const data = (await res.json()) as { reply?: string };
    if (!data.reply) return errors.unavailable();
    return json({ reply: data.reply });
  } catch {
    return errors.unavailable();
  }
}
