import { notFound } from "next/navigation";
import portfolioData from "@/lib/portfolio-data.json";
import { BlockRenderer, Block } from "@/components/BlockRenderer";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";

export async function generateStaticParams() {
  return Object.keys(portfolioData.projects).map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (portfolioData.projects as Record<string, any>)[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-10 mt-12 md:mt-24 space-y-16 pb-32">
      {/* Article Content */}
      <article className="space-y-16">
        {/* Project Header */}
        <header className="space-y-6 border-b border-stone-200 dark:border-stone-800 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            {project.technologies?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 rounded-full border border-stone-200 dark:border-stone-800">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-stone-900 dark:text-white leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-xl font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Dynamic Blocks */}
        <section>
          <BlockRenderer blocks={(project.content || []) as Block[]} />
        </section>

        {/* Features Grid */}
        {project.features && (
          <section className="space-y-12">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Core Features</p>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">Built for Performance</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature: any, idx: number) => {
                const isObject = typeof feature === "object";
                return (
                  <div key={idx} className="group p-8 rounded-3xl bg-white dark:bg-stone-900/30 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 transition-colors">
                    {isObject && feature.icon && <span className="text-2xl mb-4 block">{feature.icon}</span>}
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3">
                      {isObject ? feature.title : feature}
                    </h3>
                    {isObject && (
                      <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Roadmap */}
        {project.upcomingIdeas && (
          <section className="space-y-12 bg-stone-50 dark:bg-stone-900/30 p-8 md:p-12 rounded-[2rem] border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-2xl font-sans font-bold text-stone-900 dark:text-white">Roadmap</h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {project.upcomingIdeas.map((idea: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    {idea.icon && <span className="text-xl">{idea.icon}</span>}
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">{idea.title}</h3>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">{idea.description}</p>
                  {idea.tags && (
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 text-xs rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
