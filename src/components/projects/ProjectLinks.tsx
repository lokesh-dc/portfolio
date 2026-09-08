import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

type ProjectLinksProps = {
  liveUrl?: string;
  githubUrl?: string;
};

export default function ProjectLinks({ liveUrl, githubUrl }: ProjectLinksProps) {
  const hasAny = Boolean(liveUrl || githubUrl);
  if (!hasAny) return null;

  return (
    <aside
      className="fixed bottom-6 right-6 z-40 hidden lg:block"
      aria-label="Project links"
    >
      <div className="rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md px-4 py-3 shadow-sm">
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          Links
        </p>
        <div className="flex flex-col gap-0.5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-stone-700 dark:text-stone-300 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-white/5"
            >
              <ExternalLink size={14} className="text-stone-400 dark:text-stone-500" />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-stone-700 dark:text-stone-300 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-white/5"
            >
              <GithubIcon className="h-[14px] w-[14px] text-stone-400 dark:text-stone-500" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}