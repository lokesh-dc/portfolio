import {
  getChatUsage,
  updateModelInfo,
  updateRateLimit,
} from "@/lib/chat-usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = process.env.LLM_BASE_URL || "https://api.groq.com/openai";
const MODEL = process.env.LLM_MODEL || "llama-3.3-70b-versatile";
const API_KEY = process.env.LLM_API_KEY || "";
const FRESH_MS = 30_000;

export async function GET() {
  let probed = false;

  const cached = getChatUsage();
  const hasRateData =
    cached.remainingTokens !== null || cached.remainingRequests !== null;
  const isFresh =
    hasRateData && cached.lastUpdated !== null && Date.now() - cached.lastUpdated < FRESH_MS;

  const needsProbe = !isFresh || cached.model === null;

  if (needsProbe && API_KEY) {
    try {
      const res = await fetch(`${BASE_URL}/v1/models`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        updateRateLimit(res.headers);
        const body = (await res.json()) as {
          data?: {
            id: string;
            context_window?: number;
            max_completion_tokens?: number;
            pricing?: Record<string, string>;
          }[];
        };
        const model = body.data?.find((m) => m.id === MODEL);
        if (model) {
          updateModelInfo(
            model.id,
            model.context_window ?? null,
            model.max_completion_tokens ?? null,
            model.pricing ?? null
          );
        }
        probed = true;
      }
    } catch {
      // fall back to the cached snapshot
    }
  }

  const usage = getChatUsage();
  return Response.json(
    {
      ...usage,
      probed,
      modelId: MODEL,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
