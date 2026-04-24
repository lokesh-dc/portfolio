import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/lib/projects-details.json";

export default function ProjectsPage() {
  const projects = Object.entries(projectsData.projects);

  return (
    <main className="min-h-screen bg-[#F9F9F9] dark:bg-[#050505] text-stone-900 dark:text-stone-100 selection:bg-emerald-200 dark:selection:bg-emerald-900/50 pb-20">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-sans font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
            LC.
          </Link>
          <nav className="flex gap-6">
            <Link href="/projects" className="font-medium text-sm text-stone-900 dark:text-stone-100 transition-colors">
              Projects
            </Link>
            <Link href="/about" className="font-medium text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              About
            </Link>
          </nav>
        </div>
        <Link href="/" className="text-sm font-medium tracking-wide flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </header>

      {/* Grid Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 mt-12 md:mt-16">
        <h1 className="font-sans text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-stone-900 dark:text-white mb-12">
          Selected Work
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map(([slug, project]) => (
            <Link key={slug} href={`/projects/${slug}`} className="group block space-y-4">
              <div className="relative w-full aspect-[4/3] bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                  {project.role} • {project.year}
                </p>
                <h2 className="text-2xl font-sans font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                  {project.title}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
