"use client";

import { motion } from "framer-motion";

interface QuickFactsBarProps {
  facts: { label: string; value: string }[];
}

export function QuickFactsBar({ facts }: QuickFactsBarProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-stone-900/40 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-stone-200 dark:divide-stone-800/50">
          {facts.map((fact, i) => (
            <div key={fact.label} className="p-4 md:p-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-1">
                {fact.label}
              </p>
              <p className="text-sm md:text-base font-semibold text-stone-900 dark:text-white">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
