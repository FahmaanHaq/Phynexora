export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24" role="status" aria-label="Loading">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-[var(--primary-text)]" />
    </div>
  );
}
