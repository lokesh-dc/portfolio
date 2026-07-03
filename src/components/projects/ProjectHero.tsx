"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";

interface ProjectHeroProps {
  title: string;
  tagline: string;
  image: string;
  alt: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectHero({ title, tagline, image, alt, liveUrl, githubUrl }: ProjectHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 md:pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-100/50 dark:via-stone-950/50 to-white dark:to-stone-950 z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20  mx-auto space-y-8"
      >
        <div className="relative h-[500px] mx-auto">
          <div className="absolute inset-0 bg-linear-to-b from-emerald-500/10 dark:from-emerald-500/20 to-transparent rounded-[3rem] blur-3xl" />
          <div className="relative w-full h-full rounded-md border-stone-300 dark:border-stone-800 overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-linear-to-t from-white/60 dark:from-stone-950/60 via-transparent to-transparent" /> */}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-colors"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Github className="w-[18px] h-[18px]" />
              Source Code
            </a>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 rounded-full border border-stone-400 dark:border-stone-700 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-stone-400 dark:bg-stone-500 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
