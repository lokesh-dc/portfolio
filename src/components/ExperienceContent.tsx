"use client";

import Image from "next/image";
import { motion, useReducedMotion, MotionProps } from "motion/react";
import { workExperienceData } from "@/lib/data";
import portfolioData from "@/lib/portfolio-data.json";
import { ArrowUpRight } from "lucide-react";

const impactStats = [
  { value: "5x", label: "Organic traffic growth", sub: "5K to 25K daily visitors" },
  { value: "40%", label: "Faster page loads", sub: ".NET to Next.js migration" },
  { value: "90+", label: "PageSpeed score", sub: "Up from 50 on mobile" },
  { value: "20%", label: "Lead conversions", sub: "8% baseline, CMS-driven pages" },
];

const performanceChips = [
  "3M+ quarterly users",
  "25K daily visitors",
  "20% lead conversion",
  "30% lower ad spend",
];

export default function ExperienceContent() {
  const { education } = portfolioData;
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0): MotionProps => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  });

  return (
    <div className="flex-1 w-full">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        {/* Hero */}
        <header className="pt-4 md:pt-10 pb-14 md:pb-20">
          <motion.div {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                Career
              </span>
              <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
            </div>
          </motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="font-sans text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-white"
          >
            Professional Journey
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400"
          >
            A record of shipping performance-first engineering: platform
            migrations, Core Web Vitals optimization, and SEO systems that
            scaled organic traffic 5x.
          </motion.p>
        </header>

        {/* Impact metrics */}
        <motion.section
          {...fadeUp(0.05)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800"
        >
          {impactStats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8">
              <p className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-stone-900 dark:text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-xs font-light text-stone-500 dark:text-stone-500">
                {stat.sub}
              </p>
            </div>
          ))}
        </motion.section>

        {/* Experience */}
        <section className="pt-16 md:pt-24">
          <div className="space-y-16 md:space-y-24">
            {workExperienceData.map((job, index) => (
              <motion.article
                key={index}
                {...fadeUp(0.05 * index)}
                className="border-t border-stone-200 dark:border-stone-800 pt-10"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-mono text-stone-400 dark:text-stone-500">
                        {job.duration}
                      </span>
                    </div>
                    <h2 className="mt-2 font-sans text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                      {job.role}
                    </h2>
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-2 inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium hover:underline underline-offset-4"
                      >
                        {job.company}
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ) : (
                      <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-medium">
                        {job.company}
                      </p>
                    )}
                  </div>
                </div>

                <ul className="mt-7 space-y-3.5 max-w-[720px]">
                  {job.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[15px] md:text-base font-light leading-relaxed text-stone-600 dark:text-stone-400"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-emerald-500/70 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {index === 0 && (
                  <div className="mt-10">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-6">
                      Marketing performance
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                      <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40">
                        <div className="relative aspect-[16/9]">
                          <Image
                            src="/experience/performance.webp"
                            alt="Marketing performance dashboard showing traffic growth and Core Web Vitals improvements at HexaHealth"
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-4 flex flex-col justify-center gap-3">
                        {performanceChips.map((chip) => (
                          <div
                            key={chip}
                            className="flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-white/[0.03] px-5 py-4"
                          >
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                            <p className="text-sm font-medium text-stone-900 dark:text-white">
                              {chip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* Education + Availability */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-16 md:pt-24 pb-24">
          <motion.div {...fadeUp(0)} className="md:col-span-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                Education
              </span>
              <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={i} className="border-t border-stone-200 dark:border-stone-800 pt-6">
                  <p className="text-sm font-mono text-stone-400 dark:text-stone-500">
                    {edu.year}
                  </p>
                  <h4 className="mt-1.5 font-sans text-xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                    {edu.school}
                  </h4>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="md:col-span-6">
            <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-white/[0.03] p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                    Availability
                  </span>
                  <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
                </div>
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                  Open to new opportunities
                </h3>
                <p className="mt-4 text-[15px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  Based in Gurgaon, India. Open to remote roles or hybrid
                  positions in high-growth product teams, and available for
                  freelance performance and SEO work.
                </p>
              </div>
              <a
                href="mailto:lokesh.cdewanand@gmail.com"
                className="group mt-8 inline-flex w-max items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
