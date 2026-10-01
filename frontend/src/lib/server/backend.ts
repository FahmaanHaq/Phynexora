import "server-only";

/**
 * Server-only bridge to the ASP.NET Core API.
 * API_BASE_URL and BACKEND_API_KEY are server environment variables and are
 * never bundled into client code.
 */
export const backendConfigured = Boolean(process.env.API_BASE_URL);

export async function backendFetch(path: string, init: RequestInit & { clientIp?: string } = {}) {
  const base = (process.env.API_BASE_URL || "").replace(/\/$/, "");
  if (!base) throw new Error("API_BASE_URL is not configured");
  const { clientIp, headers, ...rest } = init;
  const h = new Headers(headers);
  if (process.env.BACKEND_API_KEY) h.set("X-Api-Key", process.env.BACKEND_API_KEY);
  if (clientIp) h.set("X-Forwarded-For", clientIp);
  return fetch(`${base}${path}`, { ...rest, headers: h, cache: "no-store", signal: AbortSignal.timeout(15000) });
}

import type { Testimonial } from "@/lib/types";
export type { Testimonial };

/** Approved testimonials only. Fails soft (empty list) so pages always render. */
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  if (!backendConfigured) return [];
  try {
    const base = process.env.API_BASE_URL!.replace(/\/$/, "");
    const res = await fetch(`${base}/api/testimonials`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = (await res.json()) as Testimonial[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
