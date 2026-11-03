export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const UMAMI_DOMAINS =
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS ??
  "rithvikpallamreddy.com,www.rithvikpallamreddy.com";

export const UMAMI_HOST_URL = "/rp";

export const UMAMI_SCRIPT_SRC = `${UMAMI_HOST_URL}/s.js`;

export const ANALYTICS_EVENTS = {
  resumeOpen: "resume_open",
  vcardDownload: "vcard_download",
  emailClick: "email_click",
  socialClick: "social_click",
  companyClick: "company_click",
  projectOpen: "project_open",
  projectToggle: "project_toggle",
  projectsListToggle: "projects_list_toggle",
  experienceToggle: "experience_toggle",
  markdownLinkClick: "markdown_link_click",
  skillClick: "skill_click",
  themeChange: "theme_change",
  brandCopy: "brand_copy",
  commandMenuOpen: "command_menu_open",
  commandMenuSelect: "command_menu_select",
  scrollToTop: "scroll_to_top",
  chatMessageSent: "chat_message_sent",
  chatQuickQuestion: "chat_quick_question",
  chatResponseFinished: "chat_response_finished",
  chatError: "chat_error",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsData = Record<string, string | number | boolean>;

export function track(event: AnalyticsEvent, data?: AnalyticsData) {
  window.umami?.track(event, data ?? {});
}

export function trackingAttributes(
  event: AnalyticsEvent,
  data: Record<string, string> = {},
) {
  return {
    "data-umami-event": event,
    ...Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        `data-umami-event-${key}`,
        value,
      ]),
    ),
  };
}

export function getSocialPlatform(href: string) {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host.split(".")[0];
}
