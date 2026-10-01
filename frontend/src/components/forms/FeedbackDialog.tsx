"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FeedbackForm } from "./FeedbackForm";

export function FeedbackDialog({ label = "Share your feedback", variant = "secondary" as "primary" | "secondary" }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => setKey((k) => k + 1);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className={buttonClasses(variant, "md")}>
        <MessageSquarePlus className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
        <span>{label}</span>
      </button>
      <dialog
        ref={ref}
        aria-labelledby="feedback-dialog-title"
        className="m-auto w-[min(640px,calc(100vw-1.5rem))] rounded-3xl border border-line bg-elevated p-0 text-fg shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-scale-in"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
      >
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id="feedback-dialog-title" className="text-2xl font-semibold">Share your feedback</h2>
              <p className="mt-1 text-sm text-muted">Worked with Phynexora? We&apos;d value hearing about your experience.</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="rounded-lg p-2 text-subtle hover:bg-surface-2 hover:text-fg">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <FeedbackForm key={key} onDone={() => ref.current?.close()} />
        </div>
      </dialog>
    </>
  );
}
