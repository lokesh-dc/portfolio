export interface ProjectV2 {
  slug: string;
  meta: {
    title: string;
    tagline: string;
    role: string;
    timeline: string;
    platform: string[];
    users: string;
    status: "live" | "beta" | "wip" | "archived";
    year: string;
  };
  hero: {
    image: string;
    video?: string;
    mockupType: "phone" | "desktop" | "both";
    alt: string;
  };
  links: {
    live?: string;
    github?: string;
  };
  quickFacts: { label: string; value: string }[];
  problem: {
    headline: string;
    body: string;
  };
  solution: {
    headline: string;
    body: string;
    image?: string;
  };
  productHighlights: {
    id: string;
    title: string;
    description: string;
    image: string;
    gif?: string;
    benefit: string;
    technicalNote: string;
  }[];
  engineeringHighlights: {
    id: string;
    title: string;
    problem: string;
    solution: string;
    result: string;
  }[];
  architecture: {
    caption: string;
    layers: { label: string; description: string }[];
  };
  technicalChallenges: {
    id: string;
    challenge: string;
    difficulty: string;
    solution: string;
    outcome: string;
  }[];
  performance: { metric: string; value: string; sublabel?: string }[];
  designDecisions: {
    decision: string;
    problem: string;
    rationale: string;
  }[];
  gallery: {
    url: string;
    alt: string;
    type: "screenshot" | "mockup" | "animation";
    device?: "phone" | "desktop" | "tablet";
    width?: number;
    height?: number;
  }[];
  roadmap: {
    title: string;
    description: string;
    status: "shipped" | "planned" | "exploring";
    icon?: string;
  }[];
  lessonsLearned: {
    lesson: string;
    whatWentWell: string;
    rebuild: string;
  }[];
  techStack: {
    category: string;
    items: { name: string }[];
  }[];
}
