import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import projectsData from "@/lib/projects-details.json";
import { BlockRenderer, Block } from "@/components/BlockRenderer";

export function generateStaticParams() {
  return Object.keys(projectsData.projects).map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (projectsData.projects as Record<string, any>)[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] dark:bg-[#050505] text-stone-900 dark:text-stone-100 selection:bg-emerald-200 dark:selection:bg-emerald-900/50 pb-32">
      
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
        <Link href="/projects" className="text-sm font-medium tracking-wide flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> All Projects
        </Link>
      </header>

      {/* Article Content */}
      <article className="w-full max-w-4xl mx-auto px-6 md:px-10 mt-12 md:mt-24 space-y-16">
        
        {/* Project Header */}
        <header className="space-y-6 border-b border-stone-200 dark:border-stone-800 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-stone-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
            {project.summary}
          </p>
        </header>

        {/* Dynamic Blocks */}
        <section>
          <BlockRenderer blocks={project.content as Block[]} />
        </section>

      </article>
    </main>
  );
}
