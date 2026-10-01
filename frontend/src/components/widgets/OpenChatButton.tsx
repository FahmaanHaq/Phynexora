"use client";

import type { ReactNode } from "react";
import { MessageSquareText } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { useChat } from "./ChatContext";

/** Opens the chatbot from anywhere (usable inside server components). */
export function OpenChatButton({ children = "Chat with us", source, variant = "secondary", className }: { children?: ReactNode; source: string; variant?: "primary" | "secondary" | "ghost"; className?: string }) {
  const { open } = useChat();
  return (
    <button type="button" onClick={() => open(source)} className={buttonClasses(variant, "md", className)}>
      <MessageSquareText className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
}
