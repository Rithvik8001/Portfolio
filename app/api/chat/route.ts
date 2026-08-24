import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  validateUIMessages,
  type UIMessage,
} from "ai";

import { SYSTEM_PROMPT } from "@/lib/chat-prompt";
import { getPostHogServer, readAnalyticsHeaders } from "@/lib/posthog-server";

export const maxDuration = 30;

const MODEL = "gpt-5-nano";
const MAX_MESSAGES = 24;
const MAX_INPUT_CHARS = 12_000;
const MAX_OUTPUT_TOKENS = 1200;
const STREAM_ERROR_MESSAGE =
  "Something went wrong generating that reply. Please try again.";

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function countTextChars(messages: UIMessage[]) {
  let total = 0;
  for (const message of messages) {
    for (const part of message.parts) {
      if (part.type === "text") total += part.text.length;
    }
  }
  return total;
}

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

  let messages: UIMessage[];

  try {
    const body = await req.json();
    messages = await validateUIMessages({
      messages: (body as { messages?: unknown })?.messages,
    });
  } catch (error) {
    posthog?.captureException(error, distinctId, { route: "/api/chat" });
    return badRequest("Invalid request body.");
  }

  if (messages.length > MAX_MESSAGES) {
    messages = messages.slice(-MAX_MESSAGES);
  }

  if (countTextChars(messages) > MAX_INPUT_CHARS) {
    capture("chat_request_rejected", { reason: "conversation_too_long" });
    return badRequest("Conversation is too long. Start a new chat.");
  }

  capture("chat_completion_requested", {
    model: MODEL,
    turn: messages.length,
    input_chars: countTextChars(messages),
  });

  const result = streamText({
    model: openai.chat(MODEL),
    instructions: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    providerOptions: {
      openai: {
        reasoningEffort: "minimal",
        textVerbosity: "medium",
        promptCacheKey: "rithix-system-v1",
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      sendReasoning: false,
      onError: (error) => {
        console.error("[chat] stream error:", error);
        posthog?.captureException(error, distinctId, { route: "/api/chat" });
        return STREAM_ERROR_MESSAGE;
      },
    }),
  });
}
