import { NextRequest } from "next/server";
import portfolioData from "@/lib/portfolio-data.json";
import projectsV2Data from "@/lib/projects-v2.json";
import { recordUsage, updateRateLimit } from "@/lib/chat-usage";

export const runtime = "nodejs";
const BASE_URL = process.env.LLM_BASE_URL || "https://api.groq.com/openai";
const MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";
const API_KEY = process.env.LLM_API_KEY || "";

const REQUEST_TIMEOUT_MS = 30_000;
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_TOTAL_MESSAGES = 30;
const MAX_RESPONSE_TOKENS = 512;
const TEMPERATURE = 0.3;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  bucket.count += 1;
  return true;
}


function pruneRateLimitBuckets() {
  const now = Date.now();
  for (const [ip, bucket] of rateLimitBuckets) {
    if (now > bucket.resetAt) rateLimitBuckets.delete(ip);
  }
}

function buildSystemPrompt(): string {
  const p = portfolioData.personal;
  const lines: string[] = [];

  lines.push(
    "You are the AI assistant for the portfolio of Lokesh Choudhary, a Senior Software Engineer. " +
    "Answer questions about Lokesh, his experience, skills, and projects using ONLY the facts provided below. " +
    "Be concise, warm, and technical. Keep every answer to at most 5 to 6 short lines or roughly 200 words. " +
    "Formatting rules: plain paragraphs and short bullet lists only. " +
    "Never use headings (no # marks), code blocks, images, or tables. Bold is fine, links are fine. " +
    "Never output code, function signatures, pseudocode, or anything wrapped in backticks as code. " +
    "If the answer is not in the provided facts, say you don't have that information and suggest what he could share."
  );

  const projectEntries = Object.entries(portfolioData.projects);
  const projectLinkList = projectEntries
    .map(([slug, project]) => {
      const v2 = (projectsV2Data as Record<string, unknown>)[slug] as
        | { meta?: { title?: string } }
        | undefined;
      const title = v2?.meta?.title?.replace(/<br\s*\/?>/gi, " ") || project.title;
      return `[${title}](/projects/${slug})`;
    })
    .join(", ");

  lines.push(
    `PROJECT GUIDANCE: The projects are ${projectLinkList}. ` +
    "When the user asks about 'a project' or 'your projects' without naming one, give a one-line overview and then ask which one they would like to know more about. " +
    "Whenever you mention any project, always include its clickable page link exactly as given above."
  );

  lines.push("NAME: " + p.name);
  lines.push("NAME GUARDRAIL: Lokesh Choudhary is the only name. Never use nicknames or variants like Loki, Lok, or Lokesh Choudhary variants. If unsure, say 'Lokesh'.");
  lines.push("TITLE: " + p.title);
  lines.push("BIO: " + p.bio);
  lines.push("LOCATION: Gurgaon, India");
  lines.push("EMAIL: lokesh.cdewanand@gmail.com");
  lines.push("GITHUB: https://github.com/lokesh-dc");
  lines.push("LINKEDIN: https://www.linkedin.com/in/choudhary-lokesh");
  lines.push("SKILLS: " + p.skills.join(", "));
  lines.push("CONTACT GUARDRAIL: If asked for a phone number, say you don't share that here and point to email or LinkedIn instead.");

  lines.push(
    "CODE GUARDRAIL: You are a portfolio assistant, not a coding assistant. " +
    "If the user asks you to write, generate, debug, or provide code in any programming language (JavaScript, TypeScript, Python, HTML, CSS, SQL, React, etc.), " +
    "politely decline and say you cannot write or share code, then redirect to what you can help with: Lokesh's projects, experience, skills, and contact info. " +
    "Never output source code, function signatures, pseudocode, or syntax-highlighted snippets in any form."
  );

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
  for (const [slug, project] of projectEntries) {
    const v2 = (projectsV2Data as Record<string, unknown>)[slug] as {
      meta?: { title?: string; tagline?: string };
    } | undefined;
    const title = v2?.meta?.title?.replace(/<br\s*\/?>/gi, " ") || project.title;
    const tagline = v2?.meta?.tagline || project.description;
    lines.push(`- ${title} (${slug}, /projects/${slug}): ${tagline}`);
    lines.push(`  Problem: ${project.problem}`);
    lines.push(`  Solution: ${project.solution}`);
    lines.push(`  Stack: ${project.technologies.join(", ")}`);
  }

  lines.push(
    "NOTE: Never invent URLs, metrics, or companies not listed above."
  );

  return lines.join("\n");
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Hard output guardrail: strips ``` fenced code blocks from the streamed
// text even if the model emits them, so code can never reach the client.
// Handles fences that are split across SSE chunks by buffering trailing
// backticks until it is clear whether they form a fence.
class CodeFenceFilter {
  private buffer = "";
  private inCodeBlock = false;

  constructor(private readonly encoder: TextEncoder) { }

  push(text: string): Uint8Array[] {
    this.buffer += text;
    const chunks: Uint8Array[] = [];

    let fenceIndex = this.buffer.indexOf("```");
    while (fenceIndex !== -1) {
      const before = this.buffer.slice(0, fenceIndex);
      if (!this.inCodeBlock && before.length > 0) {
        chunks.push(this.encoder.encode(before));
      }
      this.inCodeBlock = !this.inCodeBlock;
      this.buffer = this.buffer.slice(fenceIndex + 3);
      fenceIndex = this.buffer.indexOf("```");
    }

    let hold = 0;
    if (this.buffer.endsWith("```")) hold = 3;
    else if (this.buffer.endsWith("``")) hold = 2;
    else if (this.buffer.endsWith("`")) hold = 1;

    const emit = this.buffer.slice(0, this.buffer.length - hold);
    if (!this.inCodeBlock && emit.length > 0) {
      chunks.push(this.encoder.encode(emit));
    }
    this.buffer = this.buffer.slice(this.buffer.length - hold);
    return chunks;
  }

  flush(): Uint8Array[] {
    const chunks: Uint8Array[] = [];
    if (!this.inCodeBlock && this.buffer.length > 0) {
      chunks.push(this.encoder.encode(this.buffer));
    }
    this.buffer = "";
    return chunks;
  }

  isUnterminated(): boolean {
    return this.inCodeBlock;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  pruneRateLimitBuckets();

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many messages. Please wait a minute and try again." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: { role: string; content: string }[] } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawHistory = Array.isArray(body.messages) ? body.messages : [];

  if (rawHistory.length > MAX_TOTAL_MESSAGES) {
    return new Response(
      JSON.stringify({ error: "Conversation is too long. Please start a new chat." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  for (const m of rawHistory) {
    if (
      !m ||
      typeof m !== "object" ||
      typeof m.role !== "string" ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string"
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid message format in conversation history." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: "One of your messages is too long." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "LLM_API_KEY is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const history = rawHistory.slice(-MAX_HISTORY_MESSAGES);
  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...history.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];

  // Abort the upstream call if it hangs -- also tied to the client's own
  // abort signal so a canceled request on the frontend actually stops
  // generation instead of burning tokens in the background.
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal = req.signal
    ? AbortSignal.any([req.signal, timeoutSignal])
    : timeoutSignal;

  let upstream: Response;
  try {
    upstream = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: true,
        max_tokens: MAX_RESPONSE_TOKENS,
        temperature: TEMPERATURE,
      }),
      signal,
    });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "TimeoutError";
    return new Response(
      JSON.stringify({
        error: isAbort
          ? "The assistant took too long to respond. Please try again."
          : "Could not reach the LLM backend.",
      }),
      { status: isAbort ? 504 : 502, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({
        error: `LLM backend unavailable (${upstream.status}).`,
        detail: detail.slice(0, 300),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  updateRateLimit(upstream.headers);

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      const filter = new CodeFenceFilter(encoder);
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
              if (delta) {
                for (const chunk of filter.push(delta)) {
                  controller.enqueue(chunk);
                }
              }
              if (parsed.usage && typeof parsed.usage.prompt_tokens === "number") {
                recordUsage(parsed.usage.prompt_tokens, parsed.usage.completion_tokens);
              }
            } catch {
              // skip malformed keep-alive frames
            }
          }
        }
        for (const chunk of filter.flush()) {
          controller.enqueue(chunk);
        }
        if (filter.isUnterminated()) {
          controller.enqueue(encoder.encode("\n\n[Response ended early.]"));
        }
      } catch (err) {
        console.error("Stream error:", err);
        try {
          controller.enqueue(encoder.encode("\n\n[The response was interrupted. Please try again.]"));
        } catch { }
      } finally {
        try {
          controller.close();
        } catch {
          // already closed via error path
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => { });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}