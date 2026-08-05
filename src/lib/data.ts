import portfolioData from "./portfolio-data.json";

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
};

// Export typed data from unified JSON source
export const aboutData: AboutInfo = {
  name: portfolioData.personal.name,
  title: portfolioData.personal.title,
  bio: portfolioData.personal.bio,
  skills: portfolioData.personal.skills,
};

export const workExperienceData: Job[] = portfolioData.experience.map(job => ({
  company: job.company,
  role: job.role,
  duration: job.year,
  description: job.description,
  link: job.link
}));

export const projectsData: Project[] = Object.entries(portfolioData.projects).map(([slug, project]: [string, any]) => ({
  title: project.title,
  description: project.description,
  technologies: project.technologies,
  detailImage: project.detailImage,
  year: project.year,
  role: project.role,
  link: `/projects/${slug}`,
  slug: slug
}));
