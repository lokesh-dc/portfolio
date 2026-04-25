"use client";

import { motion, Variants } from "framer-motion";
import { workExperienceData } from "@/lib/data";
import { ExternalLink, Briefcase, Calendar, MapPin } from "lucide-react";
import portfolioData from "@/lib/portfolio-data.json";

export default function ExperienceContent() {
  const { education } = portfolioData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-white mb-6">
          Professional <span className="text-stone-500 dark:text-stone-400">Journey</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light max-w-2xl leading-relaxed">
          A timeline of my professional experience, spanning senior frontend roles, full-stack development, and performance optimization at scale.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Experience Timeline */}
        <div className="lg:col-span-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-10 flex items-center gap-2">
            <Briefcase size={16} /> Work Experience
          </h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 md:space-y-20 relative"
          >
            {/* Vertical Line */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-stone-200 dark:bg-stone-800 hidden md:block" />

            {workExperienceData.map((job, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-emerald-500 hidden md:block shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#0a0a0a]" />

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline cursor-pointer">
                          {job.company}
                        </span>
                        {portfolioData.experience[index].link && (
                          <a 
                            href={portfolioData.experience[index].link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900/50 px-3 py-1 rounded-full w-fit">
                      <Calendar size={14} />
                      {job.duration}
                    </div>
                  </div>

                  <ul className="space-y-4 mt-4">
                    {job.description.map((point, i) => (
                      <li key={i} className="flex gap-3 text-stone-600 dark:text-stone-400 leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education & Other Info */}
        <div className="lg:col-span-4 space-y-16">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-8 flex items-center gap-2">
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={i} className="group">
                  <p className="text-stone-500 dark:text-stone-500 text-sm font-mono mb-1">{edu.year}</p>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                    {edu.school}
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {edu.degree}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-500" />
              Availability
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Currently based in Gurgaon, India. Open to remote opportunities or hybrid roles in high-growth product teams.
            </p>
            <a 
              href="mailto:lokesh.cdewanand@gmail.com"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
