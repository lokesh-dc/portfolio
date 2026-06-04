# Project Overview: Senior Developer Portfolio

A high-performance, minimalist portfolio built with **Next.js 15 (App Router)** and **TypeScript**. This project inverts the traditional portfolio model by replacing infinite scrolling with a contextual AI-driven interface and a command-palette-style UX.

## 🚀 Tech Stack

### Frontend & Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) (Using modern utility-first principles)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Layout transitions, entrance animations, custom cursor)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode support)

### Architecture & Tools
- **State Management:** React Context API (\`ChatContext\`)
- **Content:** Decoupled JSON-driven architecture (\`portfolio-data.json\`)
- **Dynamic Rendering:** Custom \`BlockRenderer\` for structured content
- **Fonts:** Geist Sans & Geist Mono (Next.js font optimization)

---

## 🎨 Design Philosophy

### Aesthetic & UI
- **Minimalist "Product" Feel:** Focus on high-signal content, whitespace, and readability.
- **Glassmorphism:** Subtle use of \`backdrop-blur\` and translucent borders in the \`ChatSidebar\` and \`CustomCursor\`.
- **Mesh Gradients:** Dynamic background gradients for visual depth without performance cost.
- **Micro-interactions:** Staggered entrance animations for all main sections and hover states that interact with the custom cursor.

### UX Patterns
- **Conversational Interface:** An "Interactive Agent" available via a global sidebar, allowing visitors to ask questions about the developer's experience, skills, and projects.
- **Custom Cursor:** A context-aware cursor that expands and displays text (e.g., "View Project") when hovering over interactive elements.
- **Responsive-First:** Fully optimized for mobile with a dedicated \`MobileNav\` and adaptive layouts.

### Color Palette
- **Light Mode:** \`bg-white\`, \`text-stone-900\`, Accent: \`emerald-600\`
- **Dark Mode:** \`bg-[#0a0a0a]\`, \`text-stone-100\`, Accent: \`emerald-400\`
- **Surface:** \`stone-50\` (Light) / \`stone-900\` (Dark) for cards and secondary sections.

---

## ✨ Key Features

### 1. Interactive AI Assistant
- **Global Access:** Triggered from the hero section or sidebar.
- **Contextual Responses:** Built to handle queries about the developer's experience, skills, and projects.
- **Persistent State:** Managed via \`ChatContext\` for a seamless experience across routes.

### 2. Dynamic Project Showcase
- **Case Study Routing:** Automatic slug-based routing for detailed project views.
- **Block-Based Content:** Uses a \`BlockRenderer\` to handle diverse content types (metrics, tech highlights, images, paragraphs).
- **Tech Stack Chips:** Automatic rendering of technologies used in each project from the central data store.

### 3. Impact-Driven Hero
- **Live Metrics:** Highlighting key achievements like "40% Load Performance" and "3M+ Quarterly Users".
- **Availability Badge:** Real-time status indication (e.g., "Available for projects").

### 4. Unified Data Management
- **Single Source of Truth:** \`portfolio-data.json\` houses all personal information, experience, and project details.
- **Typed Access:** Data is consumed via \`src/lib/data.ts\` ensuring type safety across the application.

---

## 🛠️ Components Architecture

- **\`LayoutWrapper\`**: Handles global animations and route transition logic.
- **\`BlockRenderer\`**: A flexible component that maps JSON content blocks to specific UI elements (Headings, Stats, Images, etc.).
- **\`CustomCursor\`**: A high-performance cursor using Framer Motion's \`useSpring\` and \`useMotionValue\` for lag-free tracking.
- **\`ThemeToggle\`**: Seamless transition between dark and light themes with system preference detection.

---

## 📈 Performance & SEO
- **Zero CLS:** Server-rendered shell ensures no layout shift during hydration.
- **Optimized Assets:** Using \`next/image\` for automatic format conversion and lazy loading.
- **SEO Ready:** Dynamic metadata generation for project pages and a robust global SEO configuration in \`layout.tsx\`.
