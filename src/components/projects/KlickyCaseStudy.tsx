import Link from "next/link";
import { ExternalLink } from "lucide-react";
import projectsV2Data from "@/lib/projects-v2.json";
import ProjectMenu, { ProjectSection } from "@/components/projects/ProjectMenu";
import SectionHeader from "@/components/projects/SectionHeader";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { cleanText, TitleLines } from "@/lib/text";
import Image from "next/image";

const project = projectsV2Data["klicky"] as unknown as Project;

const hasGallery = project.gallery.some(
  (item) => item.url !== project.hero.image && item.url !== project.solution.image
);

const sections: ProjectSection[] = [
  { id: "context", num: "01", label: "Context" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "solution", num: "03", label: "Solution" },
  { id: "features", num: "04", label: "Features" },
  { id: "engineering", num: "05", label: "Engineering" },
  { id: "performance", num: "06", label: "Performance" },
  { id: "roadmap", num: "07", label: "Roadmap" },
  ...(hasGallery
    ? [{ id: "gallery", num: "08", label: "Gallery" }]
    : []),
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
  hero: { image: string; alt: string };
  solution: { image: string };
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
  gallery: {
    url: string;
    alt: string;
    type: "screenshot" | "mockup" | "animation";
    device?: "phone" | "desktop" | "tablet";
  }[];
  techStack: { category: string; items: { name: string }[] }[];
};

export default function KlickyCaseStudy() {
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
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Platform</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.platform.join(" ")}</p>
            </div>
            <div className="bg-white dark:bg-[#0a0a0a] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Packs</p>
              <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{meta.users}</p>
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
              Try the demo
            </a>
          </div>

          <Image className="rounded-xl" alt={project.hero.alt} height={400} width={800} src={project.hero.image} />
        </header>

        {/* 01 Context */}
        <section id="context" className="scroll-mt-28">
          <SectionHeader num="01" label="Context" title="Why Klicky exists" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Klicky is a Web Audio experiment that plays real, sampled
              mechanical keyboard clicks on every keystroke. It grew out of a
              personal itch: wanting to hear what a switch actually sounds like
              before committing to a board you can only judge through a review
              video.
            </p>
            <p>
              Instead of building yet another toy, I made it consume the exact
              soundpack format the mechanical-keyboard community already ships
              through MechVibes. Five community packs, a 60+ key evdev mapping,
              and one tiny React hook later, any page can make every keystroke
              sound like a board you actually want to buy.
            </p>
          </div>
        </section>

        {/* 02 Problem */}
        <section id="problem" className="scroll-mt-28">
          <SectionHeader num="02" label="Problem" title="The challenge" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              You cannot feel a switch from a spec sheet, and video reviews
              flatten its character through whatever mic and room the creator
              had. The only honest way to judge a board is to hear real samples
              while you type.
            </p>
            <ul className="space-y-2 border-l-2 border-stone-200 dark:border-stone-800 pl-5">
              <li>Desktop soundpack tools require a download and a native app.</li>
              <li>Their config formats are opaque and community packs are rarely documented.</li>
              <li>Nothing on the web lets you try several keyboards before you commit.</li>
            </ul>
            <p className="text-base text-stone-500 dark:text-stone-500">
              The challenge: how might we bring real mechanical keyboard samples
              into the browser with zero install, and make the exact same
              community packs that work on desktop play correctly on the web?
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section id="solution" className="scroll-mt-28">
          <SectionHeader num="03" label="Solution" title="What we created" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Klicky loads real MechVibes-format soundpacks straight out of
              /public and plays them through the Web Audio API. No conversion,
              no server, no install.
            </p>
            <ul className="space-y-2.5">
              <li>
                A dual-format loader understands both single-sprite and
                multi-file pack layouts, so existing community packs just work.
              </li>
              <li>
                Every browser key event is mapped to the exact sample for that
                physical key, from backspace to the numpad.
              </li>
              <li>
                Audio is decoded once and cached, then played at
                sample-accurate latency through a single gain node.
              </li>
              <li>
                The whole feature is one useKeyboardSound() hook, so any page
                can adopt real keyboard sounds in four lines of code.
              </li>
            </ul>
            <p className="pt-2 text-lg font-normal text-stone-900 dark:text-white">
              The result is a demo you can type on, and a hook you can reuse.
            </p>
          </div>
          <div className="mt-10">
            <Image className="rounded-xl" alt="" height={400} width={800} src={project.solution.image} />
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

        {/* 08 Gallery */}
        <ProjectGallery
          num="08"
          label="Gallery"
          title="Screens from the demo"
          subtitle="A visual tour through the pack selector, the volume dial, and the copy-ready usage snippet."
          items={project.gallery}
          exclude={[project.hero.image, project.solution.image]}
        />

        {/* CTA */}
        <section className="rounded-3xl bg-stone-100 dark:bg-white/[0.04] border border-stone-200 dark:border-white/10 p-10 md:p-14 text-center scroll-mt-28">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
            Try typing on it
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md mx-auto">
            Open the demo, switch between five soundpacks, and hear the
            difference for yourself. Then grab the hook.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <ExternalLink size={16} />
              Try the demo
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
              href="/projects/hooked-on-movies"
              className="flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                HookedOnMovies
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
