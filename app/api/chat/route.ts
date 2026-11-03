import {
  MAX_CHAT_BODY_BYTES,
  createChatResponse,
  validateChatRequest,
} from "@/lib/server/chat";

export const maxDuration = 30;

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > MAX_CHAT_BODY_BYTES) {
    return Response.json(
      { error: "Request is too large." },
      { status: 413 },
    );
  }

  let rawBody: string;

  try {
    rawBody = await req.text();
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (rawBody.length > MAX_CHAT_BODY_BYTES) {
    return Response.json(
      { error: "Request is too large." },
      { status: 413 },
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const validation = await validateChatRequest(body);

  if (!validation.ok) {
    return Response.json(
      { error: validation.message },
      { status: validation.status },
    );
  }

  return createChatResponse({
    messages: validation.messages,
    abortSignal: req.signal,
    onError: (error) => {
      console.error("[chat] stream error:", error);
    },
  });
}
