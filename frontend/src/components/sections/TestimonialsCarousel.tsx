"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { cn } from "@/lib/cn";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(items.length - 1, i));
    const child = el.children[n] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [items.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth || 1;
      setIndex(Math.round(el.scrollLeft / (w + 20)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      <ul ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2">
        {items.map((t, i) => (
          <li key={t.id} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous testimonial" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-all hover:-translate-y-0.5 disabled:opacity-40">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex gap-1.5">
            {items.map((t, i) => (
              <button key={t.id} type="button" onClick={() => go(i)} aria-label={`Go to testimonial ${i + 1}`} aria-current={i === index} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-primary-text" : "w-1.5 bg-line-strong")} />
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} disabled={index >= items.length - 1} aria-label="Next testimonial" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-all hover:-translate-y-0.5 disabled:opacity-40">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
