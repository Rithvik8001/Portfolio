import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
  defaults: "2025-05-24",
  cookieless_mode: "on_reject",
});

posthog.has_opted_out_capturing();
