"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="space-y-3 mb-12 md:mb-16"
    >
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-stone-600 dark:text-stone-400 font-light max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
