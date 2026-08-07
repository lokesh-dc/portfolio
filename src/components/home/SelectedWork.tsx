"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Dumbbell, MessageSquare, Clapperboard } from "lucide-react";
import { projectsData } from "@/lib/data";
import type { Project } from "@/lib/data";

const rowIcons = [Dumbbell, MessageSquare, Clapperboard];
const rowGlows = [
  "from-emerald-100/70 to-emerald-50/40",
  "from-emerald-50/80 to-teal-50/40",
  "from-emerald-100/50 to-stone-100/40",
];

const ease = [0.16, 1, 0.3, 1] as const;

function RowContent({
  project,
  index,
  reverse,
}: {
  project: Project;
  index: number;
  reverse: boolean;
}) {
  const Icon = rowIcons[index] ?? rowIcons[0];

  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}>
      <div className="w-full lg:max-w-[480px] shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
            <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden />
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              {project.year}
            </span>
            <span className="h-px w-4 bg-stone-300 dark:bg-stone-700" aria-hidden />
            <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              {project.role}
            </span>
          </div>
        </div>

        <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] md:text-base font-medium leading-relaxed text-stone-500 dark:text-stone-400">
          {project.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 px-3.5 py-1.5 text-[11px] font-bold text-stone-600 dark:text-stone-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={project.link || "#"}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-5 py-2.5 text-[13px] font-bold text-stone-700 dark:text-stone-200 shadow-sm transition-all hover:gap-3 hover:border-emerald-500/50"
          data-cursor-text="View Project"
        >
          View Live Project
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-emerald-600 dark:text-emerald-400"
            aria-hidden
          />
        </Link>
      </div>

      <div className="w-full lg:flex-1 relative">
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${rowGlows[index] ?? rowGlows[0]} blur-2xl opacity-60 scale-95`}
        />
        <div className="relative rounded-[24px] overflow-hidden border border-stone-200/70 dark:border-stone-800 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
          <Image
            src={project.detailImage}
            alt={project.title}
            width={1040}
            height={650}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

function FullWidthRow({ project, index }: { project: Project; index: number }) {
  const Icon = rowIcons[index] ?? rowIcons[0];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full max-w-[560px]">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 shadow-sm mx-auto">
          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] md:text-base font-medium leading-relaxed text-stone-500 dark:text-stone-400">
          {project.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 px-3.5 py-1.5 text-[11px] font-bold text-stone-600 dark:text-stone-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={project.link || "#"}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-5 py-2.5 text-[13px] font-bold text-stone-700 dark:text-stone-200 shadow-sm transition-all hover:gap-3 hover:border-emerald-500/50"
          data-cursor-text="View Project"
        >
          View Live Project
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-emerald-600 dark:text-emerald-400"
            aria-hidden
          />
        </Link>
      </div>

      <div className="w-full mt-10 relative">
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${rowGlows[index] ?? rowGlows[0]} blur-2xl opacity-60 scale-95`}
        />
        <div className="relative rounded-[24px] overflow-hidden border border-stone-200/70 dark:border-stone-800 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
          <Image
            src={project.detailImage}
            alt={project.title}
            width={1040}
            height={650}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const reduce = useReducedMotion();
  const projects = projectsData.slice(0, 3);
  const [feature, ...rest] = projects;

  return (
    <section
      id="selected-work"
      className="max-w-6xl mx-auto px-6 py-24 md:py-28 scroll-mt-24"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-[2.5rem] md:text-[3.2rem] font-extrabold tracking-[-0.03em] text-stone-900 dark:text-white">
          Selected work
        </h2>
        <p className="mt-4 text-[15px] md:text-base font-medium leading-relaxed text-stone-500 dark:text-stone-400">
          Three projects picked for what they show about performance and
          architecture.
        </p>
      </motion.div>

      <div className="mt-16 md:mt-24 flex flex-col gap-20 md:gap-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
        >
          <RowContent project={feature} index={0} reverse={false} />
        </motion.div>

        {rest.map((project, i) => {
          const isLast = i === rest.length - 1;
          return (
            <motion.div
              key={project.slug || project.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              {isLast ? (
                <FullWidthRow project={project} index={i + 1} />
              ) : (
                <RowContent project={project} index={i + 1} reverse={i % 2 === 0} />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
