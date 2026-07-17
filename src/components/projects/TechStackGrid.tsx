"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface TechGroup {
  category: string;
  items: { name: string }[];
}

interface TechStackGridProps {
  groups: TechGroup[];
}

export function TechStackGrid({ groups }: TechStackGridProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <SectionHeading
        label="Stack"
        title="Technology"
        subtitle="Tools and infrastructure that power FitTrack."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {groups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: gi * 0.08 }}
            className="bg-white/80 dark:bg-stone-900/30 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-xl p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
              {group.category}
            </p>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800/50 text-sm font-medium text-stone-700 dark:text-stone-300 text-center"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
