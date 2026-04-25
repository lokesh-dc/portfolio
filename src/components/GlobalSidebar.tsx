"use client";

import ChatSidebar from "@/components/ChatSidebar";
import { useChat } from "@/context/ChatContext";

export default function GlobalSidebar() {
  const { isSidebarOpen, closeSidebar } = useChat();

  return <ChatSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />;
}
