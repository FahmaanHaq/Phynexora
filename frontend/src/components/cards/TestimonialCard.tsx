import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="surface-card flex h-full flex-col p-7">
      <Quote className="h-7 w-7 text-primary-text/60" aria-hidden="true" />
      <div className="mt-4 flex gap-0.5" role="img" aria-label={`Rated ${t.rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={i <= t.rating ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-line-strong"} aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-fg">“{t.feedback}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--violet))] text-sm font-semibold text-white" aria-hidden="true">
          {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
        </span>
        <span>
          <span className="block text-sm font-semibold text-fg">{t.name}</span>
          {(t.role || t.company) && <span className="block text-xs text-subtle">{[t.role, t.company].filter(Boolean).join(", ")}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
