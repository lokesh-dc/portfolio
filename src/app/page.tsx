"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, FileText, Link2, Mail } from "lucide-react";
import ChatSidebar from "@/components/ChatSidebar";
import { aboutData, projectsData, workExperienceData } from "@/lib/data";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-[#050505] text-stone-900 dark:text-stone-100 selection:bg-emerald-200 dark:selection:bg-emerald-900/50">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <h1 className="font-sans font-bold text-xl tracking-tight">LC.</h1>
          <nav className="flex gap-6">
            <Link href="/projects" className="font-medium text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Projects
            </Link>
            <Link href="/about" className="font-medium text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        {/* Toggle Button for the AI Assistant */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 group px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-[#fafafa] dark:bg-[#111] hover:bg-stone-100 dark:hover:bg-[#1a1a1a] transition-all shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
          <span className="text-sm font-medium tracking-wide">Ask AI</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Hero */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-sans text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight">
              Hi, I'm {aboutData.name.split(" ")[0]}.<br />
              <span className="text-stone-400 dark:text-stone-600 italic font-normal">
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
                {projectsData.slice(0, 2).map((project, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                      {project.title}
                    </p>
                    <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setSidebarOpen(true)}
                className="mt-6 flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-emerald-600 transition-colors group"
              >
                Ask AI for more details 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* The Sidebar AI */}
      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </main>
  );
}
