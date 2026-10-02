"use client";

import { useId, useState } from "react";
import { Bot, Building2, Cloud, Globe, LayoutDashboard, Network, Smartphone, Store, Workflow, CheckCircle2 } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

/**
 * Signature Phynexora visual:
 *   Business → Phynexora → ERP / POS / Web / Mobile / AI / Automation / Integrations / Cloud & Data
 * Coordinates are in a 0–100 space shared by the SVG (lines) and the HTML nodes,
 * so the whole visual scales fluidly with its container.
 */

type NodeDef = { id: string; label: string; text: string; Icon: typeof Bot; x: number; y: number };

const CORE = { x: 56, y: 50 };
const BUSINESS = { x: 8, y: 50 };

const satellites: Omit<NodeDef, "x" | "y">[] = [
  { id: "erp", label: "ERP", text: "Operations, HR, payroll, inventory and finance in one connected system.", Icon: LayoutDashboard },
  { id: "pos", label: "POS", text: "Fast sales at the counter with stock, customers and reports behind it.", Icon: Store },
  { id: "web", label: "Web", text: "Websites, e-commerce and web applications that do real work.", Icon: Globe },
  { id: "mobile", label: "Mobile", text: "Apps that connect your customers and teams on the move.", Icon: Smartphone },
  { id: "ai", label: "AI", text: "Assistants, document processing and insight — applied where it helps.", Icon: Bot },
  { id: "automation", label: "Automation", text: "Repetitive steps handled automatically, so people focus on real work.", Icon: Workflow },
  { id: "integrations", label: "Integrations", text: "APIs that link your systems so data is entered once.", Icon: Network },
  { id: "cloud", label: "Cloud & Data", text: "Secure databases and cloud hosting designed to scale.", Icon: Cloud },
];

const RX = 34;
const RY = 39;
const nodes: NodeDef[] = satellites.map((s, i) => {
  const deg = -157.5 + i * 45;
  const rad = (deg * Math.PI) / 180;
  return { ...s, x: +(CORE.x + RX * Math.cos(rad)).toFixed(2), y: +(CORE.y + RY * Math.sin(rad)).toFixed(2) };
});

const coreInfo = { label: "Phynexora", text: "One technology partner for your digital business." };
const businessInfo = { label: "Your Business", text: "Everything starts with how your business works — your people, workflows and goals." };

function curve(from: { x: number; y: number }, to: { x: number; y: number }) {
  // gentle arc: control point offset perpendicular to the line
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mx = (from.x + to.x) / 2 - dy * 0.18;
  const my = (from.y + to.y) / 2 + dx * 0.18;
  return `M${from.x} ${from.y} Q${mx} ${my} ${to.x} ${to.y}`;
}

export function HeroEcosystem() {
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const activeNode = nodes.find((n) => n.id === active);
  const info = active === "business" ? businessInfo : activeNode ? activeNode : coreInfo;

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="relative aspect-[1/1.02] w-full sm:aspect-square">
        {/* ambient glow */}
        <div aria-hidden="true" className="absolute left-[56%] top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.35),transparent_65%)] blur-2xl" />
        <div aria-hidden="true" className="absolute left-[56%] top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line-strong/70 animate-spin-slow" />
        <div aria-hidden="true" className="absolute left-[56%] top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/80" />

        {/* connection lines */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-biz`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.2" />
              <stop offset="1" stopColor="var(--primary-text)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path id={`${uid}-p-business`} d={`M${BUSINESS.x} ${BUSINESS.y} L${CORE.x} ${CORE.y}`} stroke={`url(#${uid}-biz)`} strokeWidth={active === "business" ? 0.9 : 0.55} fill="none" vectorEffect="non-scaling-stroke" style={{ strokeWidth: active === "business" ? 2.4 : 1.6 }} />
          <path d={`M${BUSINESS.x} ${BUSINESS.y} L${CORE.x} ${CORE.y}`} stroke="var(--primary-text)" strokeDasharray="2 10" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" className="animate-dash" style={{ strokeWidth: 2 }} />
          {nodes.map((n) => {
            const d = curve(CORE, n);
            const on = active === n.id;
            const dim = active && !on && active !== "core";
            return (
              <g key={n.id} className="transition-opacity duration-300" style={{ opacity: dim ? 0.25 : 1 }}>
                <path id={`${uid}-p-${n.id}`} d={d} fill="none" stroke={on ? "var(--primary-text)" : "var(--line-strong)"} vectorEffect="non-scaling-stroke" style={{ strokeWidth: on ? 2 : 1.2 }} />
                <path d={d} fill="none" stroke="var(--cyan)" strokeOpacity={on ? 0.9 : 0.45} strokeDasharray="1.5 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="animate-dash" style={{ strokeWidth: 1.6 }} />
              </g>
            );
          })}
          {/* travelling pulses (hidden for reduced motion via CSS) */}
          <g className="motion-reduce:hidden">
            <circle r="0.9" fill="var(--cyan)">
              <animateMotion dur="2.6s" repeatCount="indefinite" rotate="auto">
                <mpath href={`#${uid}-p-business`} />
              </animateMotion>
            </circle>
            {nodes.filter((_, i) => i % 2 === 0).map((n, i) => (
              <circle key={n.id} r="0.7" fill="var(--primary-text)">
                <animateMotion dur={`${3 + i * 0.6}s`} begin={`${i * 0.7}s`} repeatCount="indefinite">
                  <mpath href={`#${uid}-p-${n.id}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        </svg>

        {/* Floating context cards (decorative) */}
        <div aria-hidden="true" className="glass absolute left-[0%] top-[2%] hidden w-[28%] animate-float-slow rounded-2xl p-3 shadow-[0_20px_40px_-20px_rgb(var(--shadow-color)/0.6)] sm:block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted">Operations overview</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-2.5 flex h-10 items-end gap-1">
            {[40, 65, 50, 80, 62, 92, 74].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm bg-[linear-gradient(to_top,var(--primary),var(--violet))]" style={{ height: `${h}%`, opacity: 0.45 + i * 0.07 }} />
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="glass absolute bottom-[3%] left-[0%] hidden animate-float rounded-xl px-3 py-2 shadow-[0_20px_40px_-20px_rgb(var(--shadow-color)/0.6)] sm:flex sm:items-center sm:gap-2" style={{ animationDelay: "1.2s" }}>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-[11px] font-medium text-fg">Inventory synced</span>
          <span className="text-[10px] text-subtle">POS → ERP</span>
        </div>

        {/* Business node */}
        <button
          type="button"
          onMouseEnter={() => setActive("business")}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive("business")}
          onBlur={() => setActive(null)}
          onClick={() => setActive((a) => (a === "business" ? null : "business"))}
          aria-label={`${businessInfo.label}: ${businessInfo.text}`}
          className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
          style={{ left: `${BUSINESS.x}%`, top: `${BUSINESS.y}%` }}
        >
          <span className={cn("flex flex-col items-center gap-1.5 transition-transform duration-300", active === "business" && "scale-110")}>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--cyan)_45%,transparent)] bg-surface text-cyan shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--cyan)_60%,transparent)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--primary-text)] sm:h-14 sm:w-14">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-[10px] font-medium text-muted sm:text-xs">Your Business</span>
          </span>
        </button>

        {/* Core node */}
        <button
          type="button"
          onMouseEnter={() => setActive("core")}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive("core")}
          onBlur={() => setActive(null)}
          onClick={() => setActive((a) => (a === "core" ? null : "core"))}
          aria-label={`${coreInfo.label}: ${coreInfo.text}`}
          className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
          style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
        >
          <span className="relative flex h-[72px] w-[72px] items-center justify-center sm:h-24 sm:w-24">
            <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-[28px] bg-[rgb(var(--glow)/0.35)]" />
            <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] border border-white/15 bg-black shadow-[0_20px_60px_-15px_rgb(var(--glow)/0.8)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-[var(--primary-text)] sm:rounded-[28px]">
              <LogoMark priority className="h-full w-full rounded-none" />
            </span>
          </span>
        </button>

        {/* Service nodes */}
        {nodes.map((n) => {
          const on = active === n.id;
          return (
            <button
              key={n.id}
              type="button"
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((a) => (a === n.id ? null : n.id))}
              aria-label={`${n.label}: ${n.text}`}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span
                className={cn(
                  "flex items-center gap-2 rounded-full border bg-surface/90 py-1 pl-1 pr-1 backdrop-blur transition-all duration-300 sm:pr-3",
                  on ? "scale-110 border-[color-mix(in_srgb,var(--primary-text)_60%,transparent)] shadow-[0_10px_30px_-10px_rgb(var(--glow)/0.8)]" : "border-line hover:border-line-strong",
                  "group-focus-visible:ring-2 group-focus-visible:ring-[var(--primary-text)]",
                )}
              >
                <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8", on ? "bg-primary text-on-primary" : "bg-surface-2 text-primary-text")}>
                  <n.Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </span>
                <span className="hidden whitespace-nowrap text-xs font-medium text-fg sm:inline">{n.label}</span>
              </span>
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[9.5px] font-medium text-muted sm:hidden">{n.label}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation panel */}
      <div className="relative mx-auto -mt-2 max-w-md px-2 sm:-mt-4">
        <div className="glass flex items-start gap-3 rounded-2xl px-4 py-3" aria-live="polite">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--primary-text),var(--cyan))]" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-fg">{info.label}</span>
            <span className="mx-1.5 text-subtle">—</span>
            {info.text}
          </p>
        </div>
        <p className="mt-2 text-center text-[11px] text-subtle">Hover or tap a node to explore the ecosystem</p>
      </div>
    </div>
  );
}
