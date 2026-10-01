import { MessageSquareQuote } from "lucide-react";
import { getApprovedTestimonials } from "@/lib/server/backend";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeedbackDialog } from "@/components/forms/FeedbackDialog";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/**
 * Shows ONLY testimonials approved in the backend admin.
 * New feedback is stored as "Pending" and never appears automatically.
 */
export async function Testimonials() {
  const items = await getApprovedTestimonials();
  return (
    <section aria-labelledby="testimonials-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="testimonials-title" eyebrow="Testimonials" title="What our clients say" description="Feedback from the businesses we work with — published only after review." />
        <div className="mt-14">
          {items.length > 0 ? (
            <TestimonialsCarousel items={items} />
          ) : (
            <div data-reveal className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-line-strong bg-surface/40 px-6 py-12 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-primary-text"><MessageSquareQuote className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-semibold text-fg">Client testimonials will appear here</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">We publish feedback only after it has been reviewed and approved. If you&apos;ve worked with us, we&apos;d appreciate hearing about your experience.</p>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <FeedbackDialog />
          </div>
        </div>
      </div>
    </section>
  );
}
