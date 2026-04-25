import { notFound } from "next/navigation";
import portfolioData from "@/lib/portfolio-data.json";
import { BlockRenderer, Block } from "@/components/BlockRenderer";

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
              <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-stone-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Dynamic Blocks */}
        <section>
          <BlockRenderer blocks={(project.content || []) as Block[]} />
        </section>
      </article>
    </div>
  );
}
