"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Compass,
  FolderGit2,
  Mail,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import clsx from "clsx";
import { matchCommands, type PaletteCommand } from "@/lib/commands";
import { useChat } from "@/context/ChatContext";

const GROUP_ICON: Record<PaletteCommand["group"], typeof Compass> = {
  Navigate: Compass,
  Projects: FolderGit2,
  Skills: Wrench,
  Experience: Briefcase,
  Contact: Mail,
};

function runCommand(
  cmd: PaletteCommand,
  router: ReturnType<typeof useRouter>,
  ask: (q: string) => void,
  close: () => void
) {
  if (cmd.ask) {
    ask(cmd.ask);
    return;
  }
  if (cmd.external) {
    close();
    window.open(cmd.external, cmd.external.startsWith("mailto:") ? "_self" : "_blank");
    return;
  }
  if (cmd.href) {
    close();
    router.push(cmd.href);
  }
}

/**
 * Mounted only while the palette is open, so query/selection state
 * naturally resets on every open without reset effects.
 */
function PalettePanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { ask } = useChat();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => matchCommands(query), [query]);
  const showAskAi = query.trim().length > 1 && !query.trim().startsWith("/");
  const totalCount = results.length + (showAskAi ? 1 : 0);

  // Focus + scroll lock for the session.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  // Prefetch destinations so palette navigation feels instant.
  useEffect(() => {
    for (const cmd of results.slice(0, 9)) {
      if (cmd.href) router.prefetch(cmd.href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const choose = useCallback(
    (index: number) => {
      if (showAskAi && index === results.length) {
        ask(query.trim());
        return;
      }
      const cmd = results[index];
      if (cmd) runCommand(cmd, router, ask, onClose);
    },
    [results, showAskAi, query, router, ask, onClose]
  );

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (totalCount === 0 ? 0 : (a + 1) % totalCount));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (totalCount === 0 ? 0 : (a - 1 + totalCount) % totalCount));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Keep the active row visible.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh] bg-stone-950/40 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
        className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#111111] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 px-4">
          <Search size={16} className="shrink-0 text-stone-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder='Type a command or search… (try "/projects")'
            className="flex-1 bg-transparent py-4 text-base sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            aria-label="Search commands"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-stone-200 dark:border-stone-700 px-1.5 py-0.5 text-[10px] font-semibold text-stone-400">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[340px] overflow-y-auto p-2">
          {results.length === 0 && !showAskAi && (
            <p className="px-3 py-8 text-center text-sm text-stone-500">
              No matches. Try “/” to see all commands, or ask the AI.
            </p>
          )}
          {results.map((cmd, i) => {
            const Icon = GROUP_ICON[cmd.group];
            const isActive = i === active;
            return (
              <motion.button
                layout={!reduce}
                key={cmd.id}
                data-index={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/10"
                    : "bg-transparent"
                )}
              >
                <span
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                    isActive
                      ? "border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-stone-200 dark:border-stone-800 text-stone-400"
                  )}
                >
                  <Icon size={15} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                      {cmd.title}
                    </span>
                    {cmd.slash && (
                      <code className="shrink-0 rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 font-mono text-[10px] text-stone-500 dark:text-stone-400">
                        {cmd.slash}
                      </code>
                    )}
                  </span>
                  {cmd.subtitle && (
                    <span className="block truncate text-xs text-stone-500 dark:text-stone-500">
                      {cmd.subtitle}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-300 dark:text-stone-600">
                  {cmd.group}
                </span>
                {isActive &&
                  (cmd.external ? (
                    <ArrowUpRight size={14} className="shrink-0 text-emerald-600" aria-hidden />
                  ) : (
                    <ArrowRight size={14} className="shrink-0 text-emerald-600" aria-hidden />
                  ))}
              </motion.button>
            );
          })}

          {showAskAi && (
            <button
              data-index={results.length}
              onMouseEnter={() => setActive(results.length)}
              onClick={() => choose(results.length)}
              className={clsx(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors border-t border-stone-100 dark:border-stone-800 mt-1 pt-3",
                active === results.length
                  ? "bg-emerald-50 dark:bg-emerald-500/10"
                  : "bg-transparent"
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Sparkles size={15} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                  Ask AI: “{query.trim()}”
                </span>
                <span className="block text-xs text-stone-500">
                  Grounded answers from portfolio data
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-stone-100 dark:border-stone-800 px-4 py-2.5 text-[11px] text-stone-400">
          <span className="hidden sm:flex items-center gap-1.5">
            <kbd className="rounded border border-stone-200 dark:border-stone-700 px-1">↑↓</kbd>
            navigate
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <kbd className="rounded border border-stone-200 dark:border-stone-700 px-1">↵</kbd>
            select
          </span>
          <span className="sm:hidden">Tap a result to open</span>
          <span className="ml-auto hidden sm:block">/ for slash commands</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CommandPalette() {
  const { isPaletteOpen, openPalette, closePalette } = useChat();

  // Global shortcuts: Cmd/Ctrl+K toggles, "/" opens, Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const editable =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isPaletteOpen) closePalette();
        else openPalette();
      } else if (e.key === "/" && !isPaletteOpen && !editable) {
        e.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPaletteOpen, openPalette, closePalette]);

  return (
    <AnimatePresence>
      {isPaletteOpen && <PalettePanel onClose={closePalette} />}
    </AnimatePresence>
  );
}
