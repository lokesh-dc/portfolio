"use client";

import { useChat } from "@/context/ChatContext";
import Link from "next/link";
import { Mail, FileText, Link2, ArrowRight } from "lucide-react";
import { aboutData, projectsData, workExperienceData } from "@/lib/data";

export default function Home() {
  const { openSidebar } = useChat();

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Hero */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight">
            Hi, I'm {aboutData.name.split(" ")[0]}.<br />
            <span className="text-stone-400 dark:text-stone-600 font-normal">
              {aboutData.title}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl font-light">
            {aboutData.bio}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <a href="#" className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              <FileText className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              <Link2 className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Mini Resume */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Experience preview */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6">
              Current Role
            </h3>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between group cursor-pointer">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                    {workExperienceData[0].role}
                  </p>
                  <p className="text-sm text-stone-500">{workExperienceData[0].company}</p>
                </div>
                <span className="text-sm text-stone-400 tabular-nums">
                  {workExperienceData[0].duration.split(" - ")[0]} — Present
                </span>
              </div>
            </div>
          </section>

          {/* Selected Projects */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6">
              Selected Work
            </h3>
            <div className="space-y-6">
              {projectsData.slice(0, 3).map((project, i) => (
                <Link key={project.slug || i} href={project.link || "#"} className="group block">
                  <p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </p>
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
            <button 
              onClick={openSidebar}
              className="mt-6 flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-emerald-600 transition-colors group"
            >
              Ask AI for more details 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
