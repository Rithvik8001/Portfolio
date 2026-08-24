import posthog from "posthog-js";

import {
  POSTHOG_HOST,
  POSTHOG_MISSING_TOKEN_MESSAGE,
  POSTHOG_TOKEN,
  POSTHOG_UI_HOST,
} from "@/lib/posthog-env";

if (POSTHOG_TOKEN) {
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    ui_host: POSTHOG_UI_HOST,
    defaults: "2025-05-24",
    cookieless_mode: "on_reject",
  });
} else if (process.env.NODE_ENV === "development") {
  throw new Error(POSTHOG_MISSING_TOKEN_MESSAGE);
}
