export interface ChatUsageSnapshot {
  remainingRequests: number | null;
  remainingTokens: number | null;
  limitRequests: number | null;
  limitTokens: number | null;
  resetRequests: string | null;
  resetTokens: string | null;
  lastPromptTokens: number | null;
  lastCompletionTokens: number | null;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalRequests: number;
  model: {
    id: string;
    contextWindow: number | null;
    maxCompletionTokens: number | null;
    pricing: Record<string, string> | null;
  } | null;
  lastUpdated: number | null;
}

const usage: ChatUsageSnapshot = {
  remainingRequests: null,
  remainingTokens: null,
  limitRequests: null,
  limitTokens: null,
  resetRequests: null,
  resetTokens: null,
  lastPromptTokens: null,
  lastCompletionTokens: null,
  totalPromptTokens: 0,
  totalCompletionTokens: 0,
  totalRequests: 0,
  model: null,
  lastUpdated: null,
};

function toNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function updateRateLimit(headers: Headers): void {
  const remainingRequests = toNumber(headers.get("x-ratelimit-remaining-requests"));
  const remainingTokens = toNumber(headers.get("x-ratelimit-remaining-tokens"));
  const limitRequests = toNumber(headers.get("x-ratelimit-limit-requests"));
  const limitTokens = toNumber(headers.get("x-ratelimit-limit-tokens"));
  const resetRequests = headers.get("x-ratelimit-reset-requests");
  const resetTokens = headers.get("x-ratelimit-reset-tokens");

  if (remainingRequests !== null) usage.remainingRequests = remainingRequests;
  if (remainingTokens !== null) usage.remainingTokens = remainingTokens;
  if (limitRequests !== null) usage.limitRequests = limitRequests;
  if (limitTokens !== null) usage.limitTokens = limitTokens;
  if (resetRequests !== null) usage.resetRequests = resetRequests;
  if (resetTokens !== null) usage.resetTokens = resetTokens;
  if (remainingRequests !== null || remainingTokens !== null) {
    usage.lastUpdated = Date.now();
  }
}

export function recordUsage(promptTokens: number, completionTokens: number): void {
  usage.lastPromptTokens = promptTokens;
  usage.lastCompletionTokens = completionTokens;
  usage.totalPromptTokens += promptTokens;
  usage.totalCompletionTokens += completionTokens;
  usage.totalRequests += 1;
  usage.lastUpdated = Date.now();
}

export function updateModelInfo(
  id: string,
  contextWindow: number | null,
  maxCompletionTokens: number | null,
  pricing: Record<string, string> | null
): void {
  usage.model = { id, contextWindow, maxCompletionTokens, pricing };
}

export function getChatUsage(): ChatUsageSnapshot {
  return {
    ...usage,
    model: usage.model ? { ...usage.model } : null,
  };
}
