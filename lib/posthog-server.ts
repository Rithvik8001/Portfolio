import { PostHog } from "posthog-node";

import {
  POSTHOG_HOST,
  POSTHOG_MISSING_TOKEN_MESSAGE,
  POSTHOG_TOKEN,
} from "@/lib/posthog-env";

let client: PostHog | null = null;

export function getPostHogServer() {
  const key = POSTHOG_TOKEN;

  if (!key) {
    if (process.env.NODE_ENV === "development") {
      console.error(POSTHOG_MISSING_TOKEN_MESSAGE);
    }
    return null;
  }

  if (!client) {
    client = new PostHog(key, {
      host: POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return client;
}

export const ANONYMOUS_DISTINCT_ID = "anonymous_server_event";

export function readAnalyticsHeaders(request: Request) {
  return {
    distinctId:
      request.headers.get("x-posthog-distinct-id") ?? ANONYMOUS_DISTINCT_ID,
    sessionId: request.headers.get("x-posthog-session-id") ?? undefined,
  };
}
