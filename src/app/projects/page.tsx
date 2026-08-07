"use client";

import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  const projects = projectsData;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 mt-12 md:mt-20 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="font-sans text-5xl md:text-7xl font-semibold leading-tight tracking-tight text-stone-900 dark:text-white mb-6">
          Selected Work
        </h1>
        <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl font-light leading-relaxed">
          A collection of projects focused on performance, architectural integrity, and high-impact user experiences.
        </p>
      </motion.div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={item}>
            <Link 
              href={`/projects/${project.slug}`} 
              className="group block space-y-6"
              data-cursor-text="View Project"
            >
              <div className="relative w-full aspect-[16/10] bg-stone-100 dark:bg-stone-900 overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/20">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <div className="absolute top-6 right-6 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-stone-900 dark:text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                    {project.year}
                  </span>
                  <span className="w-4 h-[1px] bg-stone-300 dark:bg-stone-700" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
                    {project.role}
                  </span>
                </div>
                <h2 className="text-3xl font-sans font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors tracking-tight">
                  {project.title}
                </h2>
                <p className="text-lg text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.slice(0, 5).map((tech: string) => (
                    <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 font-bold uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
