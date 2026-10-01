import { feedbackSchema, fieldErrors } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { errors, forward, json } from "@/lib/server/respond";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`feedback:${ip}`, 3, 10 * 60 * 1000)) return errors.rateLimited();

  const body = await req.json().catch(() => null);
  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) return errors.validation(fieldErrors(parsed.error));
  if (parsed.data.website || (parsed.data.elapsedMs !== undefined && parsed.data.elapsedMs < 2000)) return json({ ok: true });

  const { website: _w, elapsedMs: _e, ...payload } = parsed.data;
  void _w; void _e;
  // Feedback is always stored as "Pending" by the backend and only shown after approval.
  return forward("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), clientIp: ip }, "feedback");
}
