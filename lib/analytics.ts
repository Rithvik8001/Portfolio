import posthog from "posthog-js";

export const ANALYTICS_EVENTS = {
  socialLinkClicked: "social_link_clicked",
  contactEmailClicked: "contact_email_clicked",
  websiteLinkClicked: "website_link_clicked",
  vcardDownloaded: "vcard_downloaded",
  projectLinkOpened: "project_link_opened",
  projectExpanded: "project_expanded",
  experienceExpanded: "experience_expanded",
  skillClicked: "skill_clicked",
  githubProfileClicked: "github_profile_clicked",
  chatMessageSent: "chat_message_sent",
  chatQuickQuestionClicked: "chat_quick_question_clicked",
  chatResponseReceived: "chat_response_received",
  commandMenuOpened: "command_menu_opened",
  commandMenuItemSelected: "command_menu_item_selected",
  themeChanged: "theme_changed",
  brandAssetCopied: "brand_asset_copied",
  resumeOpened: "resume_opened",
} as const;

type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export function captureEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties,
) {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}

export function captureError(error: unknown, properties?: AnalyticsProperties) {
  if (!posthog.__loaded) return;
  posthog.captureException(error, properties);
}

export function getAnalyticsContext() {
  if (!posthog.__loaded) return null;
  return {
    distinctId: posthog.get_distinct_id(),
    sessionId: posthog.get_session_id(),
  };
}
