"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { openSidebar } = useChat();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={clsx(
      "sticky top-0 w-full z-50 transition-all duration-500",
      "backdrop-blur-md bg-white/30 dark:bg-[#0a0a0a]/30",
      scrolled
        ? "border-b border-stone-200/50 dark:border-stone-800/50 py-4 shadow-sm"
        : "border-b border-transparent py-4"
    )}>
      <div className="flex items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-sans font-bold text-xl tracking-tight hover:opacity-70 transition-opacity text-stone-900 dark:text-white"
          >
            LC.
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/projects"
              className={clsx(
                "font-medium text-sm transition-colors",
                pathname.startsWith("/projects") ? "text-stone-900 dark:text-stone-100" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              Projects
            </Link>
            <Link
              href="/experience"
              className={clsx(
                "font-medium text-sm transition-colors",
                pathname === "/experience" ? "text-stone-900 dark:text-stone-100" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              Experience
            </Link>
            <Link
              href="/about"
              className={clsx(
                "font-medium text-sm transition-colors",
                pathname === "/about" ? "text-stone-900 dark:text-stone-100" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors mr-2"
            >
              <ArrowLeft size={16} /> Back Home
            </Link>
          )}

          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openSidebar}
            className="flex items-center gap-2 group px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-[#fafafa] dark:bg-[#111] hover:bg-stone-100 dark:hover:bg-[#1a1a1a] transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden sm:inline text-sm font-medium tracking-wide dark:text-stone-200 text-stone-600">Ask AI</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
