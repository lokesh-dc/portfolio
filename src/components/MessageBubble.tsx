"use client";

import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import clsx from "clsx";

export type MessageType = "user" | "assistant";

export interface Message {
  id: string;
  type: MessageType;
  content: React.ReactNode;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        "flex w-full px-4 sm:px-6 py-5",
        isUser ? "bg-transparent" : "bg-transparent"
      )}
    >
      <div className="flex w-full gap-4">
        <div
          className={clsx(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded border",
            isUser
              ? "bg-stone-100 border-stone-200 dark:bg-stone-800 dark:border-stone-700 text-stone-500"
              : "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-500"
          )}
        >
          {isUser ? <User size={14} /> : <Sparkles size={14} />}
        </div>
        <div className="flex-1 space-y-3 overflow-hidden pt-0.5 text-sm">
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}
