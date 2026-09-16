import portfolioData from "./portfolio-data.json";
import projectsV2Data from "./projects-v2.json";

export type CommandGroup =
  | "Navigate"
  | "Projects"
  | "Skills"
  | "Experience"
  | "Contact";

export type PaletteCommand = {
  id: string;
  /** Slash trigger, e.g. "/projects". Undefined for plain search entries. */
  slash?: string;
  title: string;
  subtitle?: string;
  keywords: string[];
  group: CommandGroup;
  /** Internal route to navigate to. */
  href?: string;
  /** External URL (mailto / https). */
  external?: string;
  /** Question to hand off to the AI chat sidebar. */
  ask?: string;
};

function cleanTitle(title: string): string {
  return title.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
}

function buildCommands(): PaletteCommand[] {
  const commands: PaletteCommand[] = [
    {
      id: "nav-home",
      slash: "/home",
      title: "Go home",
      subtitle: "Back to the hero",
      keywords: ["home", "landing", "start", "hero"],
      group: "Navigate",
      href: "/",
    },
    {
      id: "nav-projects",
      slash: "/projects",
      title: "Browse all projects",
      subtitle: "Selected work gallery",
      keywords: ["projects", "work", "portfolio", "case studies", "apps"],
      group: "Navigate",
      href: "/projects",
    },
    {
      id: "nav-experience",
      slash: "/experience",
      title: "View work experience",
      subtitle: "HexaHealth · Senior Software Engineer",
      keywords: ["experience", "work", "job", "career", "hexahealth", "history"],
      group: "Navigate",
      href: "/experience",
    },
    {
      id: "nav-about",
      slash: "/about",
      title: "About Lokesh",
      subtitle: "Bio, services, background",
      keywords: ["about", "bio", "background", "profile", "who"],
      group: "Navigate",
      href: "/about",
    },
    {
      id: "nav-skills",
      slash: "/skills",
      title: "Browse skills & stack",
      subtitle: portfolioData.personal.skills.slice(0, 5).join(" · "),
      keywords: ["skills", "stack", "tech", "technologies", "tools"],
      group: "Navigate",
      href: "/about",
    },
    {
      id: "nav-contact",
      slash: "/contact",
      title: "Get in touch",
      subtitle: "lokesh.cdewanand@gmail.com",
      keywords: ["contact", "email", "hire", "touch", "reach"],
      group: "Contact",
      external: "mailto:lokesh.cdewanand@gmail.com",
    },
  ];

  // Projects — derived from the same JSON the pages render from,
  // so adding a project to projects-v2.json adds a palette entry
  // without touching any router logic.
  for (const [slug, raw] of Object.entries(projectsV2Data)) {
    const v2 = raw as {
      meta?: { title?: string; tagline?: string; role?: string };
      techStack?: { items: { name: string }[] }[];
    };
    const title = cleanTitle(v2.meta?.title ?? slug);
    const stack: string[] = (v2.techStack ?? []).flatMap((g) =>
      g.items.map((i) => i.name)
    );
    commands.push({
      id: `project-${slug}`,
      slash: `/project-${slug}`,
      title,
      subtitle: v2.meta?.tagline ?? v2.meta?.role ?? "Case study",
      keywords: [slug, title, v2.meta?.tagline ?? "", ...stack].join(" ").toLowerCase().split(/\s+/),
      group: "Projects",
      href: `/projects/${slug}`,
    });
  }

  // Skills — each routes to the AI with a grounded question.
  for (const skill of portfolioData.personal.skills) {
    const id = `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    commands.push({
      id,
      title: skill,
      subtitle: "Ask the AI about this skill",
      keywords: ["skill", skill.toLowerCase()],
      group: "Skills",
      ask: `What is Lokesh's experience with ${skill}?`,
    });
  }

  // Experience entries.
  for (const job of portfolioData.experience) {
    commands.push({
      id: `exp-${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      slash: "/experience",
      title: `${job.role} at ${job.company}`,
      subtitle: job.year,
      keywords: ["experience", "job", job.company.toLowerCase(), job.role.toLowerCase()],
      group: "Experience",
      href: "/experience",
    });
  }

  commands.push(
    {
      id: "contact-github",
      slash: "/github",
      title: "Open GitHub",
      subtitle: "github.com/lokesh-dc",
      keywords: ["github", "code", "repos", "open source"],
      group: "Contact",
      external: "https://github.com/lokesh-dc",
    },
    {
      id: "contact-linkedin",
      slash: "/linkedin",
      title: "Open LinkedIn",
      subtitle: "Connect professionally",
      keywords: ["linkedin", "connect", "network", "profile"],
      group: "Contact",
      external: "https://www.linkedin.com/in/choudhary-lokesh",
    }
  );

  return commands;
}

/** Single source of truth — the palette reads the same JSON as the UI. */
export const COMMANDS: PaletteCommand[] = buildCommands();

/** Slash triggers shown when the query starts with "/". */
export const SLASH_COMMANDS: PaletteCommand[] = COMMANDS.filter((c) => c.slash);

const normalize = (s: string) => s.toLowerCase().trim();

export function matchCommands(query: string, limit = 9): PaletteCommand[] {
  const q = normalize(query);
  if (!q) return COMMANDS.slice(0, limit);

  // Slash mode: match against the trigger itself.
  if (q.startsWith("/")) {
    const needle = q.slice(1);
    return COMMANDS.filter(
      (c) =>
        c.slash?.slice(1).startsWith(needle) ||
        normalize(c.title).includes(needle)
    ).slice(0, limit);
  }

  const tokens = q.split(/\s+/);
  const scored: { cmd: PaletteCommand; score: number }[] = [];

  for (const cmd of COMMANDS) {
    const hay = normalize(`${cmd.title} ${cmd.subtitle ?? ""} ${cmd.keywords.join(" ")}`);
    let score = 0;
    for (const t of tokens) {
      if (!t) continue;
      if (normalize(cmd.title).startsWith(t)) score += 3;
      else if (normalize(cmd.title).includes(t)) score += 2;
      else if (hay.includes(t)) score += 1;
      else {
        score = -1;
        break;
      }
    }
    if (score > 0) scored.push({ cmd, score });
  }

  // De-dupe slash aliases (e.g. two experience entries share /experience).
  const seen = new Set<string>();
  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.cmd)
    .filter((c) => {
      const key = `${c.title}|${c.href ?? c.ask ?? c.external ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
