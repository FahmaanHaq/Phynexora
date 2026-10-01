import "server-only";
import { NextResponse } from "next/server";
import { backendConfigured, backendFetch } from "./backend";

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export const errors = {
  validation: (errors: Record<string, string>) => json({ message: "Please check the highlighted fields.", errors }, 422),
  rateLimited: () => json({ message: "Too many requests." }, 429),
  unavailable: () => json({ message: "This service is temporarily unavailable. Please contact us on WhatsApp." }, 503),
  server: () => json({ message: "Something went wrong." }, 500),
};

/**
 * Forwards a validated payload to the backend.
 * Without API_BASE_URL: development returns a mock success (logged) so the
 * UI can be built and tested; production returns 503 so problems are visible.
 */
export async function forward(path: string, init: RequestInit & { clientIp?: string }, label: string) {
  if (!backendConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[api] API_BASE_URL not set – mock-accepting ${label}.`);
      return json({ ok: true, reference: `DEV-${Date.now().toString(36).toUpperCase()}`, mock: true });
    }
    return errors.unavailable();
  }
  try {
    const res = await backendFetch(path, init);
    const body = await res.json().catch(() => ({}));
    if (res.ok) return json({ ok: true, ...body });
    if (res.status === 400 || res.status === 422) return json({ message: "Please check the highlighted fields.", errors: normaliseErrors(body) }, 422);
    if (res.status === 429) return errors.rateLimited();
    console.error(`[api] backend ${label} failed`, res.status);
    return errors.server();
  } catch (e) {
    console.error(`[api] backend ${label} unreachable`, e);
    return errors.unavailable();
  }
}

/** Converts ASP.NET ValidationProblemDetails ({ errors: { Field: [msg] } }) to { field: msg }. */
function normaliseErrors(body: { errors?: Record<string, string[] | string> }) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(body?.errors || {})) {
    const key = k.charAt(0).toLowerCase() + k.slice(1);
    out[key] = Array.isArray(v) ? v[0] : v;
  }
  return out;
}
