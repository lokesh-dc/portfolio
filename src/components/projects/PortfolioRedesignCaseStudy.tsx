import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";
import projectsV2Data from "@/lib/projects-v2.json";
import ProjectMenu, { ProjectSection } from "@/components/projects/ProjectMenu";
import SectionHeader from "@/components/projects/SectionHeader";
import { cleanText, TitleLines } from "@/lib/text";

const project = projectsV2Data["portfolio-redesign"] as unknown as Project;

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
  hero: { image: string; alt: string };
  solution: { image: string };
  productHighlights: { title: string; description: string; technicalNote: string }[];
  roadmap: { title: string; description: string; status: string }[];
  techStack: { category: string; items: { name: string }[] }[];
};

const sections: ProjectSection[] = [
  { id: "context", num: "01", label: "Context" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "solution", num: "03", label: "Solution" },
  { id: "features", num: "04", label: "Features" },
  { id: "roadmap", num: "05", label: "Roadmap" },
];

export default function PortfolioRedesignCaseStudy() {
  const { meta, links, hero, solution, productHighlights, roadmap, techStack } = project;

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
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Platform</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.platform.join(" · ")}</p>
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
            <Link
              href={links.live}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <ArrowUpRight size={16} />
              Visit the live site
            </Link>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
            >
              <Github className="h-4 w-4" />
              Source code
            </a>
            <a
              href="mailto:lokesh.cdewanand@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
            >
              Get in touch
            </a>
          </div>

          <Image
            className="rounded-xl border border-stone-200 dark:border-stone-800"
            alt={hero.alt}
            height={896}
            width={1195}
            src={hero.image}
          />
        </header>

        {/* 01 Context */}
        <section id="context" className="scroll-mt-28">
          <SectionHeader num="01" label="Context" title="Why this project exists" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              This site is the portfolio, and the portfolio is the product. It
              is a command-driven experience built with the Next.js App Router
              and Framer Motion, designed to demonstrate the kind of interactive
              engineering a recruiter would actually want to see from a
              candidate.
            </p>
            <p>
              Traditional portfolios force visitors to navigate a predetermined
              structure. This one inverts that model. The visitor drives the
              conversation, typing intent instead of clicking through buried
              links.
            </p>
          </div>
        </section>

        {/* 02 Problem */}
        <section id="problem" className="scroll-mt-28">
          <SectionHeader num="02" label="Problem" title="The challenge" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Traditional portfolios are static and linear. They force
              recruiters to dig through buried links to find relevant
              information, and they rarely demonstrate the ability to build
              truly interactive, product-like experiences.
            </p>
            <ul className="space-y-2 border-l-2 border-stone-200 dark:border-stone-800 pl-5">
              <li>Infinite scroll resumes blur together in a crowded market.</li>
              <li>Relevant info is buried pages deep behind navigation.</li>
              <li>Nothing about the format proves you can ship real products.</li>
            </ul>
            <p className="text-base text-stone-500 dark:text-stone-500">
              The challenge: how might we make the portfolio itself the
              strongest demonstration of craft, so reviewing it feels like
              using a product instead of reading a document?
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section id="solution" className="scroll-mt-28">
          <SectionHeader num="03" label="Solution" title="What I created" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Instead of searching, visitors ask. A command palette and chat
              interface let recruiters and clients type what they want, and the
              site routes it to the right content.
            </p>
            <ul className="space-y-2.5">
              <li>
                Slash-command routing maps typed intent to projects, skills, and
                experience on demand.
              </li>
              <li>
                Framer Motion layout animations handle sub-second transitions
                between views.
              </li>
              <li>
                A server-rendered shell with client-side hydration keeps the
                first load fast with zero layout shift.
              </li>
              <li>
                All content is JSON-driven, decoupled from the UI so updates
                never touch components.
              </li>
            </ul>
            <p className="pt-2 text-lg font-normal text-stone-900 dark:text-white">
              The result is an interface that feels like a premium AI product
              rather than a developer resume.
            </p>
          </div>
          <div className="mt-10">
            <Image
              className="rounded-xl border border-stone-200 dark:border-stone-800"
              alt=""
              height={1846}
              width={2940}
              src={solution.image}
            />
          </div>
        </section>

        {/* 04 Features */}
        <section id="features" className="scroll-mt-28">
          <SectionHeader num="04" label="Features" title="Things that just work" />
          <div className="space-y-10">
            {productHighlights.map((feature, i) => (
              <div
                key={feature.title}
                className="border-t border-stone-200 dark:border-stone-800 pt-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    0{i + 1}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-stone-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-stone-600 dark:text-stone-400 font-light leading-relaxed md:pl-9">
                  {cleanText(feature.description)}
                </p>
                {feature.technicalNote && (
                  <p className="mt-3 text-sm text-stone-500 dark:text-stone-500 leading-relaxed md:pl-9">
                    {cleanText(feature.technicalNote)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 05 Roadmap */}
        <section id="roadmap" className="scroll-mt-28">
          <SectionHeader num="05" label="Roadmap" title="Where it goes next" />
          <div className="space-y-7">
            {roadmap.map((idea) => (
              <div
                key={idea.title}
                className="space-y-2 border-t border-stone-200 dark:border-stone-800 pt-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-sans text-lg font-semibold text-stone-900 dark:text-white">
                    {idea.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                    {idea.status}
                  </span>
                </div>
                <p className="text-[15px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {cleanText(idea.description)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-stone-100 dark:bg-white/[0.04] border border-stone-200 dark:border-white/10 p-10 md:p-14 text-center scroll-mt-28">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
            Try the experience
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md mx-auto">
            Type a question into the command palette on the live site and watch
            it route to projects, skills, and history.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={links.live}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <ArrowUpRight size={16} />
              Visit the live site
            </Link>
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
              <ArrowUpRight className="h-5 w-5 shrink-0 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </Link>
            <Link
              href="/projects/hooked-on-movies"
              className="flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                HookedOnMovies
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
