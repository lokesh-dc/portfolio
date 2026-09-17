"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Code2, Search } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useChat } from "@/context/ChatContext";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Work", icon: Code2 },
  { href: "/experience", label: "Exp", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { openPalette } = useChat();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex flex-col items-center">
      {/* Command palette entry point — the primary way to search on touch */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        onClick={openPalette}
        aria-label="Search the site"
        className="relative z-10 -mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-stone-950 shadow-[0_12px_28px_rgba(16,185,129,0.45)] border-4 border-white dark:border-stone-950 active:scale-95 transition-transform"
      >
        <Search size={19} strokeWidth={2.5} aria-hidden />
      </motion.button>
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg border border-stone-200 dark:border-stone-800 shadow-xl"
      >
        {navItems.map((item) => {
          const isActive = item.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex flex-col items-center justify-center w-16 h-12 rounded-full transition-colors",
                isActive ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.85 }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex flex-col items-center"
              >
                <item.icon size={18} className="mb-0.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
