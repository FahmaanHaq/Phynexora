import { enquirySchema, fieldErrors, ATTACHMENT_MAX_BYTES, ATTACHMENT_TYPES } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import { errors, forward, json } from "@/lib/server/respond";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`enquiry:${ip}`, 5, 10 * 60 * 1000)) return errors.rateLimited();

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return errors.validation({ form: "Invalid form submission." });
  }

  const raw = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;
  const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent === "true" });
  if (!parsed.success) return errors.validation(fieldErrors(parsed.error));

  // Spam traps: honeypot filled or submitted unrealistically fast → pretend success, drop silently.
  if (parsed.data.website || (parsed.data.elapsedMs !== undefined && parsed.data.elapsedMs < 2500)) {
    return json({ ok: true });
  }

  const file = form.get("attachment");
  const outbound = new FormData();
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v === undefined || v === "" || k === "website" || k === "elapsedMs") continue;
    outbound.append(k, String(v));
  }
  if (file instanceof File && file.size > 0) {
    if (file.size > ATTACHMENT_MAX_BYTES) return errors.validation({ attachment: "The file must be 10 MB or smaller." });
    if (!ATTACHMENT_TYPES.includes(file.type)) return errors.validation({ attachment: "Please upload a PDF, Word, Excel, PowerPoint, image or text file." });
    outbound.append("attachment", file, file.name.replace(/[^\w.\- ]/g, "_").slice(0, 120));
  }

  return forward("/api/enquiries", { method: "POST", body: outbound, clientIp: ip }, "enquiry");
}
