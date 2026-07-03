"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface Challenge {
  id: string;
  challenge: string;
  difficulty: string;
  solution: string;
  outcome: string;
}

interface TechnicalChallengesProps {
  items: Challenge[];
}

function ChallengeCard({ item, index }: { item: Challenge; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left bg-white/80 dark:bg-stone-900/30 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-xl p-5 md:p-6 hover:border-stone-300 dark:hover:border-stone-700/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                {item.challenge}
              </h3>
              <ChevronDown
                size={18}
                className={`text-stone-400 dark:text-stone-500 flex-shrink-0 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-1 font-light">
              {item.difficulty}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white/60 dark:bg-stone-900/20 backdrop-blur-xl border-x border-b border-stone-200 dark:border-stone-800/50 rounded-b-xl p-5 md:p-6 -mt-px space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
                  Solution
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {item.solution}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  Outcome
                </p>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {item.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TechnicalChallenges({ items }: TechnicalChallengesProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <SectionHeading
        label="Deep Dive"
        title="Technical Challenges"
        subtitle="Real problems encountered building FitTrack, and how each was solved."
      />
      <div className="space-y-3">
        {items.map((item, i) => (
          <ChallengeCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
