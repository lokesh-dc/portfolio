"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  index?: number;
}

export function GlassCard({ children, className = "", hover = true, index = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`bg-white/80 dark:bg-stone-900/30 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-2xl p-6 md:p-8 ${hover ? "hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 transition-all duration-500" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
