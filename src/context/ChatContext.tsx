"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isPaletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  /** Queued question for the AI sidebar (set by the command palette). */
  pendingPrompt: string | null;
  /** Open the sidebar and auto-send this question to the AI. */
  ask: (question: string) => void;
  consumePendingPrompt: () => string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const openPalette = () => setIsPaletteOpen(true);
  const closePalette = () => setIsPaletteOpen(false);
  const togglePalette = () => setIsPaletteOpen((prev) => !prev);

  const ask = (question: string) => {
    setPendingPrompt(question);
    setIsPaletteOpen(false);
    setIsSidebarOpen(true);
  };

  const consumePendingPrompt = () => {
    if (pendingPrompt === null) return null;
    const q = pendingPrompt;
    setPendingPrompt(null);
    return q;
  };

  return (
    <ChatContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        isPaletteOpen,
        openPalette,
        closePalette,
        togglePalette,
        pendingPrompt,
        ask,
        consumePendingPrompt,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
