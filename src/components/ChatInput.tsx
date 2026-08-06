"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const options = [
    {
      id: "experience",
      label: "Tell me about your work experience.",
    },
    {
      id: "projects",
      label: "Show me your best project.",
    },
    {
      id: "about",
      label: "Tell me more about you.",
    },
  ] as const;

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 pb-6 pt-2">
      <div className="flex flex-col gap-1.5 mb-4 px-2">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
            onClick={() => onSend(opt.label)}
            disabled={disabled}
            className={clsx(
              "text-left text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed group flex items-start"
            )}
          >
            <span className="mr-2 text-stone-300 dark:text-stone-600 group-hover:text-stone-400 dark:group-hover:text-stone-500">
              ↳
            </span>
            <span className="leading-snug relative top-[1px]">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="relative flex items-center w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a1a1a] shadow-sm">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1 max-h-32 min-h-[44px] resize-none bg-transparent px-3 py-2.5 text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className={clsx(
            "absolute right-2 bottom-2 flex items-center justify-center h-7 w-7 rounded-lg transition-colors",
            value.trim() && !disabled
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-500 cursor-not-allowed"
          )}
          aria-label="Send message"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-500">
        Powered by local Ollama
      </p>
    </div>
  );
}
