"use client";

import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { IntroItemLink } from "./intro-item";

type TrackedIntroLinkProps = React.ComponentProps<typeof IntroItemLink> & {
  event: "contact_email_clicked" | "website_link_clicked";
};

export function TrackedIntroLink({ event, ...props }: TrackedIntroLinkProps) {
  return (
    <IntroItemLink
      {...props}
      onClick={() =>
        captureEvent(
          event === "contact_email_clicked"
            ? ANALYTICS_EVENTS.contactEmailClicked
            : ANALYTICS_EVENTS.websiteLinkClicked,
        )
      }
    />
  );
}
