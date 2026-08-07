import { notFound } from "next/navigation";
import portfolioData from "@/lib/portfolio-data.json";
import projectsV2Data from "@/lib/projects-v2.json";
import { BlockRenderer, Block } from "@/components/BlockRenderer";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";
import FitTrackCaseStudy from "@/components/projects/FitTrackCaseStudy";
import HookedOnMoviesCaseStudy from "@/components/projects/HookedOnMoviesCaseStudy";
import PortfolioRedesignCaseStudy from "@/components/projects/PortfolioRedesignCaseStudy";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { QuickFactsBar } from "@/components/projects/QuickFactsBar";
import { ProblemSolution } from "@/components/projects/ProblemSolution";
import { ProductHighlights } from "@/components/projects/ProductHighlights";
import { PerformanceDashboard } from "@/components/projects/PerformanceDashboard";
import { ArchitectureSection } from "@/components/projects/ArchitectureSection";
import { EngineeringHighlights } from "@/components/projects/EngineeringHighlights";
import { TechnicalChallenges } from "@/components/projects/TechnicalChallenges";
import { DesignDecisions } from "@/components/projects/DesignDecisions";
import { Gallery } from "@/components/projects/Gallery";
import { Roadmap } from "@/components/projects/Roadmap";
import { LessonsLearned } from "@/components/projects/LessonsLearned";
import { TechStackGrid } from "@/components/projects/TechStackGrid";

export async function generateStaticParams() {
  const slugs = new Set<string>();
  Object.keys(portfolioData.projects).forEach((s) => slugs.add(s));
  Object.keys(projectsV2Data).forEach((s) => slugs.add(s));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const caseStudies: Record<string, React.ReactNode> = {
    "fitness-tracker": <FitTrackCaseStudy />,
    "hooked-on-movies": <HookedOnMoviesCaseStudy />,
    "portfolio-redesign": <PortfolioRedesignCaseStudy />,
  };
  if (caseStudies[slug]) {
    return caseStudies[slug];
  }

  const v2Project = (projectsV2Data as Record<string, any>)[slug];
  const legacyProject = (portfolioData.projects as Record<string, any>)[slug];

  if (!v2Project && !legacyProject) {
    notFound();
  }

  if (v2Project) {
    return <ProjectV2Page project={v2Project} />;
  }

  return <LegacyProjectPage project={legacyProject} />;
}

function ProjectV2Page({ project }: { project: any }) {
  return (
    <div className="relative">
      <div className="mesh-gradient" />
      <div className="relative z-10 space-y-24 md:space-y-32 pb-32">
        <ProjectHero
          title={project.meta.title}
          tagline={project.meta.tagline}
          image={project.hero.image}
          alt={project.hero.alt}
          liveUrl={project.links.live}
          githubUrl={project.links.github}
        />

        {/* <QuickFactsBar facts={project.quickFacts} /> */}

        <ProblemSolution
          problem={project.problem}
          solution={project.solution}
        />

        <ProductHighlights items={project.productHighlights} />

        <PerformanceDashboard metrics={project.performance} />

        <ArchitectureSection
          caption={project.architecture.caption}
          layers={project.architecture.layers}
        />

        <EngineeringHighlights items={project.engineeringHighlights} />

        <TechnicalChallenges items={project.technicalChallenges} />

        <DesignDecisions items={project.designDecisions} />

        <Gallery items={project.gallery} />

        <Roadmap items={project.roadmap} />

        <LessonsLearned items={project.lessonsLearned} />

        <TechStackGrid groups={project.techStack} />
      </div>
    </div>
  );
}

function LegacyProjectPage({ project }: { project: any }) {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-10 mt-12 md:mt-24 space-y-24 pb-32">
      <article className="space-y-24">
        <header className="space-y-10 border-b border-stone-200 dark:border-stone-800 pb-16">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.technologies?.slice(0, 3).map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 rounded-full border border-stone-200 dark:border-stone-800">
                  {tag}
                </span>
              ))}
              {project.year && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 ml-2">
                  {project.year}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-stone-900 dark:text-white leading-[1.05]">
              {project.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="md:col-span-2 space-y-6">
              <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                    <Github className="w-5 h-5" />
                    Source Code
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-xl font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                    <ExternalLink size={20} />
                    Live Site
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6 pt-2 md:pt-0">
              {project.role && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-2">Role</h4>
                  <p className="text-stone-900 dark:text-stone-100 font-medium">{project.role}</p>
                </div>
              )}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-2">Stack</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="text-stone-600 dark:text-stone-400 text-sm">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {(project.problem || project.solution) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {project.problem && (
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">The Challenge</h2>
                <p className="text-xl text-stone-900 dark:text-stone-100 font-light leading-relaxed italic border-l-2 border-stone-200 dark:border-stone-800 pl-6">
                  &ldquo;{project.problem}&rdquo;
                </p>
              </div>
            )}
            {project.solution && (
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">The Solution</h2>
                <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </section>
        )}

        <section className="space-y-24">
          <BlockRenderer blocks={(project.content || []) as Block[]} />
        </section>

        {project.features && (
          <section className="space-y-16">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Deep Dive</p>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-stone-900 dark:text-white tracking-tight">Core Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.features.map((feature: any, idx: number) => {
                const isObject = typeof feature === "object";
                return (
                  <div key={idx} className="group p-10 rounded-[2.5rem] bg-white dark:bg-stone-900/30 border border-stone-100 dark:border-stone-800/50 hover:border-emerald-500/50 transition-all duration-500">
                    {isObject && feature.icon && <span className="text-3xl mb-6 block transform group-hover:scale-110 transition-transform duration-500">{feature.icon}</span>}
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                      {isObject ? feature.title : feature}
                    </h3>
                    {isObject && (
                      <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {project.upcomingIdeas && (
          <section className="space-y-12 bg-stone-50 dark:bg-stone-900/30 p-10 md:p-16 rounded-[3rem] border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-3xl font-sans font-bold text-stone-900 dark:text-white">Roadmap</h2>
            </div>
            <div className="grid grid-cols-1 gap-12">
              {project.upcomingIdeas.map((idea: any, idx: number) => (
                <div key={idx} className="space-y-5">
                  <div className="flex items-center gap-4">
                    {idea.icon && <span className="text-2xl">{idea.icon}</span>}
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white">{idea.title}</h3>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">{idea.description}</p>
                  {idea.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {idea.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-stone-200/50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
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
