export const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
  process.env.NEXT_PUBLIC_POSTHOG_KEY;

export const POSTHOG_UPSTREAM_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const POSTHOG_UPSTREAM_ASSET_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST ??
  POSTHOG_UPSTREAM_HOST.replace("://us.i.", "://us-assets.i.").replace(
    "://eu.i.",
    "://eu-assets.i.",
  );

export const POSTHOG_INGEST_PATH = "/relay-x7q2";

export const POSTHOG_HOST = POSTHOG_INGEST_PATH;

export const POSTHOG_UI_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com";

export const POSTHOG_MISSING_TOKEN_MESSAGE =
  "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured";

export const POSTHOG_SCRIPT_ALIAS_PATH = `${POSTHOG_INGEST_PATH}/s`;

export const POSTHOG_SCRIPT_ALIASES: Record<string, string> = {
  "posthog-recorder.js": "r.js",
  "recorder.js": "r1.js",
  "recorder-v2.js": "r2.js",
  "dead-clicks-autocapture.js": "d.js",
  "exception-autocapture.js": "e.js",
  "web-vitals.js": "w.js",
  "surveys.js": "sv.js",
  "tracing-headers.js": "t.js",
  "external-scripts-loader.js": "x.js",
};
