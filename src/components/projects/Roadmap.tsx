"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Sparkles, MessageSquare, WifiOff, Watch } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  "message-square": MessageSquare,
  "wifi-off": WifiOff,
  watch: Watch,
};

interface RoadmapItem {
  title: string;
  description: string;
  status: "shipped" | "planned" | "exploring";
  icon?: string;
}

interface RoadmapProps {
  items: RoadmapItem[];
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    shipped: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    planned: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    exploring: "bg-stone-100 dark:bg-stone-500/10 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-500/20",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors[status] || colors.exploring}`}>
      {status}
    </span>
  );
}

export function Roadmap({ items }: RoadmapProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <SectionHeading
        label="Future"
        title="Roadmap"
        subtitle="What's next for FitTrack — from AI-powered features to wearables."
      />
      <div className="space-y-4">
        {items.map((item, i) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="bg-white/80 dark:bg-stone-900/30 backdrop-blur-xl border border-stone-200 dark:border-stone-800/50 rounded-xl p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800/50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-stone-500 dark:text-stone-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-base font-bold text-stone-900 dark:text-white">
                      {item.title}
                    </h3>
                    <StatusPill status={item.status} />
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 font-light mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
