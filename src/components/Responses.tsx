import Link from "next/link";
import { aboutData, projectsData, workExperienceData } from "@/lib/data";
import { Link2, ExternalLink, ArrowRight } from "lucide-react";

export function AboutResponse() {
  return (
    <div className="space-y-4 text-stone-700 dark:text-stone-300">
      <p className="text-xl font-semibold text-stone-900 dark:text-white">
        Hi there! I'm {aboutData.name}. 👋
      </p>
      <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium">
        {aboutData.title}
      </p>
      <p className="leading-relaxed">{aboutData.bio}</p>
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
        <p className="font-medium mb-3 text-stone-900 dark:text-stone-100">
          Core Technologies:
        </p>
        <div className="flex flex-wrap gap-2">
          {aboutData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg border border-stone-200 dark:border-stone-700 font-medium tracking-wide"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceResponse() {
  return (
    <div className="space-y-6">
      <p className="text-stone-800 dark:text-stone-200 font-medium mb-4">
        Here is a brief overview of my recent work experience:
      </p>
      <div className="space-y-8">
        {workExperienceData.map((job, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 border-l border-stone-300 dark:border-stone-700">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#0a0a0a]" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {job.role}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 mb-3 text-sm text-stone-600 dark:text-stone-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {job.company}
              </span>
              <span>{job.duration}</span>
            </div>
            <ul className="space-y-2 text-stone-700 dark:text-stone-300 list-disc list-inside marker:text-stone-400">
              {job.description.map((desc, i) => (
                <li key={i} className="leading-relaxed">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsResponse() {
  return (
    <div className="space-y-6">
      <p className="text-stone-800 dark:text-stone-200 font-medium">
        I've worked on a variety of projects. Here are a few notable ones:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, idx) => (
          <div
            key={idx}
            className="group block p-5 rounded-2xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              {project.link && project.link.startsWith("/") ? (
                <Link href={project.link} className="text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <ArrowRight size={18} />
                </Link>
              ) : project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noreferrer" className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <p className="text-stone-700 dark:text-stone-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
