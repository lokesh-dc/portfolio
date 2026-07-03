"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassCard } from "@/components/shared/GlassCard";
import { RefreshCw } from "lucide-react";

interface Lesson {
  lesson: string;
  whatWentWell: string;
  rebuild: string;
}

interface LessonsLearnedProps {
  items: Lesson[];
}

function LessonCard({ item, index }: { item: Lesson; index: number }) {
  return (
    <GlassCard index={index}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800/50 flex items-center justify-center flex-shrink-0">
            <RefreshCw size={16} className="text-stone-600 dark:text-stone-400" />
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-white">
            {item.lesson}
          </h3>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          {item.whatWentWell}
        </p>
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Would rebuild differently
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed italic">
            {item.rebuild}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export function LessonsLearned({ items }: LessonsLearnedProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <SectionHeading
        label="Reflection"
        title="Lessons Learned"
        subtitle="Honest retrospective on what went well and what I'd change."
      />
      <div className="space-y-4">
        {items.map((item, i) => (
          <LessonCard key={item.lesson} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
