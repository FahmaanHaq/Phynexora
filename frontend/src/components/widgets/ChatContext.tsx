"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Ctx = { isOpen: boolean; open: (source?: string) => void; close: () => void; toggle: () => void };

const ChatCtx = createContext<Ctx | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback((source = "unknown") => {
    setOpen(true);
    track("chatbot_open", { source });
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
