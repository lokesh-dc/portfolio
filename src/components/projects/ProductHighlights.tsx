"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ProductHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  gif?: string;
  benefit: string;
  technicalNote: string;
}

interface ProductHighlightsProps {
  items: ProductHighlight[];
}

function ProductHighlightCard({ item, index }: { item: ProductHighlight; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard index={index} className="group cursor-pointer" hover={false}>
      <div className="space-y-5">
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            {item.title}
          </h3>
          <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="px-4 py-3 rounded-lg bg-stone-100 dark:bg-emerald-500/10 border border-stone-200 dark:border-emerald-500/20">
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            {item.benefit}
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-medium text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
          How it works
        </button>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-stone-500 dark:text-stone-500 font-light leading-relaxed border-t border-stone-200 dark:border-stone-800 pt-4">
              {item.technicalNote}
            </p>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}

export function ProductHighlights({ items }: ProductHighlightsProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <SectionHeading
        label="Features"
        title="Product Highlights"
        subtitle="Every feature is built for the gym environment — one hand, between sets, low signal."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ProductHighlightCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
