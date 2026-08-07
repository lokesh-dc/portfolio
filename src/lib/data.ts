import portfolioData from "./portfolio-data.json";
import projectsV2Data from "./projects-v2.json";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  detailImage: string;
  link?: string;
  slug?: string;
  problem?: string;
  solution?: string;
  year?: string;
  role?: string;
};

export type Job = {
  company: string;
  role: string;
  duration: string;
  description: string[];
  link?: string;
};

export type AboutInfo = {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  longBio: string[];
  hobbies: string[];
  socialImages: { url: string; alt: string }[];
};

// Export typed data from unified JSON source
export const aboutData: AboutInfo = {
  name: portfolioData.personal.name,
  title: portfolioData.personal.title,
  bio: portfolioData.personal.bio,
  skills: portfolioData.personal.skills,
  longBio: portfolioData.personal.longBio,
  hobbies: portfolioData.personal.hobbies,
  socialImages: portfolioData.personal.socialImages,
};

export const workExperienceData: Job[] = portfolioData.experience.map(job => ({
  company: job.company,
  role: job.role,
  duration: job.year,
  description: job.description,
  link: job.link
}));

export type ProjectListing = Project & { thumbnail: string };

function v2ToListing(slug: string, project: any): ProjectListing {
  const technologies = (project.techStack ?? []).flatMap(
    (group: { items: { name: string }[] }) => group.items.map((item) => item.name)
  );
  return {
    slug,
    title: (project.meta?.title ?? "").replace(/<br\s*\/?>/gi, " "),
    description: project.meta?.tagline ?? "",
    technologies,
    detailImage: project.solution?.image || project.hero?.image || "",
    thumbnail: project.hero?.image || "",
    link: `/projects/${slug}`,
    problem: project.problem?.body,
    solution: project.solution?.body,
    year: project.meta?.year,
    role: project.meta?.role,
  };
}

export const projectsData: ProjectListing[] = Object.entries(projectsV2Data).map(
  ([slug, project]: [string, any]) => v2ToListing(slug, project)
);
