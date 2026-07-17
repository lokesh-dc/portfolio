"use client";

import { motion } from "framer-motion";

interface ProblemSolutionProps {
  problem: { headline: string; body: string };
  solution: { headline: string; body: string; image?: string };
}

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 space-y-20 md:space-y-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
          The Problem
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mt-4 mb-6">
          {problem.headline}
        </h2>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          {problem.body}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl ml-auto"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          The Solution
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mt-4 mb-6">
          {solution.headline}
        </h2>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          {solution.body}
        </p>
      </motion.div>
    </section>
  );
}
