"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useChat } from "@/context/ChatContext";

export type MessageType = "user" | "assistant";

export interface Message {
  id: string;
  type: MessageType;
  content: React.ReactNode;
}

function InlineText({ text }: { text: string }) {
  const codeParts = text.split(/`([^`]+)`/g);
  return (
    <>
      {codeParts.map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-700 dark:text-emerald-400"
          >
            {part}
          </code>
        ) : (
          <LinkAndBold key={i} text={part} />
        )
      )}
    </>
  );
}

function LinkAndBold({ text }: { text: string }) {
  const { closeSidebar } = useChat();
  const linkParts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  return (
    <>
      {linkParts.map((part, i) => {
        if (i % 3 === 1) {
          const href = linkParts[i + 1];
          const className =
            "text-emerald-600 dark:text-emerald-400 underline underline-offset-2 break-all font-medium";
          return href.startsWith("/") ? (
            <Link
              key={i}
              href={href}
              onClick={closeSidebar}
              className={className}
            >
              {part}
            </Link>
          ) : (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {part}
            </a>
          );
        }
        if (i % 3 === 2) return null;
        return <BoldText key={i} text={part} />;
      })}
    </>
  );
}

function BoldText({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-stone-900 dark:text-white">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function ChatText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let codeBlock: string[] | null = null;

  const flushList = () => {
    if (list.length > 0) {
      blocks.push(
        <ul key={blocks.length} className="space-y-1.5 pl-1">
          {list.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 select-none">•</span>
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  const flushCode = () => {
    if (codeBlock !== null) {
      blocks.push(
        <pre
          key={blocks.length}
          className="overflow-x-auto rounded-lg bg-stone-100 dark:bg-stone-800/70 px-3 py-2.5 font-mono text-xs leading-relaxed text-stone-700 dark:text-stone-300"
        >
          {codeBlock.join("\n")}
        </pre>
      );
      codeBlock = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.trim().startsWith("```")) {
      if (codeBlock === null) {
        flushList();
        codeBlock = [];
      } else {
        flushCode();
      }
      continue;
    }

    if (codeBlock !== null) {
      codeBlock.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
      list.push(trimmed.replace(/^[-•*]\s*/, ""));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      blocks.push(
        <p key={blocks.length} className="flex gap-2">
          <span className="text-stone-500 dark:text-stone-500 select-none">
            {trimmed.match(/^\d+/)?.[0]}.
          </span>
          <span>
            <InlineText text={trimmed.replace(/^\d+\.\s/, "")} />
          </span>
        </p>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList();
      blocks.push(
        <p
          key={blocks.length}
          className="border-l-2 border-emerald-500 pl-3 text-stone-500 dark:text-stone-400 italic"
        >
          <InlineText text={trimmed.replace(/^>\s*/, "")} />
        </p>
      );
    } else if (/^#{1,6}\s/.test(trimmed)) {
      flushList();
      const level = trimmed.match(/^#+/)?.[0].length ?? 1;
      const heading = trimmed.replace(/^#+\s*/, "");
      blocks.push(
        <p
          key={blocks.length}
          className={
            level <= 2
              ? "font-sans text-base font-semibold text-stone-900 dark:text-white"
              : "font-sans text-sm font-semibold text-stone-900 dark:text-white"
          }
        >
          <InlineText text={heading} />
        </p>
      );
    } else if (trimmed === "") {
      flushList();
      flushCode();
    } else {
      flushList();
      blocks.push(
        <p key={blocks.length}>
          <InlineText text={line} />
        </p>
      );
    }
  }
  flushList();
  flushCode();

  return (
    <div className="space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
      {blocks}
    </div>
  );
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
          {typeof message.content === "string" ? (
            <ChatText text={message.content} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </motion.div>
  );
}
