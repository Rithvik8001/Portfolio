import "server-only";

import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  validateUIMessages,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { SYSTEM_PROMPT } from "@/lib/chat-prompt";

export const CHAT_MODEL = "gpt-5-nano";
export const MAX_CHAT_MESSAGES = 24;
export const MAX_CHAT_INPUT_CHARS = 12_000;
export const MAX_CHAT_MESSAGE_CHARS = 2_000;
export const MAX_CHAT_OUTPUT_TOKENS = 1_200;

export const CHAT_STREAM_ERROR_MESSAGE =
  "Something went wrong generating that reply. Please try again.";

const chatRequestSchema = z
  .object({
    messages: z.unknown(),
  })
  .passthrough();

type ChatValidationFailureReason =
  | "invalid_body"
  | "empty_conversation"
  | "invalid_role"
  | "unsupported_part"
  | "message_too_long"
  | "conversation_too_long"
  | "invalid_final_role";

export type ChatValidationFailure = {
  ok: false;
  status: 400;
  message: string;
  reason: ChatValidationFailureReason;
};

export type ChatValidationSuccess = {
  ok: true;
  messages: UIMessage[];
  inputChars: number;
};

export type ChatValidationResult =
  ChatValidationFailure | ChatValidationSuccess;

function validationFailure(
  reason: ChatValidationFailureReason,
  message: string,
): ChatValidationFailure {
  return { ok: false, status: 400, message, reason };
}

export async function validateChatRequest(
  input: unknown,
): Promise<ChatValidationResult> {
  const parsedRequest = chatRequestSchema.safeParse(input);

  if (!parsedRequest.success) {
    return validationFailure("invalid_body", "Invalid request body.");
  }

  let messages: UIMessage[];

  try {
    messages = await validateUIMessages({
      messages: parsedRequest.data.messages,
    });
  } catch {
    return validationFailure("invalid_body", "Invalid request body.");
  }

  if (messages.length === 0) {
    return validationFailure("empty_conversation", "Conversation is empty.");
  }

  const retainedMessages = messages.slice(-MAX_CHAT_MESSAGES);
  let inputChars = 0;

  for (const message of retainedMessages) {
    if (message.role !== "user" && message.role !== "assistant") {
      return validationFailure("invalid_role", "Invalid message role.");
    }

    if (message.parts.some((part) => part.type !== "text")) {
      return validationFailure(
        "unsupported_part",
        "Only text messages are supported.",
      );
    }

    const messageChars = message.parts.reduce(
      (total, part) => total + (part.type === "text" ? part.text.length : 0),
      0,
    );

    if (messageChars > MAX_CHAT_MESSAGE_CHARS) {
      return validationFailure("message_too_long", "Message is too long.");
    }

    inputChars += messageChars;
  }

  if (inputChars > MAX_CHAT_INPUT_CHARS) {
    return validationFailure(
      "conversation_too_long",
      "Conversation is too long. Start a new chat.",
    );
  }

  if (retainedMessages.at(-1)?.role !== "user") {
    return validationFailure(
      "invalid_final_role",
      "The final message must come from the user.",
    );
  }

  return {
    ok: true,
    messages: retainedMessages,
    inputChars,
  };
}

type CreateChatResponseOptions = {
  messages: UIMessage[];
  abortSignal: AbortSignal;
  onError: (error: unknown) => void;
};

export async function createChatResponse({
  messages,
  abortSignal,
  onError,
}: CreateChatResponseOptions): Promise<Response> {
  const result = streamText({
    model: openai.chat(CHAT_MODEL),
    instructions: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal,
    maxOutputTokens: MAX_CHAT_OUTPUT_TOKENS,
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
        onError(error);
        return CHAT_STREAM_ERROR_MESSAGE;
      },
    }),
  });
}
