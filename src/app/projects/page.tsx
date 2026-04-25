import Link from "next/link";
import Image from "next/image";
import portfolioData from "@/lib/portfolio-data.json";

export default function ProjectsPage() {
  const projects = Object.entries(portfolioData.projects);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 mt-12 md:mt-16 pb-20">
      <h1 className="font-sans text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-stone-900 dark:text-white mb-12">
        Selected Work
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {projects.map(([slug, project]: [string, any]) => (
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
              <p className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-500 mb-2">
                {project.role} • {project.year}
              </p>
              <h2 className="text-2xl font-sans font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                {project.title}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
