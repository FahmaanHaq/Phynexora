"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function Accordion({ items, defaultOpen = 0 }: { items: { question: string; answer: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-surface/50">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b-${i}`;
        const panel = `${base}-p-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-medium text-fg transition-colors hover:text-primary-text sm:px-7 sm:py-6 sm:text-lg"
              >
                {item.question}
                <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-transparent bg-primary text-white" : "border-line text-muted")} aria-hidden="true">
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="accordion-panel" data-open={isOpen} inert={!isOpen}>
              <div>
                <p className="px-5 pb-6 pr-14 text-[0.975rem] leading-relaxed text-muted sm:px-7 sm:pr-20">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
