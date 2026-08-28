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

import {
  MAX_CHAT_BODY_BYTES,
  MAX_CHAT_INPUT_CHARS,
  MAX_CHAT_MESSAGE_CHARS,
  MAX_CHAT_MESSAGES,
  MAX_CHAT_OUTPUT_TOKENS,
} from "@/lib/chat-limits";
import { SYSTEM_PROMPT } from "@/lib/chat-prompt";

export const CHAT_MODEL = "gpt-5.6-luna";
export {
  MAX_CHAT_BODY_BYTES,
  MAX_CHAT_INPUT_CHARS,
  MAX_CHAT_MESSAGE_CHARS,
  MAX_CHAT_MESSAGES,
  MAX_CHAT_OUTPUT_TOKENS,
};

export const CHAT_STREAM_ERROR_MESSAGE =
  "Something went wrong generating that reply. Please try again.";

const chatRequestSchema = z.object({
  id: z.string().optional(),
  messages: z.array(z.unknown()),
  trigger: z.enum(["submit-message", "regenerate-message"]).optional(),
  messageId: z.string().optional(),
});

type ChatValidationFailureReason =
  | "invalid_body"
  | "empty_conversation"
  | "empty_message"
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
  | ChatValidationFailure
  | ChatValidationSuccess;

type TextPart = Extract<UIMessage["parts"][number], { type: "text" }>;

function validationFailure(
  reason: ChatValidationFailureReason,
  message: string,
): ChatValidationFailure {
  return { ok: false, status: 400, message, reason };
}

function isTextPart(part: UIMessage["parts"][number]): part is TextPart {
  return part.type === "text";
}

function isAssistantProtocolPart(part: UIMessage["parts"][number]): boolean {
  return (
    part.type === "text" ||
    part.type === "step-start" ||
    part.type === "reasoning"
  );
}

function hasUnsupportedParts(message: UIMessage): boolean {
  if (message.role === "assistant") {
    return message.parts.some((part) => !isAssistantProtocolPart(part));
  }

  return message.parts.some((part) => part.type !== "text");
}

function getMessageText(message: UIMessage): string {
  return message.parts.filter(isTextPart).map((part) => part.text).join("");
}

function normalizeMessage(message: UIMessage): UIMessage {
  return {
    id: message.id,
    role: message.role,
    parts: message.parts.filter(isTextPart).map((part) => ({
      type: "text" as const,
      text: part.text,
    })),
  };
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

  for (const message of messages) {
    if (message.role !== "user" && message.role !== "assistant") {
      return validationFailure("invalid_role", "Invalid message role.");
    }

    if (hasUnsupportedParts(message)) {
      return validationFailure(
        "unsupported_part",
        "Only text messages are supported.",
      );
    }

    if (message.role === "user" && getMessageText(message).trim() === "") {
      return validationFailure("empty_message", "Message cannot be empty.");
    }
  }

  const retainedMessages = messages
    .slice(-MAX_CHAT_MESSAGES)
    .map(normalizeMessage);
  let inputChars = 0;

  for (const message of retainedMessages) {
    const messageChars = getMessageText(message).length;

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
        reasoningEffort: "none",
        textVerbosity: "low",
        promptCacheKey: "rithix-system-v2",
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
