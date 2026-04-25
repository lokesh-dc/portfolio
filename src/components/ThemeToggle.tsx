"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full border border-stone-200 dark:border-stone-800 bg-[#fafafa] dark:bg-[#111]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={(e) => {
        const toggleTheme = () => setTheme(isDark ? "light" : "dark");
        
        // @ts-ignore - View Transitions API
        if (!document.startViewTransition) {
          toggleTheme();
          return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
          toggleTheme();
        });

        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          document.documentElement.animate(
            {
              clipPath: clipPath,
            },
            {
              duration: 500,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      }}
      className="relative w-14 h-8 flex items-center rounded-full border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 px-1 hover:border-stone-300 dark:hover:border-stone-700 transition-colors shadow-inner cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-stone-800 shadow-md"
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        )}
      </motion.div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-stone-400 dark:text-stone-600 pointer-events-none">
        <Sun className="w-3.5 h-3.5" />
        <Moon className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}
