import posthog from "posthog-js";

import {
  POSTHOG_HOST,
  POSTHOG_MISSING_TOKEN_MESSAGE,
  POSTHOG_SCRIPT_ALIAS_PATH,
  POSTHOG_SCRIPT_ALIASES,
  POSTHOG_TOKEN,
  POSTHOG_UI_HOST,
} from "@/lib/posthog-env";

function routeScriptThroughProxy(script: HTMLScriptElement) {
  try {
    const url = new URL(script.src, window.location.origin);
    const fileName = url.pathname.split("/").pop();
    const alias = fileName ? POSTHOG_SCRIPT_ALIASES[fileName] : undefined;

    if (alias) {
      script.src = `${POSTHOG_SCRIPT_ALIAS_PATH}/${alias}${url.search}`;
    }
  } catch {
    return script;
  }

  return script;
}

function initPostHog(token: string) {
  try {
    posthog.init(token, {
      api_host: POSTHOG_HOST,
      ui_host: POSTHOG_UI_HOST,
      defaults: "2025-05-24",
      capture_pageview: "history_change",
      capture_pageleave: true,
      capture_performance: { web_vitals: true },
      prepare_external_dependency_script: routeScriptThroughProxy,
    });
  } catch (error) {
    console.error("PostHog failed to initialise", error);
  }
}

if (POSTHOG_TOKEN) {
  const token = POSTHOG_TOKEN;

  if (document.readyState === "complete") {
    initPostHog(token);
  } else {
    window.addEventListener("load", () => initPostHog(token), { once: true });
  }
} else if (process.env.NODE_ENV === "development") {
  console.error(POSTHOG_MISSING_TOKEN_MESSAGE);
}
