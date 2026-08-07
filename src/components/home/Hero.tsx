"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useChat } from "@/context/ChatContext";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { openSidebar } = useChat();
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center px-4 pt-14 md:pt-20 pb-16 overflow-hidden">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease }}
        className="z-10 max-w-[850px] w-full flex flex-col items-center text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white dark:text-stone-900">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
          </span>
          Available for projects
        </span>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="mt-8 text-[2.75rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.03em] leading-[1.08] text-stone-900 dark:text-white"
        >
          <span className="block">Lokesh Choudhary</span>
          <span className="block">
            Senior Software{" "}
            <span className="font-[family-name:var(--font-caveat)] text-emerald-600 dark:text-emerald-400 text-[1.05em] font-semibold -rotate-6 -ml-1 inline-block pb-2">
              Engineer
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease }}
          className="mt-6 max-w-[60ch] text-base md:text-lg font-medium leading-relaxed text-stone-500 dark:text-stone-400"
        >
          I build high-performance web applications. I led Next.js migrations
          that cut load times by 40% and grew organic traffic 5x.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#selected-work"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-white px-8 py-3.5 text-sm font-bold text-white dark:text-stone-900 transition-transform hover:-translate-y-0.5 shadow-lg"
          >
            View work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            onClick={openSidebar}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm border border-stone-200 dark:border-stone-700 px-8 py-3.5 text-sm font-bold text-stone-700 dark:text-stone-200 transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4 text-emerald-500" aria-hidden />
            Ask my AI
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
        className="relative z-10 mt-14 md:mt-16 w-full max-w-[1040px]"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_70%)] blur-2xl"
        />

        <div className="relative overflow-hidden rounded-[24px] border border-stone-200/80 dark:border-stone-800 bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.25)]">
          <Image
            src="/fitness-tracker/hero-desktop.png"
            alt="FitTrack fitness tracker app interface"
            width={2080}
            height={1170}
            priority
            sizes="(min-width: 1024px) 1040px, 100vw"
            className="w-full h-auto"
          />
        </div>

        <div
          className={`hidden lg:flex absolute -top-5 -left-6 items-center gap-2.5 rounded-full bg-white/95 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/70 dark:border-stone-700/70 px-4 py-2.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.6)] ${
            reduce ? "" : "animate-float-slow"
          }`}
        >
          <span className="flex -space-x-2">
            <span className="h-6 w-6 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
            <span className="h-6 w-6 rounded-full bg-emerald-400 border-2 border-white dark:border-stone-900" />
            <span className="h-6 w-6 rounded-full bg-emerald-300 border-2 border-white dark:border-stone-900" />
          </span>
          <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
            3M+ monthly users
          </span>
        </div>

        <div
          className={`hidden lg:flex absolute -bottom-6 -left-8 flex-col gap-1 rounded-[20px] bg-white/95 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/70 dark:border-stone-700/70 px-5 py-4 w-[210px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.6)] ${
            reduce ? "" : "animate-float-fast"
          }`}
        >
          <span className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            40%
          </span>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            Load time cut
          </span>
        </div>

        <div
          className={`hidden lg:flex absolute -top-6 -right-4 items-center rounded-full bg-white/95 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/70 dark:border-stone-700/70 px-4 py-2.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.6)] ${
            reduce ? "" : "animate-float-delayed"
          }`}
        >
          <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
            Next.js + React + TypeScript
          </span>
        </div>
      </motion.div>
    </section>
  );
}
