"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { feedbackSchema } from "@/lib/validation";
import { api } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/client";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Field, inputClass, describedBy } from "./Field";
import { FormAlert } from "./FormAlert";
import { Turnstile, turnstileEnabled } from "./Turnstile";
import { cn } from "@/lib/cn";

type In = z.input<typeof feedbackSchema>;
type Out = z.output<typeof feedbackSchema>;

const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export function FeedbackForm({ onDone }: { onDone?: () => void }) {
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const [hover, setHover] = useState(0);
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);
  const onToken = useCallback((t: string) => setToken(t), []);

  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<In, unknown, Out>({
    resolver: zodResolver(feedbackSchema),
    mode: "onTouched",
    defaultValues: { rating: 0, consentToPublish: true, website: "" },
  });

  const onSubmit = async (data: Out) => {
    setFormError("");
    if (turnstileEnabled() && !token) return setFormError("Please complete the verification check.");
    try {
      await api.submitFeedback({ ...data, elapsedMs: Date.now() - openedAt.current, turnstileToken: token });
      track("feedback_submit", { rating: data.rating });
      setDone(true);
    } catch (e) {
      if (e instanceof ApiError) {
        Object.entries(e.fieldErrors).forEach(([k, msg]) => setError(k as keyof In, { message: msg }));
        setFormError(e.message);
      } else setFormError("Something went wrong. Please try again.");
    }
  };

  if (done) {
    return (
      <div className="flex animate-scale-in flex-col items-center py-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold text-fg">Thank you for your feedback</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">We review all feedback before anything is published on our website.</p>
        {onDone && <Button variant="secondary" className="mt-6" onClick={onDone}>Close</Button>}
      </div>
    );
  }

  const err = (k: keyof In) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="space-y-5">
      {formError && <FormAlert message={formError} showWhatsApp={false} />}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="fb-website">Website</label>
        <input id="fb-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fb-name" label="Name" required error={err("name")}>
          <input id="fb-name" autoComplete="name" className={inputClass(!!err("name"))} aria-invalid={!!err("name")} aria-describedby={describedBy("fb-name", err("name"))} {...register("name")} />
        </Field>
        <Field id="fb-company" label="Company" error={err("company")}>
          <input id="fb-company" autoComplete="organization" className={inputClass(!!err("company"))} {...register("company")} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-fg">Rating <span className="text-primary-text" aria-hidden="true">*</span></legend>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => {
            const value = Number(field.value) || 0;
            return (
              <div className="flex items-center gap-3" onMouseLeave={() => setHover(0)}>
                <div className="flex gap-1" role="radiogroup" aria-label="Rating out of 5">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const lit = (hover || value) >= n;
                    return (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={value === n}
                        aria-label={`${n} star${n > 1 ? "s" : ""} — ${labels[n]}`}
                        onClick={() => field.onChange(n)}
                        onMouseEnter={() => setHover(n)}
                        className="rounded-lg p-1 transition-transform hover:scale-110"
                      >
                        <Star className={cn("h-7 w-7 transition-colors", lit ? "fill-amber-400 text-amber-400" : "text-line-strong")} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm text-muted" aria-live="polite">{labels[hover || value]}</span>
              </div>
            );
          }}
        />
        {err("rating") && <p role="alert" className="mt-1.5 text-sm text-red-500">{err("rating")}</p>}
      </fieldset>

      <Field id="fb-feedback" label="Feedback" required error={err("feedback")}>
        <textarea id="fb-feedback" rows={5} className={inputClass(!!err("feedback"))} aria-invalid={!!err("feedback")} aria-describedby={describedBy("fb-feedback", err("feedback"))} {...register("feedback")} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]" {...register("consentToPublish")} />
        You may publish my feedback (with my name and company) on the Phynexora website after review.
      </label>

      <Turnstile onToken={onToken} />

      <Button type="submit" disabled={isSubmitting} icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting…" : "Submit Feedback"}
      </Button>
      <p className="text-xs text-subtle">Feedback is reviewed by our team before it appears publicly.</p>
    </form>
  );
}
