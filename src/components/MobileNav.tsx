"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Work", icon: Code2 },
  { href: "/experience", label: "Exp", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border border-stone-200 dark:border-stone-800 shadow-xl"
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
              <item.icon size={18} className="mb-0.5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
