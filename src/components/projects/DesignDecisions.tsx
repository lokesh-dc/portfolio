"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { Palette } from "lucide-react";

interface DesignDecision {
  decision: string;
  problem: string;
  rationale: string;
}

interface DesignDecisionsProps {
  items: DesignDecision[];
}

function DesignDecisionCard({ item, index }: { item: DesignDecision; index: number }) {
  return (
    <GlassCard index={index}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800/50 flex items-center justify-center flex-shrink-0">
            <Palette size={16} className="text-stone-600 dark:text-stone-400" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {item.decision}
          </h3>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
            Problem
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            {item.problem}
          </p>
        </div>
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            Rationale
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            {item.rationale}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export function DesignDecisions({ items }: DesignDecisionsProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <SectionHeading
        label="UX"
        title="Design Decisions"
        subtitle="Every interface choice has a reason rooted in the gym experience."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <DesignDecisionCard key={item.decision} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
