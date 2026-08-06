import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";
import projectsV2Data from "@/lib/projects-v2.json";
import ProjectMenu from "@/components/projects/ProjectMenu";
import ImagePlaceholder from "@/components/projects/ImagePlaceholder";

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

const project = projectsV2Data["fitness-tracker"] as unknown as Project;

function SectionHeader({
  num,
  label,
  title,
}: {
  num: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-4">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-sans text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {num}
        </span>
        <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
          {label}
        </span>
      </div>
      <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
        {title}
      </h2>
    </div>
  );
}

export default function FitTrackCaseStudy() {
  const { meta, engineeringHighlights, architecture, designDecisions, performance, roadmap, lessonsLearned, techStack } = project;

  return (
    <div className="relative flex-1 w-full">
      <ProjectMenu />

      <article className="mx-auto w-full max-w-[760px] px-6 md:px-10 space-y-20 md:space-y-28 pb-32">
        {/* Hero */}
        <header className="pt-4 md:pt-10 space-y-10">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
              Case Study
            </p>
            <h1 className="font-sans text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-white">
              {meta.title}
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
              {meta.tagline}
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
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Users</p>
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
            hint="Drop the image at public/fitness-tracker/hero-desktop.png"
          />
        </header>

        {/* 01 Context */}
        <section id="context" className="scroll-mt-28">
          <SectionHeader num="01" label="Context" title="Why FitTrack exists" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              FitTrack is a performance-first PWA for people who train with
              intent. It replaces the spreadsheets, notes apps, and
              fifteen-tap trackers that serious lifters fall back on, with three
              purpose-built logging modes, a live session engine, and a
              consistency heatmap that spans a full year.
            </p>
            <p>
              Every interaction is engineered for the gym floor: one hand,
              between sets, often on weak Wi-Fi. Rest timers survive app
              switches. PR checks resolve without a scan. Warm-ups generate in
              a single tap and can never be saved by accident.
            </p>
          </div>
        </section>

        {/* 02 Problem */}
        <section id="problem" className="scroll-mt-28">
          <SectionHeader num="02" label="Problem" title="The challenge" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Most fitness apps are built for step counters and casual joggers.
              Anyone training seriously ends up hacking together spreadsheets,
              Notes lists, or apps that demand fifteen taps to log a single set.
            </p>
            <ul className="space-y-2 border-l-2 border-stone-200 dark:border-stone-800 pl-5">
              <li>Rest timers reset the moment you switch apps.</li>
              <li>PR history is buried pages deep in old sessions.</li>
              <li>
                Warm-up schemes are a mental calculation you do on your own.
              </li>
            </ul>
            <p className="text-base text-stone-500 dark:text-stone-500">
              The challenge: how might we build a companion that keeps up with a
              lifter mid-session, one hand, between sets, on weak gym Wi-Fi,
              without ever losing a timer, a PR, or a streak?
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section id="solution" className="scroll-mt-28">
          <SectionHeader num="03" label="Solution" title="What we created" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              FitTrack strips away everything a lifter does not need and
              optimizes every interaction for the gym environment.
            </p>
            <ul className="space-y-2.5">
              <li>
                Three logging modes share a single state machine, so Live,
                Manual, and Plan sessions stay consistent.
              </li>
              <li>
                Rest timers keep running across app switches and alert from the
                background.
              </li>
              <li>
                PR detection resolves in O(1) against a materialized collection,
                so there is never a scan and never a wait.
              </li>
              <li>
                Warm-ups compute client-side in one tap and are excluded from
                persistence at the type level.
              </li>
              <li>
                The app is server-rendered end to end, so pages load in under a
                second even in a signal-free basement.
              </li>
            </ul>
            <p className="pt-2 text-lg font-normal text-stone-900 dark:text-white">
              The result is the tool I wish had existed when I first started
              lifting.
            </p>
          </div>
          <div className="mt-10">
            <ImagePlaceholder
              label="Add product screenshot"
              hint="public/fitness-tracker/details.png"
            />
          </div>
        </section>

        {/* 04 Features */}
        <section id="features" className="scroll-mt-28">
          <SectionHeader num="04" label="Features" title="Things that just work" />
          <div className="space-y-10">
            {[
              {
                title: "Live Workout Mode",
                description:
                  "Start a session, log your sets, and watch your volume build in real time. A set takes two taps during your rest period.",
                technicalNote:
                  "All three logging modes share a single useSessionStats hook, deriving volume, set count, and time remaining from one state machine.",
              },
              {
                title: "Smart Rest Timer",
                description:
                  "Starts automatically after every completed set, with custom durations per exercise, and keeps running even when you switch apps.",
                technicalNote:
                  "Built on a useRef-based interval to avoid stale closures, with background alerts via the Web Notifications API.",
              },
              {
                title: "PR Detection Engine",
                description:
                  "Flags a new personal record, heavier weight or more reps at your max, the instant you complete a set.",
                technicalNote:
                  "O(1) lookups against a materialized ExerciseRecords collection using atomic $max and $set operations.",
              },
              {
                title: "Progress Timeline",
                description:
                  "Per-exercise charts for max weight, estimated one-rep max, and total volume over time.",
                technicalNote:
                  "The Epley 1RM is computed only in Server Actions, and time range filters apply client-side after a single fetch.",
              },
              {
                title: "Consistency Heatmap",
                description:
                  "A GitHub-style 52-week grid showing every training day at a glance, with streaks that keep you showing up.",
                technicalNote:
                  "Computed server-side from WorkoutLog timestamps, with sticky day labels and auto-scroll to the current week.",
              },
              {
                title: "Warm-up Set Generator",
                description:
                  "Enter a working weight and get a rep and percentage based scheme in a single tap.",
                technicalNote:
                  "Runs entirely client-side with zero database calls, and the type system makes it impossible to persist warm-up sets.",
              },
              {
                title: "Plan Designer & Adherence",
                description:
                  "Design multi-week training plans and see exactly how consistently you follow them.",
                technicalNote:
                  "Plans match completed sessions by date rather than foreign key, and adherence is completed over scheduled sessions per week.",
              },
            ].map((feature, i) => (
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
                  {feature.description}
                </p>
                <p className="mt-4 rounded-xl bg-stone-50 dark:bg-white/[0.03] border-l-2 border-emerald-500 pl-4 py-3 text-sm text-stone-500 dark:text-stone-500">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Technical note.{" "}
                  </span>
                  {feature.technicalNote}
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
                    <p className="text-stone-600 dark:text-stone-400">{item.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">Approach</p>
                    <p className="text-stone-600 dark:text-stone-400">{item.solution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-1.5">Result</p>
                    <p className="text-stone-600 dark:text-stone-400">{item.result}</p>
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
                    {layer.description}
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
                  {d.rationale}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <ImagePlaceholder
              ratio="aspect-[4/3]"
              label="Add architecture diagram"
              hint="Show the server-first data flow and the four MongoDB collections"
            />
          </div>
        </section>

        {/* 06 Performance */}
        <section id="performance" className="scroll-mt-28">
          <SectionHeader num="06" label="Performance" title="Speed by design" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800">
            {performance.map((m) => (
              <div
                key={m.metric}
                className="bg-white dark:bg-[#0a0a0a] p-6"
              >
                <p className="font-sans text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                  {m.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">
                  {m.metric}
                </p>
                <p className="mt-1 text-xs font-light text-stone-500 dark:text-stone-500">
                  {m.sublabel}
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
                  {item.description}
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
                key={l.lesson}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-7"
              >
                <p className="font-sans text-base font-semibold leading-snug text-stone-900 dark:text-white">
                  {l.lesson}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {l.whatWentWell}
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-500 dark:text-stone-500">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                    Rebuild:
                  </span>{" "}
                  {l.rebuild}
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
            Try a live session, browse the source, or read the build story on
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
              href="/projects/portfolio-redesign"
              className="group flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Conversational Developer Portfolio
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
          </div>
        </section>
      </article>
    </div>
  );
}