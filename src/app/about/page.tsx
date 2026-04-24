import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import aboutDetails from "@/lib/about-details.json";

export default function AboutPage() {
  const { about, experience, education } = aboutDetails;

  return (
    <main className="min-h-screen bg-[#F9F9F9] dark:bg-[#050505] text-stone-900 dark:text-stone-100 selection:bg-emerald-200 dark:selection:bg-emerald-900/50 pb-20">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-sans font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
            LC.
          </Link>
          <nav className="flex gap-6">
            <Link href="/projects" className="font-medium text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Projects
            </Link>
            <Link href="/about" className="font-medium text-sm text-stone-900 dark:text-stone-100 transition-colors">
              About
            </Link>
          </nav>
        </div>
        <Link href="/" className="text-sm font-medium tracking-wide flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </header>

      {/* Hero Content */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-10 mt-12 md:mt-24 space-y-32">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <h1 className="font-sans text-4xl md:text-5xl leading-tight tracking-tight text-stone-900 dark:text-white">
              {about.heroStatement}
            </h1>
          </div>
          <div className="space-y-6 pt-2">
            {about.longBio.map((paragraph, i) => (
              <p key={i} className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-lg">
                {paragraph}
              </p>
            ))}
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
                When I'm not coding
              </h3>
              <ul className="space-y-1">
                {about.hobbies.map((hobby, i) => (
                  <li key={i} className="text-stone-700 dark:text-stone-300 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                    {hobby}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Experience & Education Tables */}
        <section className="space-y-20">
          <div>
            <h2 className="font-sans text-3xl mb-12 border-b border-stone-200 dark:border-stone-800 pb-4">Experience</h2>
            <div className="space-y-6 md:space-y-4">
              {experience.map((job, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline group hover:opacity-100 opacity-90 transition-opacity">
                  <div className="sm:col-span-2 text-stone-400 dark:text-stone-500 text-sm font-mono tracking-tight">
                    {job.year}
                  </div>
                  <div className="sm:col-span-4">
                    {job.link !== "#" ? (
                      <a href={job.link} target="_blank" rel="noopener noreferrer" className="font-medium text-stone-900 dark:text-white hover:underline underline-offset-4 decoration-stone-300 dark:decoration-stone-600 transition-all">
                        {job.company}
                      </a>
                    ) : (
                      <span className="font-medium text-stone-900 dark:text-white">{job.company}</span>
                    )}
                  </div>
                  <div className="sm:col-span-6 text-stone-500 dark:text-stone-400 text-sm sm:text-base">
                    {job.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-sans text-3xl mb-12 border-b border-stone-200 dark:border-stone-800 pb-4">Education</h2>
            <div className="space-y-6 md:space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline group hover:opacity-100 opacity-90 transition-opacity">
                  <div className="sm:col-span-2 text-stone-400 dark:text-stone-500 text-sm font-mono tracking-tight">
                    {edu.year}
                  </div>
                  <div className="sm:col-span-4 font-medium text-stone-900 dark:text-white">
                    {edu.school}
                  </div>
                  <div className="sm:col-span-6 text-stone-500 dark:text-stone-400 text-sm sm:text-base">
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Diary */}
        <section>
          <h2 className="font-sans text-3xl mb-12">Visual Diary</h2>
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar">
            {about.socialImages.map((img, i) => (
              <div key={i} className="flex-none w-64 h-64 sm:w-80 sm:h-80 relative snap-center bg-stone-200 dark:bg-stone-800">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
