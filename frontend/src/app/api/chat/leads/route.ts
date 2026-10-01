import { chatLeadSchema, fieldErrors } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { errors, forward } from "@/lib/server/respond";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000)) return errors.rateLimited();

  const body = await req.json().catch(() => null);
  const parsed = chatLeadSchema.safeParse(body);
  if (!parsed.success) return errors.validation(fieldErrors(parsed.error));

  return forward("/api/chat/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), clientIp: ip }, "chat lead");
}
