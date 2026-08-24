"use client";

import { captureEvent, type ANALYTICS_EVENTS } from "@/lib/analytics";

type TrackedLinkProps = React.ComponentProps<"a"> & {
  event: (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
  eventProperties?: Record<string, string | number | boolean | null>;
};

export function TrackedLink({
  event,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        captureEvent(event, eventProperties);
        onClick?.(e);
      }}
    />
  );
}
