import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "@/components/SocialIcons";
import projectsV2Data from "@/lib/projects-v2.json";
import ProjectMenu, { ProjectSection } from "@/components/projects/ProjectMenu";
import ProjectLinks from "@/components/projects/ProjectLinks";
import SectionHeader from "@/components/projects/SectionHeader";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { cleanText, TitleLines } from "@/lib/text";
import Image from "next/image";

const project = projectsV2Data["mindrop"] as unknown as Project;

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
  ...(hasGallery ? [{ id: "gallery", num: "08", label: "Gallery" } as ProjectSection] : []),
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
  links: { live?: string; github?: string };
  hero: { image: string; alt: string };
  solution: { image: string };
  productHighlights: {
    title: string;
    description: string;
    benefit: string;
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

export default function MindropCaseStudy() {
  const {
    meta,
    engineeringHighlights,
    architecture,
    designDecisions,
    performance,
    roadmap,
    lessonsLearned,
    techStack,
  } = project;

  return (
    <div className="relative flex-1 w-full">
      <ProjectMenu sections={sections} />
      <ProjectLinks liveUrl={project.links.live} githubUrl={project.links.github} />

      <article className="mx-auto w-full max-w-[760px] px-6 md:px-10 space-y-20 md:space-y-28 pb-32">
        {/* Hero */}
        <header className="pt-4 md:pt-10 space-y-10">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" aria-hidden />
              In Development — Private Beta
            </p>
            <h1 className="font-sans text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-white">
              <TitleLines title={meta.title} />
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
              {cleanText(meta.tagline)}
            </p>
            <p className="text-sm leading-relaxed text-amber-700/80 dark:text-amber-300/70 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-4 py-3">
              Mindrop is in private beta — capture → classify → embed → hybrid search is live behind auth. Screenshots below are placeholders — they’ll be replaced with real captures as the build stabilizes.
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
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Status</p>
              <p className="mt-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">{meta.users}</p>
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
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
            >
              <Github className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-paper">
            <Image
              className="w-full h-auto object-cover"
              alt={project.hero.alt}
              height={600}
              width={1200}
              src={project.hero.image}
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/70 to-transparent p-4 md:p-6">
              <p className="text-xs md:text-sm font-medium text-white/90">
                Paper #faf9f7 · Ink #1a1a1a · Brand #7F77DD — the journal, rebuilt for the web.
              </p>
            </div>
          </div>
        </header>

        {/* 01 Context */}
        <section id="context" className="scroll-mt-28">
          <SectionHeader num="01" label="Context" title="Why Mindrop exists" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Mindrop is a second brain for the web — Next.js 16 App Router, Tailwind v4, Framer Motion, and Supabase
              with <code className="rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 text-sm">@supabase/ssr</code>, with every AI call running server-side.
            </p>
            <p>
              The thesis is simple: memory shouldn&apos;t require a filing system. You drop one line — “spent ₹240 at Third Wave”,
              “idea: weekend trip to Coorg”, “finished Atomic Habits” — and the app figures out the rest. Capture is the habit;
              retrieval is the payoff.
            </p>
          </div>
        </section>

        {/* 02 Problem */}
        <section id="problem" className="scroll-mt-28">
          <SectionHeader num="02" label="Problem" title="The challenge" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Most life-logging tools make you choose a category, folder, or tag before you type. That friction kills the habit.
              Expenses live in one app, ideas in another, books in a third — and when you finally ask “what did I spend on food
              in April?” you&apos;re grep-ing your own brain.
            </p>
            <ul className="space-y-2 border-l-2 border-stone-200 dark:border-stone-800 pl-5">
              <li>Single-fact inputs are easy; mixed lists (“groceries + electronics”) collapse into one noisy entry.</li>
              <li>Vector search finds paraphrases but misses exact filters; SQL finds filters but misses semantics.</li>
              <li>Schema and RPC need to be designed to keep structured filters and vector similarity in lockstep.</li>
              <li>API keys must never reach the browser — all inference stays server-side.</li>
            </ul>
            <p className="text-base text-stone-500 dark:text-stone-500">
              The challenge: how might we let people type first and structure later, with AI that earns its keep — splitting
              multi-fact inputs, linking entities, embedding at the right dim, and fusing two ranked lists into one truth?
            </p>
          </div>
        </section>

        {/* 03 Solution */}
        <section id="solution" className="scroll-mt-28">
          <SectionHeader num="03" label="Solution" title="What we created" />
          <div className="space-y-5 text-[17px] font-light leading-relaxed text-stone-600 dark:text-stone-400">
            <p>
              Mindrop keeps one input bar and pushes all structure to the server. Raw text hits a Server Action, Groq
              <code className="mx-1 rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 text-sm">gpt-oss-20b</code>
              splits it into typed items, Gemini
              <code className="mx-1 rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 text-sm">gemini-embedding-2</code>
              embeds each <code className="rounded bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 text-sm">embedding_doc</code> as 3072 dims in pgvector, and an entity graph links books, brands, and places.
            </p>
            <ul className="space-y-2.5">
              <li>Ask in plain English — “what did I read this week?” or “total food spend last month” — and the query parser rewrites intent + extracts filters before any search runs.</li>
              <li>Vector (cosine &gt; 0.5, top 20) and structured (ilike + time range) results are fused with Reciprocal Rank Fusion, K=60, then sliced to 10.</li>
              <li>Sum/count/list are precomputed from fused entries; Groq then narrates a 2–3 sentence answer grounded in those entries.</li>
              <li>Daily/weekly/monthly digests aggregate via SQL, narrate via Groq, and cache 24h in a digests table — warm, not robotic.</li>
            </ul>
            <p className="pt-2 text-lg font-normal text-stone-900 dark:text-white">
              The result is not a dashboard. It&apos;s a journal that answers back.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
            <Image className="w-full h-auto" alt="Mindrop solution — capture to retrieval loop" height={600} width={1200} src={project.solution.image} />
          </div>
        </section>

        {/* 04 Features */}
        <section id="features" className="scroll-mt-28">
          <SectionHeader num="04" label="Features" title="Things that just work" />
          <div className="space-y-10">
            {project.productHighlights.map((feature, i) => (
              <div key={feature.title} className="border-t border-stone-200 dark:border-stone-800 pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-sm font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                    0{i + 1}
                  </span>
                  <h3 className="font-sans text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {cleanText(feature.description)}
                </p>
                <p className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border-l-2 border-amber-500 pl-4 py-3 text-sm text-stone-600 dark:text-stone-400">
                  <span className="font-semibold text-stone-900 dark:text-white">Benefit. </span>
                  {cleanText(feature.benefit)}
                </p>
                <p className="mt-4 rounded-xl bg-stone-50 dark:bg-white/[0.03] border-l-2 border-emerald-500 pl-4 py-3 text-sm text-stone-500 dark:text-stone-500">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">How it works. </span>
                  {cleanText(feature.technicalNote)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Engineering */}
        <section id="engineering" className="scroll-mt-28">
          <SectionHeader num="05" label="Engineering" title="Decisions that carry the architecture" />
          <div className="space-y-12">
            {engineeringHighlights.map((item, i) => (
              <div key={item.title} className="border-t border-stone-200 dark:border-stone-800 pt-8">
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 mb-6">System Architecture</h3>
            <p className="text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400 mb-6">{cleanText(architecture.caption)}</p>
            <div className="space-y-6">
              {architecture.layers.map((layer) => (
                <div key={layer.label} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                  <p className="md:col-span-4 text-sm font-semibold text-stone-900 dark:text-white">{layer.label}</p>
                  <p className="md:col-span-8 text-sm font-light leading-relaxed text-stone-600 dark:text-stone-400">
                    {cleanText(layer.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">Design Decisions</h3>
            {designDecisions.map((d) => (
              <div
                key={d.decision}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-t border-stone-200 dark:border-stone-800 pt-5"
              >
                <p className="md:col-span-4 text-sm font-semibold text-stone-900 dark:text-white">{d.decision}</p>
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
                <p className="mt-1.5 text-sm font-medium text-stone-900 dark:text-white">{m.metric}</p>
                <p className="mt-1 text-xs font-light text-stone-500 dark:text-stone-500">{cleanText(m.sublabel)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 Roadmap */}
        <section id="roadmap" className="scroll-mt-28">
          <SectionHeader num="07" label="Roadmap & Learnings" title="Where it goes next" />
          <div className="space-y-7">
            {roadmap.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 border-t border-stone-200 dark:border-stone-800 pt-7">
                <div className="flex items-center gap-3">
                  <h3 className="font-sans text-lg font-semibold text-stone-900 dark:text-white">{item.title}</h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                      item.status === "planned"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">Lessons Learned</h3>
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
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Rebuild: </span>
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
          title="Screens from the build (placeholders)"
          subtitle="These will be replaced with real captures — feed grouped by day, one-box input, Ask Mind answer, Insights digest, onboarding, and category picker. The placeholders keep layout honest while the build stabilizes."
          items={project.gallery}
          exclude={[project.hero.image, project.solution.image]}
        />

        {/* CTA */}
        <section className="rounded-3xl bg-amber-50 dark:bg-amber-500/[0.06] border border-amber-200 dark:border-amber-500/20 p-10 md:p-14 text-center scroll-mt-28">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
            Follow the build
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md mx-auto">
            Mindrop is in private beta — hybrid search is live and digests cache for 24h.
            Track progress on GitHub. A public demo with seeded data is next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
            >
              <Github className="h-4 w-4" />
              Follow on GitHub
            </a>
          </div>
        </section>

        {/* Other projects */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 mb-8">Other Projects</h2>
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
              href="/projects/klicky"
              className="flex items-baseline justify-between gap-6 border-t border-stone-200 dark:border-stone-800 py-6"
            >
              <span className="font-sans text-xl md:text-2xl font-semibold tracking-[-0.02em] text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Klicky — Real Keyboards, Zero Hardware
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
