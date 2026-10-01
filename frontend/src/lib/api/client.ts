/**
 * Browser-side API layer. Components never call fetch directly – they use
 * these functions, which talk to the Next.js route handlers under /api.
 * Those handlers validate input and forward to the ASP.NET Core backend,
 * so no backend URL, API key or secret is ever exposed to the browser.
 */

export type ApiErrorKind = "network" | "validation" | "rate_limit" | "unavailable" | "server";

export class ApiError extends Error {
  constructor(
    public kind: ApiErrorKind,
    message: string,
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

const friendly: Record<ApiErrorKind, string> = {
  network: "We couldn't reach our servers. Please check your connection and try again.",
  validation: "Please check the highlighted fields and try again.",
  rate_limit: "Too many attempts. Please wait a minute and try again.",
  unavailable: "This service is temporarily unavailable. Please contact us on WhatsApp instead.",
  server: "Something went wrong on our side. Please try again or contact us on WhatsApp.",
};

async function request<T>(path: string, init: RequestInit, timeoutMs = 20000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(path, { ...init, signal: controller.signal });
  } catch {
    throw new ApiError("network", friendly.network);
  } finally {
    clearTimeout(timer);
  }

  let body: { message?: string; errors?: Record<string, string> } & Record<string, unknown> = {};
  try {
    body = await res.json();
  } catch {
    /* empty body */
  }

  if (res.ok) return body as T;
  if (res.status === 400 || res.status === 422) throw new ApiError("validation", body.message || friendly.validation, body.errors || {});
  if (res.status === 429) throw new ApiError("rate_limit", friendly.rate_limit);
  if (res.status === 503) throw new ApiError("unavailable", body.message || friendly.unavailable);
  throw new ApiError("server", friendly.server);
}

export function postJson<T = { ok: true }>(path: string, data: unknown) {
  return request<T>(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
}

export function postForm<T = { ok: true }>(path: string, data: FormData) {
  return request<T>(path, { method: "POST", body: data }, 60000);
}
