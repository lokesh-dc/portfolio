"use client";

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const { openSidebar } = useChat();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full flex items-center justify-between p-6 md:p-10 max-w-7xl mx-auto z-10 relative">
      <div className="flex items-center gap-8">
        <Link 
          href="/" 
          className="font-sans font-bold text-xl tracking-tight hover:opacity-70 transition-opacity"
        >
          LC.
        </Link>
        <nav className="flex gap-6">
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

      <div className="flex items-center gap-4">
        {!isHome && (
          <Link 
            href="/" 
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors mr-4"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
        )}
        
        <button
          onClick={openSidebar}
          className="flex items-center gap-2 group px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-[#fafafa] dark:bg-[#111] hover:bg-stone-100 dark:hover:bg-[#1a1a1a] transition-all shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
          <span className="text-sm font-medium tracking-wide">Ask AI</span>
        </button>
      </div>
    </header>
  );
}
