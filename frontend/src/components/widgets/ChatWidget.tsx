"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { RotateCcw, SendHorizontal, X, AlertCircle } from "lucide-react";
import { useChat } from "./ChatContext";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { advance, initialState, inputHint, intents, summaryForWhatsApp, welcome, type FlowState, type QuickReply } from "@/lib/chat/guidedFlow";
import { api } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/client";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  replies?: QuickReply[];
  kind?: "error" | "whatsapp";
};

let seq = 0;
const uid = () => `m${++seq}`;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ChatWidget() {
  const { isOpen, close } = useChat();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [flow, setFlow] = useState<FlowState>(initialState);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const aiHistory = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const started = useRef(false);

  const pushBot = useCallback(async (list: { text: string; replies?: QuickReply[]; kind?: Msg["kind"] }[]) => {
    for (const m of list) {
      setTyping(true);
      await wait(Math.min(900, 350 + m.text.length * 6));
      setTyping(false);
      setMessages((prev) => [...prev, { id: uid(), role: "bot", ...m }]);
    }
  }, []);

  const start = useCallback(async () => {
    setMessages([]);
    setFlow(initialState());
    aiHistory.current = [];
    await pushBot(welcome);
  }, [pushBot]);

  useEffect(() => {
    if (isOpen && !started.current) {
      started.current = true;
      void start();
    }
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen, start, close]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const submitLead = useCallback(
    async (state: FlowState) => {
      const lead = state.lead;
      try {
        await api.submitChatLead({
          intent: lead.intent ?? "",
          name: lead.name ?? "",
          company: lead.company ?? "",
          email: lead.email ?? "",
          whatsapp: lead.whatsapp ?? "",
          service: lead.service ?? "",
          description: lead.description ?? "",
          transcript: messages.slice(-40).map((m) => ({ role: m.role, text: m.text })),
        });
        track("chatbot_lead", { service: lead.service ?? "" });
        setFlow({ ...state, step: "done" });
        await pushBot([
          { text: `Thank you, ${lead.name?.split(" ")[0] ?? ""}! Your details have been received. Our team will review them and get back to you shortly.` },
          { text: "Would you like to continue on WhatsApp?", kind: "whatsapp" },
        ]);
      } catch (e) {
        setFlow({ ...state, step: "done" });
        const msg = e instanceof ApiError && e.kind === "network" ? "We couldn't reach our servers just now." : "We couldn't save your details just now.";
        await pushBot([
          { text: `${msg} You can continue on WhatsApp and we'll pick it up from there.`, kind: "error" },
          { text: "Would you like to continue on WhatsApp?", kind: "whatsapp" },
        ]);
      }
    },
    [messages, pushBot],
  );

  const handle = useCallback(
    async (kind: "option" | "text", value: string, label?: string) => {
      if (busy || !value.trim()) return;
      setInputError("");

      // AI mode: free-text questions at the start go to the AI backend.
      if (kind === "text" && flow.step === "intent" && siteConfig.integrations.chatMode === "ai") {
        setMessages((p) => [...p, { id: uid(), role: "user", text: value }]);
        setInput("");
        setBusy(true);
        setTyping(true);
        try {
          aiHistory.current.push({ role: "user", content: value });
          const { reply } = await api.sendChatMessage(aiHistory.current.slice(-12));
          aiHistory.current.push({ role: "assistant", content: reply });
          setTyping(false);
          await pushBot([{ text: reply, replies: [{ label: "Share my project details", value: "idea" }, ...intents.slice(0, 3).map((i) => ({ label: i.label, value: i.value }))] }]);
        } catch {
          setTyping(false);
          const res = advance(flow, { kind: "text", value });
          setFlow(res.state);
          await pushBot(res.messages);
        } finally {
          setBusy(false);
        }
        return;
      }

      const res = advance(flow, { kind, value });
      if (res.error) {
        setInputError(res.error);
        inputRef.current?.focus();
        return;
      }
      const shown = kind === "option" ? (value === "__skip" ? "Skip" : value === "__note" ? "Use what I wrote earlier" : label ?? value) : value;
      setMessages((p) => [...p.map((m) => ({ ...m, replies: undefined })), { id: uid(), role: "user", text: shown }]);
      if (kind === "option" && flow.step === "intent") track("chatbot_option", { option: value });
      setInput("");
      setFlow(res.state);
      setBusy(true);
      await pushBot(res.messages);
      if (res.submit) await submitLead(res.state);
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [busy, flow, pushBot, submitLead],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void handle("text", input);
  };

  const hint = inputHint[flow.step];
  const done = flow.step === "done" || flow.step === "review";
  const lastReplies = [...messages].reverse().find((m) => m.role === "bot")?.replies;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label="Chat with Phynexora"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "fixed z-[70] flex flex-col overflow-hidden border border-line bg-elevated shadow-[0_40px_80px_-30px_rgb(var(--shadow-color)/0.7)] transition-all duration-300 ease-out",
        "inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-3xl",
        isOpen ? "pointer-events-auto translate-y-0 opacity-100 sm:scale-100" : "pointer-events-none translate-y-6 opacity-0 sm:scale-95",
        "origin-bottom-right",
      )}
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-line px-4 py-3.5">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_60%)]" />
        <div className="relative">
          <LogoMark className="h-9 w-9" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-elevated bg-emerald-500" aria-hidden="true" />
        </div>
        <div className="relative flex-1">
          <p className="text-sm font-semibold text-fg">Phynexora Assistant</p>
          <p className="text-xs text-subtle">Here to help you get started</p>
        </div>
        <button type="button" onClick={() => { started.current = true; void start(); }} aria-label="Restart conversation" className="relative rounded-lg p-2 text-subtle transition-colors hover:bg-surface-2 hover:text-fg">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={close} aria-label="Close chat" className="relative rounded-lg p-2 text-subtle transition-colors hover:bg-surface-2 hover:text-fg">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
        {messages.map((m) => (
          <div key={m.id} className={cn("flex animate-fade-up", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.kind === "whatsapp" ? (
              <div className="w-full max-w-[85%] rounded-2xl rounded-tl-md border border-line bg-surface p-3">
                <p className="text-sm text-fg">{m.text}</p>
                <a
                  href={whatsappUrl(summaryForWhatsApp(flow.lead))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "chatbot" })}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#128c4b] px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#0f7a41]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
                </a>
              </div>
            ) : (
              <p
                className={cn(
                  "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user" && "rounded-tr-md bg-[linear-gradient(110deg,var(--primary),var(--primary-2))] text-white",
                  m.role === "bot" && !m.kind && "rounded-tl-md border border-line bg-surface text-fg",
                  m.kind === "error" && "flex gap-2 rounded-tl-md border border-amber-500/30 bg-amber-500/10 text-fg",
                )}
              >
                {m.kind === "error" && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />}
                <span>{m.text}</span>
              </p>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex" aria-label="Assistant is typing">
            <span className="inline-flex gap-1 rounded-2xl rounded-tl-md border border-line bg-surface px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-subtle" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </span>
          </div>
        )}
        {!typing && lastReplies && (
          <div className="flex flex-wrap gap-2 pt-1">
            {lastReplies.map((r) => (
              <button
                key={r.value}
                type="button"
                disabled={busy}
                onClick={() => void handle("option", r.value, r.label)}
                className="rounded-full border border-[color-mix(in_srgb,var(--primary-text)_35%,transparent)] bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] px-3.5 py-2 text-left text-[13px] font-medium text-primary-text transition-all hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--primary)_16%,transparent)]"
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {done ? (
          <button type="button" onClick={() => void start()} className="w-full rounded-xl border border-line py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg">
            Start a new conversation
          </button>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="chat-input" className="sr-only">Your message</label>
            <div className={cn("flex items-center gap-2 rounded-2xl border bg-surface px-2 py-1.5 transition-colors focus-within:border-primary-text/60", inputError ? "border-red-500/60" : "border-line")}>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setInputError(""); }}
                type={hint?.type ?? "text"}
                autoComplete={hint?.autoComplete ?? "off"}
                placeholder={hint?.placeholder ?? "Type a message…"}
                maxLength={flow.step === "description" ? 3000 : 200}
                disabled={busy}
                aria-invalid={Boolean(inputError)}
                aria-describedby={inputError ? "chat-input-error" : undefined}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[16px] text-fg placeholder:text-subtle focus:outline-none sm:text-sm"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send message" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:-translate-y-0.5 disabled:opacity-40">
                <SendHorizontal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {inputError && <p id="chat-input-error" role="alert" className="mt-1.5 px-2 text-xs text-red-500">{inputError}</p>}
          </form>
        )}
        <p className="mt-2 text-center text-[11px] text-subtle">
          By sharing your details you agree to be contacted about your enquiry.
        </p>
      </div>
    </div>
  );
}
