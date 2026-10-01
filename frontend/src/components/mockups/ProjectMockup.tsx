import { cn } from "@/lib/cn";
import type { MockupVariant } from "@/content/portfolio";

/**
 * Lightweight, illustrative UI mockups rendered with HTML/CSS (no image
 * downloads). Replace with real screenshots via `images` in content files.
 */

const bars = [38, 62, 48, 74, 56, 88, 66, 92, 70, 84];

function Frame({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl border border-line bg-elevated text-[10px] shadow-[0_30px_60px_-30px_rgb(var(--shadow-color)/0.5)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2/60 px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 h-3 w-28 rounded-full bg-line" />
      </div>
      <div className="h-[calc(100%-29px)]" aria-hidden="true">{children}</div>
    </div>
  );
}

const Line = ({ w = "w-16", className }: { w?: string; className?: string }) => <span className={cn("block h-1.5 rounded-full bg-line-strong/80", w, className)} />;

function Sidebar() {
  return (
    <div className="hidden w-[22%] shrink-0 flex-col gap-2 border-r border-line bg-surface/60 p-3 sm:flex">
      <span className="mb-1 h-4 w-4 rounded-md bg-[linear-gradient(135deg,var(--primary),var(--cyan))]" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("flex items-center gap-1.5 rounded-md px-1.5 py-1", i === 0 && "bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]")}>
          <span className={cn("h-2 w-2 rounded-sm", i === 0 ? "bg-primary-text" : "bg-line-strong")} />
          <Line w={i % 2 ? "w-10" : "w-14"} />
        </span>
      ))}
    </div>
  );
}

function BarChart({ className, tone = "primary" }: { className?: string; tone?: "primary" | "cyan" }) {
  return (
    <div className={cn("flex h-full items-end gap-[6%]", className)}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-[3px]"
          style={{
            height: `${h}%`,
            background:
              tone === "primary"
                ? `linear-gradient(to top, color-mix(in srgb, var(--primary) ${50 + i * 4}%, transparent), color-mix(in srgb, var(--violet) 70%, transparent))`
                : `linear-gradient(to top, color-mix(in srgb, var(--cyan) 40%, transparent), var(--cyan))`,
          }}
        />
      ))}
    </div>
  );
}

function ErpMock() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex items-center justify-between"><Line w="w-20" className="h-2 bg-fg/40" /><span className="h-4 w-14 rounded-md bg-[color-mix(in_srgb,var(--primary)_80%,transparent)]" /></div>
        <div className="grid grid-cols-3 gap-2">
          {["primary", "violet", "cyan"].map((c) => (
            <div key={c} className="rounded-lg border border-line bg-surface p-2">
              <Line w="w-8" />
              <span className="mt-2 block h-2.5 w-12 rounded-full" style={{ background: `var(--${c === "primary" ? "primary-text" : c})` }} />
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-5 gap-2">
          <div className="col-span-3 rounded-lg border border-line bg-surface p-2"><BarChart className="h-full" /></div>
          <div className="col-span-2 flex flex-col gap-1.5 rounded-lg border border-line bg-surface p-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-line-strong" /><Line w="flex-1" /><span className="h-1.5 w-4 rounded-full bg-[var(--cyan)]/70" /></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PosMock() {
  return (
    <div className="grid h-full grid-cols-5">
      <div className="col-span-3 flex flex-col gap-2 p-3">
        <div className="flex gap-1.5">{["All", "A", "B", "C"].map((t, i) => <span key={t} className={cn("h-4 rounded-md px-2", i === 0 ? "w-8 bg-primary/80" : "w-10 bg-surface-2")} />)}</div>
        <div className="grid flex-1 grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col justify-between rounded-lg border border-line bg-surface p-1.5">
              <span className="h-5 w-5 rounded-md" style={{ background: `color-mix(in srgb, var(--${["primary", "violet", "cyan"][i % 3]}) 30%, transparent)` }} />
              <Line w="w-10" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2 border-l border-line bg-surface/70 p-3">
        <Line w="w-14" className="h-2 bg-fg/40" />
        {[0, 1, 2, 3].map((i) => (<div key={i} className="flex justify-between"><Line w="w-12" /><Line w="w-6" /></div>))}
        <div className="mt-auto space-y-1.5 border-t border-dashed border-line-strong pt-2">
          <div className="flex justify-between"><Line w="w-8" /><Line w="w-8" /></div>
          <div className="flex justify-between"><span className="h-2 w-10 rounded-full bg-fg/50" /><span className="h-2 w-10 rounded-full bg-primary-text" /></div>
        </div>
        <span className="h-6 rounded-md bg-[linear-gradient(110deg,var(--primary),var(--primary-2))]" />
      </div>
    </div>
  );
}

function WebMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-2"><span className="h-2 w-12 rounded-full bg-fg/50" /><div className="flex gap-2">{[0, 1, 2, 3].map((i) => <Line key={i} w="w-6" />)}</div></div>
      <div className="relative mx-3 flex flex-1 flex-col justify-center gap-2 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_80%_20%,color-mix(in_srgb,var(--violet)_35%,transparent),transparent_55%),linear-gradient(135deg,color-mix(in_srgb,var(--primary)_28%,transparent),transparent)] p-4">
        <span className="h-3 w-3/5 rounded-full bg-fg/70" />
        <span className="h-3 w-2/5 rounded-full bg-fg/70" />
        <Line w="w-1/2" className="mt-1" />
        <div className="mt-2 flex gap-2"><span className="h-4 w-14 rounded-md bg-primary" /><span className="h-4 w-14 rounded-md border border-line-strong" /></div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">{[0, 1, 2].map((i) => <div key={i} className="space-y-1 rounded-md border border-line bg-surface p-2"><span className="block h-3 w-3 rounded bg-primary-text/60" /><Line w="w-12" /><Line w="w-8" /></div>)}</div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_65%)] p-3">
      {[0, 1].map((p) => (
        <div key={p} className={cn("flex h-[88%] w-[32%] max-w-[120px] flex-col gap-1.5 rounded-[14px] border-2 border-line-strong bg-surface p-2", p === 1 && "hidden translate-y-4 sm:flex")}>
          <span className="mx-auto mb-1 h-1 w-6 rounded-full bg-line-strong" />
          <span className="h-10 rounded-lg bg-[linear-gradient(135deg,var(--primary),var(--violet))]" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md border border-line p-1"><span className="h-3 w-3 rounded-full bg-[var(--cyan)]/60" /><Line w="flex-1" /></div>
          ))}
          <div className="mt-auto flex justify-around border-t border-line pt-1.5">{[0, 1, 2].map((i) => <span key={i} className={cn("h-2 w-2 rounded-sm", i === 0 ? "bg-primary-text" : "bg-line-strong")} />)}</div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="grid grid-cols-4 gap-2">{[0, 1, 2, 3].map((i) => <div key={i} className="rounded-md border border-line bg-surface p-1.5"><Line w="w-8" /><span className="mt-1.5 block h-2 w-10 rounded-full bg-fg/50" /></div>)}</div>
      <div className="relative flex-1 rounded-lg border border-line bg-surface p-2">
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="h-full w-full">
          <defs><linearGradient id="mock-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--primary-text)" stopOpacity=".35" /><stop offset="1" stopColor="var(--primary-text)" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 62 C20 55 30 40 50 44 S80 30 100 34 S140 12 160 20 S190 10 200 8 V80 H0Z" fill="url(#mock-area)" />
          <path d="M0 62 C20 55 30 40 50 44 S80 30 100 34 S140 12 160 20 S190 10 200 8" fill="none" stroke="var(--primary-text)" strokeWidth="1.5" />
          <path d="M0 70 C30 66 50 58 80 60 S130 46 160 50 S190 40 200 38" fill="none" stroke="var(--cyan)" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>
      <div className="grid h-[28%] grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-surface p-2"><BarChart tone="cyan" className="h-full" /></div>
        <div className="flex items-center justify-center rounded-lg border border-line bg-surface">
          <span className="h-10 w-10 rounded-full" style={{ background: "conic-gradient(var(--primary-text) 0 45%, var(--violet) 45% 72%, var(--cyan) 72% 100%)", mask: "radial-gradient(circle, transparent 45%, black 46%)", WebkitMask: "radial-gradient(circle, transparent 45%, black 46%)" }} />
        </div>
      </div>
    </div>
  );
}

function WorkflowMock() {
  const cols = ["primary-text", "violet", "cyan", "primary-text"];
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="grid flex-1 grid-cols-4 gap-2 p-3">
        {cols.map((c, ci) => (
          <div key={ci} className="flex flex-col gap-1.5 rounded-lg bg-surface-2/60 p-1.5">
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--${c})` }} /><Line w="w-8" /></div>
            {Array.from({ length: 4 - (ci % 3) }).map((_, i) => (
              <div key={i} className="space-y-1 rounded-md border border-line bg-surface p-1.5"><Line w="w-full" /><Line w="w-2/3" /><div className="flex justify-between pt-0.5"><span className="h-2.5 w-2.5 rounded-full bg-line-strong" /><span className="h-1.5 w-4 rounded-full" style={{ background: `color-mix(in srgb, var(--${c}) 60%, transparent)` }} /></div></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const map: Record<MockupVariant, () => React.JSX.Element> = {
  erp: ErpMock,
  pos: PosMock,
  web: WebMock,
  mobile: MobileMock,
  analytics: AnalyticsMock,
  workflow: WorkflowMock,
};

const labels: Record<MockupVariant, string> = {
  erp: "Illustrative ERP dashboard interface",
  pos: "Illustrative point-of-sale interface",
  web: "Illustrative business website layout",
  mobile: "Illustrative mobile application screens",
  analytics: "Illustrative analytics dashboard",
  workflow: "Illustrative workflow board interface",
};

export function ProjectMockup({ variant, className }: { variant: MockupVariant; className?: string }) {
  const Cmp = map[variant];
  return (
    <Frame className={className} label={labels[variant]}>
      <Cmp />
    </Frame>
  );
}
