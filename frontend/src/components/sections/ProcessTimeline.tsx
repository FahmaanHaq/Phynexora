"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { processSteps } from "@/content/company";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Interactive 7-step timeline: tabs on desktop, vertical timeline on mobile. */
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = processSteps[active];
  const progress = (active / (processSteps.length - 1)) * 100;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % processSteps.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + processSteps.length) % processSteps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = processSteps.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative">
          <div aria-hidden="true" className="absolute left-[7%] right-[7%] top-6 h-px bg-line" />
          <div aria-hidden="true" className="absolute left-[7%] top-6 h-px bg-[linear-gradient(90deg,var(--primary-text),var(--cyan))] transition-all duration-500" style={{ width: `${progress * 0.86}%` }} />
          <div role="tablist" aria-label="Our process" className="relative grid grid-cols-7">
            {processSteps.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button
                  key={s.number}
                  ref={(el) => { tabs.current[i] = el; }}
                  role="tab"
                  id={`process-tab-${i}`}
                  aria-selected={on}
                  aria-controls="process-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={onKey}
                  className="group flex flex-col items-center text-center focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-sm transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[var(--primary-text)]",
                      on && "scale-110 border-transparent bg-[linear-gradient(135deg,var(--primary),var(--primary-2))] text-white shadow-[0_12px_30px_-10px_rgb(var(--glow)/0.9)]",
                      done && "border-[color-mix(in_srgb,var(--primary-text)_50%,transparent)] bg-surface text-primary-text",
                      !on && !done && "border-line bg-surface text-subtle group-hover:border-line-strong",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon name={s.icon} className="h-5 w-5" />}
                  </span>
                  <span className="mt-4 font-mono text-xs text-subtle">{s.number}</span>
                  <span className={cn("mt-1 text-base font-semibold transition-colors", on ? "text-fg" : "text-muted")}>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} className="surface-card mx-auto mt-12 grid max-w-4xl grid-cols-[1.2fr_1fr] gap-10 p-10">
          <div key={step.number} className="animate-fade-up">
            <p className="font-mono text-sm text-primary-text">Step {step.number}</p>
            <h3 className="mt-2 text-3xl font-semibold text-fg">{step.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{step.text}</p>
          </div>
          <div key={`${step.number}-o`} className="animate-fade-up border-l border-line pl-10 [animation-delay:80ms]">
            <p className="text-xs font-medium uppercase tracking-wider text-subtle">What happens</p>
            <ul className="mt-4 space-y-3">
              {step.outputs.map((o) => (
                <li key={o} className="flex items-center gap-3 text-sm text-fg">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <ol className="relative space-y-4 lg:hidden">
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-[linear-gradient(to_bottom,var(--primary-text),var(--cyan),transparent)]" />
        {processSteps.map((s, i) => (
          <li key={s.number} data-reveal style={{ ["--reveal-delay" as string]: `${i * 40}ms` }} className="relative flex gap-5">
            <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-primary-text">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div className="surface-card flex-1 p-5">
              <p className="font-mono text-xs text-primary-text">{s.number}</p>
              <h3 className="mt-1 text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
