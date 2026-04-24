export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

export type Job = {
  company: string;
  role: string;
  duration: string;
  description: string[];
};

export type AboutInfo = {
  name: string;
  title: string;
  bio: string;
  skills: string[];
};

export const aboutData: AboutInfo = {
  name: "Lokesh Choudhary",
  title: "Full Stack Developer",
  bio: "I'm a passionate developer who loves building interactive, dynamic web applications with beautiful interfaces. My focus is on creating exceptional user experiences utilizing modern technologies.",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Framer Motion"],
};

export const workExperienceData: Job[] = [
  {
    company: "Tech Innovators Inc.",
    role: "Senior Frontend Engineer",
    duration: "Jan 2023 - Present",
    description: [
      "Led the migration of a legacy dashboard to Next.js, improving page load speeds by 40%.",
      "Mentored junior developers and established frontend best practices.",
      "Implemented complex UI animations using Framer Motion."
    ],
  },
  {
    company: "Creative Web Studio",
    role: "Full Stack Developer",
    duration: "Jun 2020 - Dec 2022",
    description: [
      "Developed end-to-end e-commerce solutions for a variety of clients.",
      "Integrated third-party APIs and payment gateways.",
      "Optimized applications for SEO and performance."
    ]
  }
];

export const projectsData: Project[] = [
  {
    title: "FitTrack Mobile",
    description: "A comprehensive fitness tracking React Native app with tailored workout plans and detailed analytics.",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand"],
    link: "#"
  },
  {
    title: "Claude-inspired Portfolio",
    description: "An interactive, chat-based personal portfolio built to mimic conversational AI interfaces.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
    link: "#"
  },
  {
    title: "E-commerce Headless Store",
    description: "A modern storefront using Shopify Storefront API and structured with Next.js App Router.",
    technologies: ["Next.js", "Shopify API", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "HookedOnMovies",
    description: "A high-performance, cinematic movie and TV series discovery platform built with Next.js and TMDB API.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "TMDB API"],
    link: "#"
  }
];
