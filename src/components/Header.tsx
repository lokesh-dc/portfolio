"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const { openSidebar } = useChat();
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-0.5 rounded-full border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl p-1.5 pr-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <Link
          href="/"
          className="px-3 py-1.5 text-lg font-bold tracking-tight text-stone-900 dark:text-white hover:opacity-70 transition-opacity"
        >
          LC.
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link) => {
            const isActive =
              link.href === "/projects"
                ? pathname.startsWith("/projects")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors",
                  isActive
                    ? "text-stone-900 dark:text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 mx-1.5" aria-hidden />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={openSidebar}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-[13px] font-bold text-stone-950 transition-colors hover:bg-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Ask my AI
          </button>
        </div>
      </nav>
    </header>
  );
}
