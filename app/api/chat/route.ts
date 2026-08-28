import {
  CHAT_MODEL,
  createChatResponse,
  validateChatRequest,
} from "@/lib/server/chat";
import { getPostHogServer, readAnalyticsHeaders } from "@/lib/posthog-server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const posthog = getPostHogServer();
  const { distinctId, sessionId } = readAnalyticsHeaders(req);

  const capture = (event: string, properties: Record<string, unknown>) => {
    posthog?.capture({
      distinctId,
      event,
      properties: { ...properties, $session_id: sessionId },
    });
  };

  let body: unknown;

  try {
    body = await req.json();
  } catch (error) {
    posthog?.captureException(error, distinctId, { route: "/api/chat" });
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const validation = await validateChatRequest(body);

  if (!validation.ok) {
    capture("chat_request_rejected", { reason: validation.reason });
    return Response.json(
      { error: validation.message },
      { status: validation.status },
    );
  }

  capture("chat_completion_requested", {
    model: CHAT_MODEL,
    turn: validation.messages.length,
    input_chars: validation.inputChars,
  });

  return createChatResponse({
    messages: validation.messages,
    abortSignal: req.signal,
    onError: (error) => {
      console.error("[chat] stream error:", error);
      posthog?.captureException(error, distinctId, { route: "/api/chat" });
    },
  });
}
