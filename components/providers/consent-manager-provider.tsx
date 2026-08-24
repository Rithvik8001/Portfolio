"use client";

import { useConsentManager } from "@c15t/nextjs";
import { ClientSideOptionsProvider } from "@c15t/nextjs/client";
import { posthog } from "posthog-js";
import { useEffect } from "react";

function syncPostHogConsent(hasMeasurementConsent: boolean) {
  if (!posthog.__loaded) return;

  if (hasMeasurementConsent) {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }
}

export function ConsentManagerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { consents, consentInfo } = useConsentManager();
  const hasMeasurementConsent = Boolean(consents?.measurement);

  useEffect(() => {
    if (!consentInfo) return;
    syncPostHogConsent(hasMeasurementConsent);
  }, [consentInfo, hasMeasurementConsent]);

  return (
    <ClientSideOptionsProvider
      callbacks={{
        onConsentSet({ preferences }) {
          syncPostHogConsent(Boolean(preferences.measurement));
        },
      }}
    >
      {children}
    </ClientSideOptionsProvider>
  );
}
