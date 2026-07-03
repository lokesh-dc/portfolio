"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowDown } from "lucide-react";

interface ArchitectureSectionProps {
  caption: string;
  layers: { label: string; description: string }[];
}

export function ArchitectureSection({ caption, layers }: ArchitectureSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <SectionHeading
        label="Architecture"
        title="System Architecture"
        subtitle={caption}
      />
      <div className="flex flex-col items-center">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-full"
          >
            <div className="bg-white/80 dark:bg-stone-900/40 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-xl p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-emerald-500/10 border border-stone-200 dark:border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {layer.label}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-3">
                <ArrowDown size={16} className="text-stone-400 dark:text-stone-600" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
