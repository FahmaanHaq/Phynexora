"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2, Paperclip, Send, X, Loader2 } from "lucide-react";
import {
  enquirySchema, budgetOptions, timelineOptions, industryOptions, ATTACHMENT_ACCEPT, ATTACHMENT_MAX_BYTES, ATTACHMENT_TYPES,
} from "@/lib/validation";
import { serviceOptions } from "@/content/services";
import { api } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/client";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Field, inputClass, describedBy } from "./Field";
import { FormAlert } from "./FormAlert";
import { Turnstile, turnstileEnabled } from "./Turnstile";

type In = z.input<typeof enquirySchema>;
type Out = z.output<typeof enquirySchema>;

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [token, setToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const openedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const initialService = serviceOptions.find((s) => s === defaultService);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { service: initialService, consent: false as unknown as true, website: "" },
  });

  const onToken = useCallback((t: string) => setToken(t), []);

  const pickFile = (f: File | null) => {
    setFileError("");
    if (!f) return setFile(null);
    if (f.size > ATTACHMENT_MAX_BYTES) return setFileError("The file must be 10 MB or smaller.");
    if (f.type && !ATTACHMENT_TYPES.includes(f.type)) return setFileError("Please upload a PDF, Word, Excel, PowerPoint, image or text file.");
    setFile(f);
  };

  const onSubmit = async (data: Out) => {
    setFormError("");
    if (turnstileEnabled() && !token) {
      setFormError("Please complete the verification check before sending.");
      return;
    }
    setStatus("submitting");
    const fd = new FormData();
    Object.entries({ ...data, elapsedMs: Date.now() - openedAt.current, turnstileToken: token }).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    if (file) fd.append("attachment", file);

    try {
      await api.submitEnquiry(fd);
      track("contact_form_submit", { service: data.service });
      track("quote_request", { service: data.service, budget: data.budget || "n/a" });
      setStatus("success");
      reset();
      setFile(null);
      setTimeout(() => successRef.current?.focus(), 50);
    } catch (e) {
      setStatus("idle");
      setTurnstileReset((n) => n + 1);
      setToken("");
      if (e instanceof ApiError) {
        Object.entries(e.fieldErrors).forEach(([k, msg]) => {
          if (k === "attachment") setFileError(msg);
          else setError(k as keyof In, { message: msg });
        });
        setFormError(e.message);
      } else {
        setFormError("Something went wrong. Please try again or contact us on WhatsApp.");
      }
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="flex animate-scale-in flex-col items-center px-4 py-14 text-center focus:outline-none sm:py-20" role="status">
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500/30" />
          <CheckCircle2 className="relative h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-3xl font-semibold text-fg">Thank You!</h3>
        <p className="mt-3 max-w-md text-muted">Your enquiry has been received. Our team will review your requirements and get back to you shortly.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl()} variant="whatsapp" icon={<WhatsAppIcon />} trackEvent="whatsapp_click" trackProps={{ location: "enquiry_success" }}>Chat on WhatsApp</Button>
          <Button href="/" variant="secondary">Back to Home</Button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const err = (k: keyof In) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate aria-describedby={formError ? "enquiry-error" : undefined} className="space-y-6">
      {formError && <div id="enquiry-error"><FormAlert message={formError} /></div>}

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={err("fullName")}>
          <input id="fullName" autoComplete="name" className={inputClass(!!err("fullName"))} aria-invalid={!!err("fullName")} aria-describedby={describedBy("fullName", err("fullName"))} {...register("fullName")} />
        </Field>
        <Field id="companyName" label="Company Name" error={err("companyName")}>
          <input id="companyName" autoComplete="organization" className={inputClass(!!err("companyName"))} {...register("companyName")} />
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <input id="email" type="email" inputMode="email" autoComplete="email" className={inputClass(!!err("email"))} aria-invalid={!!err("email")} aria-describedby={describedBy("email", err("email"))} {...register("email")} />
        </Field>
        <Field id="whatsapp" label="WhatsApp Number" error={err("whatsapp")} hint="Include your country code.">
          <input id="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+94 77 123 4567" className={inputClass(!!err("whatsapp"))} aria-invalid={!!err("whatsapp")} aria-describedby={describedBy("whatsapp", err("whatsapp"), "Include your country code.")} {...register("whatsapp")} />
        </Field>
        <Field id="country" label="Country" error={err("country")}>
          <input id="country" autoComplete="country-name" className={inputClass(!!err("country"))} {...register("country")} />
        </Field>
        <Field id="industry" label="Industry" error={err("industry")}>
          <select id="industry" className={inputClass(!!err("industry"))} {...register("industry")} defaultValue="">
            <option value="">Select industry</option>
            {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="service" label="Required Service" required error={err("service")} className="sm:col-span-2">
          <select id="service" className={inputClass(!!err("service"))} aria-invalid={!!err("service")} aria-describedby={describedBy("service", err("service"))} {...register("service")} defaultValue={initialService ?? ""}>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="budget" label="Estimated Budget" error={err("budget")}>
          <select id="budget" className={inputClass(!!err("budget"))} {...register("budget")} defaultValue="">
            <option value="">Select a range</option>
            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="timeline" label="Expected Timeline" error={err("timeline")}>
          <select id="timeline" className={inputClass(!!err("timeline"))} {...register("timeline")} defaultValue="">
            <option value="">Select a timeline</option>
            {timelineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="description" label="Project Description" required error={err("description")} hint="What would you like to build, improve or automate? Who will use it?" className="sm:col-span-2">
          <textarea id="description" rows={6} className={inputClass(!!err("description"))} aria-invalid={!!err("description")} aria-describedby={describedBy("description", err("description"), "hint")} {...register("description")} />
        </Field>

        <div className="sm:col-span-2">
          <p className="mb-2 block text-sm font-medium text-fg">Attachment / Requirement Document <span className="ml-1.5 text-xs font-normal text-subtle">(optional)</span></p>
          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              <span className="flex min-w-0 items-center gap-2.5 text-sm text-fg">
                <Paperclip className="h-4 w-4 shrink-0 text-primary-text" aria-hidden="true" />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-subtle">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </span>
              <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }} aria-label="Remove attachment" className="rounded-lg p-1.5 text-subtle hover:bg-surface-2 hover:text-fg">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label htmlFor="attachment" className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line-strong bg-surface/50 px-4 py-6 text-center transition-colors hover:border-primary-text/60 hover:bg-surface focus-within:ring-2 focus-within:ring-[var(--primary-text)]">
              <Paperclip className="h-5 w-5 text-primary-text" aria-hidden="true" />
              <span className="text-sm font-medium text-fg">Click to upload a file</span>
              <span className="text-xs text-subtle">PDF, Word, Excel, PowerPoint, PNG, JPG or TXT · up to 10 MB</span>
              <input ref={fileInput} id="attachment" type="file" accept={ATTACHMENT_ACCEPT} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} aria-describedby={fileError ? "attachment-error" : undefined} />
            </label>
          )}
          {fileError && <p id="attachment-error" role="alert" className="mt-1.5 text-sm text-red-500">{fileError}</p>}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-line-strong accent-[var(--primary)]" aria-invalid={!!err("consent")} aria-describedby={err("consent") ? "consent-error" : undefined} {...register("consent")} />
          <span>
            I agree to be contacted regarding my enquiry. <span className="text-primary-text" aria-hidden="true">*</span>
            <span className="mt-0.5 block text-xs text-subtle">See our <a href="/privacy-policy" className="underline underline-offset-2 hover:text-fg">Privacy Policy</a>.</span>
          </span>
        </label>
        {err("consent") && <p id="consent-error" role="alert" className="mt-1.5 text-sm text-red-500">{err("consent")}</p>}
      </div>

      <Turnstile onToken={onToken} resetKey={turnstileReset} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} icon={submitting ? <Loader2 className="animate-spin" /> : <Send />} className="w-full sm:w-auto">
          {submitting ? "Sending…" : "Send Project Enquiry"}
        </Button>
        <p className="text-xs text-subtle">Fields marked <span className="text-primary-text">*</span> are required.</p>
      </div>
    </form>
  );
}
