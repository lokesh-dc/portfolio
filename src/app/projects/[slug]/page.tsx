import { notFound } from "next/navigation";
import projectsV2Data from "@/lib/projects-v2.json";
import FitTrackCaseStudy from "@/components/projects/FitTrackCaseStudy";
import HookedOnMoviesCaseStudy from "@/components/projects/HookedOnMoviesCaseStudy";
import PortfolioRedesignCaseStudy from "@/components/projects/PortfolioRedesignCaseStudy";
import KlickyCaseStudy from "@/components/projects/KlickyCaseStudy";
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
  return Object.keys(projectsV2Data).map((slug) => ({ slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const caseStudies: Record<string, React.ReactNode> = {
    "fitness-tracker": <FitTrackCaseStudy />,
    "hooked-on-movies": <HookedOnMoviesCaseStudy />,
    "portfolio-redesign": <PortfolioRedesignCaseStudy />,
    "klicky": <KlickyCaseStudy />,
  };
  if (caseStudies[slug]) {
    return caseStudies[slug];
  }

  const v2Project = (projectsV2Data as Record<string, any>)[slug];

  if (!v2Project) {
    notFound();
  }

  return <ProjectV2Page project={v2Project} />;
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
