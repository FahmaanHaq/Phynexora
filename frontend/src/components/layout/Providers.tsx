"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { ChatProvider } from "@/components/widgets/ChatContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <ChatProvider>{children}</ChatProvider>
    </ThemeProvider>
  );
}
