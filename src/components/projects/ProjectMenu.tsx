"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "context", num: "01", label: "Context" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "solution", num: "03", label: "Solution" },
  { id: "features", num: "04", label: "Features" },
  { id: "engineering", num: "05", label: "Engineering" },
  { id: "performance", num: "06", label: "Performance" },
  { id: "roadmap", num: "07", label: "Roadmap" },
];

export default function ProjectMenu() {
  const [active, setActive] = useState("context");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
      aria-label="Project sections"
    >
      <div className="rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md px-4 py-3 shadow-sm">
        <ul className="flex flex-col gap-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-baseline gap-2 rounded-lg px-2 py-1 text-[13px] transition-colors ${
                    isActive
                      ? "text-stone-900 dark:text-white"
                      : "text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold tabular-nums ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-stone-300 dark:text-stone-600"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`${
                      isActive ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}