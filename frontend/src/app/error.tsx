"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="flex min-h-[75vh] items-center pt-24">
      <div className="container-x text-center">
        <p className="font-mono text-sm text-primary-text">Something went wrong</p>
        <h1 className="mx-auto mt-3 max-w-xl text-4xl font-semibold text-fg">We hit an unexpected problem.</h1>
        <p className="mt-4 text-muted">Please try again. If it keeps happening, contact us on WhatsApp.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset} icon={<RotateCcw />}>Try again</Button>
          <Button href="/" variant="secondary">Back to Home</Button>
        </div>
      </div>
    </section>
  );
}
