"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  metric: string;
  value: string;
  sublabel?: string;
  index?: number;
}

export function MetricCard({ metric, value, sublabel, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white/80 dark:bg-stone-900/40 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-xl p-5 md:p-6 text-center"
    >
      <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mb-1">
        {value}
      </p>
      <p className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
        {metric}
      </p>
      {sublabel && (
        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-light">
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}
