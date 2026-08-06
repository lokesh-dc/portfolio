import { NextRequest } from "next/server";
import portfolioData from "@/lib/portfolio-data.json";
import projectsV2Data from "@/lib/projects-v2.json";

export const runtime = "nodejs";

const BASE_URL = process.env.LLM_BASE_URL || "http://localhost:11434";
const MODEL = process.env.LLM_MODEL || "llama3.2:3b";
const API_KEY = process.env.LLM_API_KEY || "";

function buildSystemPrompt(): string {
  const p = portfolioData.personal;
  const lines: string[] = [];

  lines.push(
    "You are the AI assistant for the portfolio of Lokesh Choudhary, a Senior Software Engineer. " +
      "Answer questions about Lokesh, his experience, skills, and projects using ONLY the facts provided below. " +
      "Be concise, warm, and technical. Keep every answer to at most 5 to 6 short lines or roughly 200 words. " +
      "Formatting rules: plain paragraphs and short bullet lists only. " +
      "Never use headings (no # marks), code blocks, images, or tables. Bold is fine, links are fine. " +
      "If the answer is not in the provided facts, say you don't have that information and suggest what he could share."
  );

  lines.push(
    "PROJECT GUIDANCE: The three projects are FitTrack (fitness-tracker), Conversational Developer Portfolio (portfolio-redesign), and HookedOnMovies (hooked-on-movies). " +
      "Lokesh's best and most impressive project is FitTrack, a performance-first PWA for serious lifters with O(1) PR detection and three logging modes. " +
      "When asked about the 'best' project, describe FitTrack. " +
      "When the user asks about 'a project' or 'your projects' without naming one, give a one-line overview and then ask which one they would like to know more about (FitTrack, Conversational Portfolio, or HookedOnMovies). " +
      "Whenever you mention any project, always include its clickable page link using exactly: [FitTrack](/projects/fitness-tracker), [Conversational Developer Portfolio](/projects/portfolio-redesign), [HookedOnMovies](/projects/hooked-on-movies)."
  );

  lines.push("NAME: " + p.name);
  lines.push("NAME GUARDRAIL: Lokesh Choudhary is the only name. Never use nicknames or variants like Loki, Lok, or Lokesh Choudhary variants. If unsure, say 'Lokesh'.");
  lines.push("TITLE: " + p.title);
  lines.push("BIO: " + p.bio);
  lines.push("LOCATION: Gurgaon, India");
  lines.push("EMAIL: lokesh.cdewanand@gmail.com");
  lines.push("PHONE: +91 91726 59994");
  lines.push("GITHUB: https://github.com/lokesh-dc");
  lines.push("LINKEDIN: https://www.linkedin.com/in/choudhary-lokesh");
  lines.push("SKILLS: " + p.skills.join(", "));

  lines.push("EXPERIENCE:");
  for (const job of portfolioData.experience) {
    lines.push(
      `- ${job.year} | ${job.role} at ${job.company}${job.link ? " (" + job.link + ")" : ""}: ${job.description.join(" ")}`
    );
  }

  lines.push("EDUCATION:");
  for (const edu of portfolioData.education) {
    lines.push(`- ${edu.year} | ${edu.school}: ${edu.degree}`);
  }

  lines.push("PROJECTS:");
  for (const [slug, project] of Object.entries(portfolioData.projects)) {
    const v2 = (projectsV2Data as Record<string, unknown>)[slug] as {
      meta?: { title?: string; tagline?: string };
    } | undefined;
    const title = v2?.meta?.title?.replace(/<br\s*\/?>/gi, " ") || project.title;
    const tagline = v2?.meta?.tagline || project.description;
    lines.push(
      `- ${title} (${slug}, /projects/${slug}): ${tagline}`
    );
    lines.push(`  Problem: ${project.problem}`);
    lines.push(`  Solution: ${project.solution}`);
    lines.push(`  Stack: ${project.technologies.join(", ")}`);
  }

  lines.push(
    "NOTE: You are running locally via Ollama. Never invent URLs, metrics, or companies not listed above."
  );

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  let body: { messages?: { role: string; content: string }[] } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...history.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];

  const upstream = await fetch(`${BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    },
    body: JSON.stringify({ model: MODEL, messages, stream: true }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({
        error: `LLM backend unavailable (${upstream.status}). Start Ollama with 'ollama serve' or set OLLAMA_BASE_URL.`,
        detail: detail.slice(0, 300),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const delta =
                parsed.choices?.[0]?.delta?.content ??
                parsed.message?.content ??
                "";
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // skip malformed keep-alive frames
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
