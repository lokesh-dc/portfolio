# Lokesh Choudhary — Conversational Developer Portfolio

A command-driven portfolio built with the **Next.js App Router** and **Framer Motion**.
Instead of hunting through links, visitors type what they want: a command palette and a
grounded AI chat route intent to projects, skills, and experience on demand.

**Live site:** deployed on Vercel (see the `Visit the live site` link on the portfolio case study page)
· **Contact:** lokesh.cdewanand@gmail.com
· [GitHub](https://github.com/lokesh-dc) · [LinkedIn](https://www.linkedin.com/in/choudhary-lokesh)

## Try it (30 seconds)

1. Press **⌘K / Ctrl+K** (or `/`) anywhere — a command palette opens.
2. Type `/projects` to see slash-command routing, or type `Next.js` to fuzzy-search skills and case studies.
3. Type a free-text question → **Ask AI** hands it to the chat sidebar, which streams a grounded answer.
4. Open a case study (`/projects/fitness-tracker`) — pages are statically generated with an instant loading skeleton.

## For recruiters

- **What to read:** three full case studies with problem → solution → architecture → results —
  FitTrack (PWA fitness tracker, 25+ lifters), HookedOnMovies (TMDB platform), Klicky (Web Audio playground) —
  plus a work history page (Senior Software Engineer @ HexaHealth: Next.js migration, −40% load times, 5x organic traffic).
- **What the site itself demonstrates:** AI-integrated UX (streaming chat with output guardrails),
  JSON-decoupled content architecture, Core Web Vitals–conscious rendering (static shell, zero client waterfalls).
- **Availability:** open to projects — email is the fastest channel.

## For engineers

### Stack

Next.js 16 (App Router, Server Components) · React 19 · TypeScript · Tailwind CSS 4 ·
Framer Motion · Groq LLM API (OpenAI-compatible) · Vercel

### Architecture

| Layer | Detail |
|---|---|
| Command palette | `src/components/CommandPalette.tsx` — ⌘K/`/` shortcuts, fuzzy + slash matching, Framer Motion layout animations, prefetches destinations on open |
| Route table | `src/lib/commands.ts` — built from the same JSON the pages render, so new projects/skills become palette entries with no router changes |
| AI chat | `src/app/api/chat/route.ts` — streams LLM tokens over SSE, `CodeFenceFilter` strips fenced code across chunk boundaries, in-memory sliding-window rate limit (10 req/min/IP), 30s timeout tied to client abort |
| Chat state | `src/context/ChatContext.tsx` — sidebar + palette visibility, `ask()` handoff auto-sends palette questions into the chat |
| Content | `src/lib/portfolio-data.json` (bio, experience, skills) + `src/lib/projects-v2.json` (case studies) — single source of truth for UI *and* the chat system prompt |
| Rendering | Static shell via `generateStaticParams` (`/projects/[slug]`), `loading.tsx` skeletons for instant-feeling transitions |

### Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Chat needs an OpenAI-compatible key (defaults target Groq):

```bash
LLM_API_KEY=...            # required for /api/chat
LLM_MODEL=llama-3.3-70b-versatile
LLM_BASE_URL=https://api.groq.com/openai
```

Without a key the site works fully except chat, which returns a configuration error.

### Project structure

```
src/
  app/                    # routes: /, /projects, /projects/[slug], /experience, /about, /api/chat
  components/
    CommandPalette.tsx    # ⌘K palette
    ChatSidebar.tsx / ChatInput.tsx / MessageBubble.tsx   # AI chat UI
    home/  projects/  about/  shared/                     # page sections
  context/ChatContext.tsx # sidebar + palette + ask() handoff
  lib/
    commands.ts           # JSON-derived palette route table + matcher
    data.ts               # typed accessors over the JSON files
    portfolio-data.json / projects-v2.json                # all content lives here
```

### Editing content

Content edits are JSON edits — components never change:

- Bio, skills, experience → `src/lib/portfolio-data.json`
- Case studies → `src/lib/projects-v2.json` (new key + `generateStaticParams` picks it up automatically, including in the palette)

### Scripts

```bash
npm run dev     # local dev
npm run build   # production build (type-checks; all routes pre-render)
npm run lint    # eslint
```
