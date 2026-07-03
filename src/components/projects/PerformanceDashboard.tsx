"use client";

import { MetricCard } from "@/components/shared/MetricCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface PerformanceDashboardProps {
  metrics: { metric: string; value: string; sublabel?: string }[];
}

export function PerformanceDashboard({ metrics }: PerformanceDashboardProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <SectionHeading
        label="Performance"
        title="By the Numbers"
        subtitle="Every engineering decision was measured against real-world impact."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <MetricCard
            key={m.metric}
            metric={m.metric}
            value={m.value}
            sublabel={m.sublabel}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
