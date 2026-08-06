import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";
import projectsV2Data from "@/lib/projects-v2.json";
import ProjectMenu, { ProjectSection } from "@/components/projects/ProjectMenu";
import ImagePlaceholder from "@/components/projects/ImagePlaceholder";
import SectionHeader from "@/components/projects/SectionHeader";
import { cleanText, TitleLines } from "@/lib/text";

const sections: ProjectSection[] = [
  { id: "context", num: "01", label: "Context" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "solution", num: "03", label: "Solution" },
  { id: "features", num: "04", label: "Features" },
  { id: "engineering", num: "05", label: "Engineering" },
  { id: "performance", num: "06", label: "Performance" },
  { id: "roadmap", num: "07", label: "Roadmap" },
];

type Project = {
  meta: {
    title: string;
    tagline: string;
    role: string;
    timeline: string;
    platform: string[];
    users: string;
    status: string;
  };
  links: { live: string; github: string };
  productHighlights: {
    title: string;
    description: string;
    technicalNote: string;
  }[];
  engineeringHighlights: {
    title: string;
    problem: string;
    solution: string;
    result: string;
  }[];
  architecture: { caption: string; layers: { label: string; description: string }[] };
  designDecisions: { decision: string; rationale: string }[];
  performance: { metric: string; value: string; sublabel: string }[];
  roadmap: { title: string; description: string; status: string }[];
  lessonsLearned: { lesson: string; whatWentWell: string; rebuild: string }[];
  techStack: { category: string; items: { name: string }[] }[];
};

const project = projectsV2Data["hooked-on-movies"] as unknown as Project;

export default function HookedOnMoviesCaseStudy() {
  const { meta, engineeringHighlights, architecture, designDecisions, performance, roadmap, lessonsLearned, techStack } = project;

  return (
    <div className="relative flex-1 w-full">
      <ProjectMenu sections={sections} />

      <article className="mx-auto w-full max-w-[760px] px-6 md:px-10 space-y-20 md:space-y-28 pb-32">
        {/* Hero */}
        <header className="pt-4 md:pt-10 space-y-10">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
              Live Project
            </p>
            <h1 className="font-sans text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-white">
              <TitleLines title={meta.title} />
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
              {cleanText(meta.tagline)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
            <div className="bg-white dark:bg-[#0a0a0a] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">My Role</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.role}</p>
            </div>
            <div className="bg-white dark:bg-[#0a0a0a] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Timeline</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.timeline}</p>
            </div>
            <div className="bg-white dark:bg-[#0a0a0a] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Data Source</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">TMDB API</p>
            </div>
            <div className="bg-white dark:bg-[#0a0a0a] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Status</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.status}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {techStack.map((group) =>
              group.items.map((item) => (
                <span
                  key={`${group.category}-${item.name}`}
                  className="rounded-full border border-stone-200 dark:border-stone-800 px-3 py-1 text-xs font-medium text-stone-600 dark:text-stone-400"
                >
                  {item.name}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <ExternalLink size={16} />
              View live app
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
            >
              <Github className="h-4 w-4" />
              Source code
            </a>
          </div>

          <ImagePlaceholder
            label="Add hero screenshot"
            hint="Drop the image at public/hookedonmovies/thumbnail.png"
          />
        </header>

        {/* 01 Context */}
        <section id="context" className="scroll-mt-28">
          <SectionHeader num="01" label="Context" title="Why HookedOnMovies exists" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              HookedOnMovies is a full-stack media discovery platform that
              turns TMDB&apos;s raw API data into a cinematic, streaming-grade
              experience. Trending carousels, rich detail pages, trailers, cast,
              and recommendations, all served at sub-second speeds.
            </p>
            <p>
              The product goal is a browsing loop: discover a title, watch a
              trailer, fall into a recommendation track. The engineering goal is
              to make that loop feel instant, from the first paint to the final
              recommendation.
            </p>
          </div>
        </section>

        {/* 02 Problem */}
        <section id="problem" className="scroll-mt-28">
          <SectionHeader num="02" label="Problem" title="The challenge" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Most movie discovery apps fetch from multiple endpoints, which
              produces inconsistent UI states and slow loading via waterfalls.
              TMDB compounds it by returning fundamentally different schemas for
              Movies versus TV Shows. A field called title on a movie is name on
              a show.
            </p>
            <ul className="space-y-2 border-l-2 border-stone-200 dark:border-stone-800 pl-5">
              <li>Runtime type errors from divergent schemas.</li>
              <li>Sequential fetches create 2 to 3 second skeleton screens.</li>
              <li>Users bounce before content ever loads.</li>
            </ul>
            <p className="text-base text-stone-500 dark:text-stone-500">
              The challenge: how might we reconcile two incompatible APIs into
              one fast, cinematic experience that never shows a loading spinner
              and never crashes on a TV title?
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section id="solution" className="scroll-mt-28">
          <SectionHeader num="03" label="Solution" title="What we created" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              I built a TypeScript normalization layer at the fetch boundary
              that maps both Movie and TV responses into a single shared
              interface before any component sees the data.
            </p>
            <ul className="space-y-2.5">
              <li>
                One interface powers every component, with zero null guards and
                zero conditional field access.
              </li>
              <li>
                Promise.all dispatches all independent TMDB calls in parallel
                from Server Components, cutting TTFB by over 60%.
              </li>
              <li>
                A split caching strategy keeps trending pages fresh while detail
                pages serve from the ISR edge cache in under 100ms.
              </li>
              <li>
                Every page gets dynamic Open Graph and structured metadata via
                generateMetadata.
              </li>
            </ul>
            <p className="pt-2 text-lg font-normal text-stone-900 dark:text-white">
              The result is a media experience that competes visually with
              commercial streaming platforms.
            </p>
          </div>
          <div className="mt-10">
            <ImagePlaceholder
              label="Add product screenshot"
              hint="public/hookedonmovies/details.png"
            />
          </div>
        </section>

        {/* 04 Features */}
        <section id="features" className="scroll-mt-28">
          <SectionHeader num="04" label="Features" title="Things that just work" />
          <div className="space-y-10">
            {project.productHighlights.map((feature, i) => (
              <div
                key={feature.title}
                className="border-t border-stone-200 dark:border-stone-800 pt-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    0{i + 1}
                  </span>
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {cleanText(feature.description)}
                </p>
                <p className="mt-4 rounded-xl bg-stone-50 dark:bg-white/[0.03] border-l-2 border-emerald-500 pl-4 py-3 text-sm text-stone-500 dark:text-stone-500">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Technical note.{" "}
                  </span>
                  {cleanText(feature.technicalNote)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Engineering */}
        <section id="engineering" className="scroll-mt-28">
          <SectionHeader
            num="05"
            label="Engineering"
            title="Decisions that carry the architecture"
          />
          <div className="space-y-12">
            {engineeringHighlights.map((item, i) => (
              <div
                key={item.title}
                className="border-t border-stone-200 dark:border-stone-800 pt-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    0{i + 1}
                  </span>
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 text-[15px] font-light leading-relaxed">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">Problem</p>
                    <p className="text-stone-600 dark:text-stone-400">{cleanText(item.problem)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">Approach</p>
                    <p className="text-stone-600 dark:text-stone-400">{cleanText(item.solution)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-1.5">Result</p>
                    <p className="text-stone-600 dark:text-stone-400">{cleanText(item.result)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-stone-200 dark:border-stone-800 p-7 md:p-9">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 mb-6">
              System Architecture
            </h3>
            <div className="space-y-6">
              {architecture.layers.map((layer) => (
                <div key={layer.label} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                  <p className="md:col-span-4 text-sm font-semibold text-stone-900 dark:text-white">
                    {layer.label}
                  </p>
                  <p className="md:col-span-8 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                    {cleanText(layer.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Design Decisions
            </h3>
            {designDecisions.map((d) => (
              <div
                key={d.decision}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-t border-stone-200 dark:border-stone-800 pt-5"
              >
                <p className="md:col-span-4 text-sm font-semibold text-stone-900 dark:text-white">
                  {d.decision}
                </p>
                <p className="md:col-span-8 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {cleanText(d.rationale)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <ImagePlaceholder
              ratio="aspect-[4/3]"
              label="Add architecture diagram"
              hint="Show the server-first flow and the normalization layer"
            />
          </div>
        </section>

        {/* 06 Performance */}
        <section id="performance" className="scroll-mt-28">
          <SectionHeader num="06" label="Performance" title="Speed by design" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
            {performance.map((m) => (
              <div key={m.metric} className="bg-white dark:bg-[#0a0a0a] p-6">
                <p className="font-sans text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                  {m.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">
                  {m.metric}
                </p>
                <p className="mt-1 text-xs font-light text-stone-500 dark:text-stone-500">
                  {cleanText(m.sublabel)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 Roadmap */}
        <section id="roadmap" className="scroll-mt-28">
          <SectionHeader num="07" label="Roadmap & Learnings" title="Where it goes next" />
          <div className="space-y-7">
            {roadmap.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 border-t border-stone-200 dark:border-stone-800 pt-7"
              >
                <div className="flex items-center gap-3">
                  <h3 className="font-sans text-lg font-semibold text-stone-900 dark:text-white">
                    {item.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                      item.status === "planned"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[15px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {cleanText(item.description)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
              Lessons Learned
            </h3>
            {lessonsLearned.map((l) => (
              <div
                key={cleanText(l.lesson)}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-7"
              >
                <p className="font-sans text-base font-semibold leading-snug text-stone-900 dark:text-white">
                  {cleanText(l.lesson)}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {cleanText(l.whatWentWell)}
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-500 dark:text-stone-500">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Rebuild:
                  </span>{" "}
                  {cleanText(l.rebuild)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-stone-100 dark:bg-white/[0.04] border border-stone-200 dark:border-white/10 p-10 md:p-14 text-center scroll-mt-28">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
            Check out the live app
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md mx-auto">
            Browse trending titles, open the source, or read the build story on
            GitHub.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <ExternalLink size={16} />
              View live app
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-900 dark:text-white hover:bg-white dark:hover:bg-stone-900 transition-colors"
            >
              <Github className="h-4 w-4" />
              Browse the source
            </a>
          </div>
        </section>

        {/* Other projects */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 mb-8">
            Other Projects
          </h2>
          <div className="space-y-2">
            <Link
              href="/projects/fitness-tracker"
              className="group flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                FitTrack Fitness Tracker
              </span>
              <ExternalLink className="h-5 w-5 shrink-0 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </Link>
            <Link
              href="/projects/portfolio-redesign"
              className="flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Conversational Developer Portfolio
              </span>
              <ExternalLink className="h-5 w-5 shrink-0 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}