export type ParsedChatRequestError = {
  message: string;
  retryAfterSeconds?: number;
};

const DEFAULT_CHAT_ERROR_MESSAGE =
  "Something went wrong sending that message. Please try again.";

export function parseChatRequestError(error: Error): ParsedChatRequestError {
  try {
    const parsed: unknown = JSON.parse(error.message);

    if (
      parsed &&
      typeof parsed === "object" &&
      "error" in parsed &&
      typeof parsed.error === "string"
    ) {
      const retryAfterSeconds =
        "retryAfterSeconds" in parsed &&
        typeof parsed.retryAfterSeconds === "number" &&
        Number.isFinite(parsed.retryAfterSeconds)
          ? Math.max(1, Math.ceil(parsed.retryAfterSeconds))
          : undefined;

      return {
        message: parsed.error,
        retryAfterSeconds,
      };
    }
  } catch {
    // The transport surfaces non-JSON HTTP bodies as the error message.
  }

  return {
    message: error.message.trim() || DEFAULT_CHAT_ERROR_MESSAGE,
  };
}

export function formatChatRetryMessage(retryAfterSeconds: number): string {
  if (retryAfterSeconds < 60) {
    return `Try again in ${retryAfterSeconds} second${retryAfterSeconds === 1 ? "" : "s"}.`;
  }

  const minutes = Math.ceil(retryAfterSeconds / 60);
  return `Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}
