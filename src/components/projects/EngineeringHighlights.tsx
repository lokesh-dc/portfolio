"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { Lightbulb } from "lucide-react";

interface EngineeringHighlight {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

interface EngineeringHighlightsProps {
  items: EngineeringHighlight[];
}

function EngineeringCard({ item, index }: { item: EngineeringHighlight; index: number }) {
  return (
    <GlassCard index={index}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800/50 flex items-center justify-center flex-shrink-0">
            <Lightbulb size={16} className="text-stone-600 dark:text-stone-400" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {item.title}
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
              Problem
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {item.problem}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Solution
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {item.solution}
            </p>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
              Result
            </p>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {item.result}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function EngineeringHighlights({ items }: EngineeringHighlightsProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <SectionHeading
        label="Engineering"
        title="Engineering Highlights"
        subtitle="Decisions made so the user never has to think about performance."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <EngineeringCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
