import type { NextConfig } from "next";
import {
  POSTHOG_INGEST_PATH,
  POSTHOG_SCRIPT_ALIAS_PATH,
  POSTHOG_SCRIPT_ALIASES,
  POSTHOG_UPSTREAM_ASSET_HOST,
  POSTHOG_UPSTREAM_HOST,
} from "./lib/posthog-env";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      ...Object.entries(POSTHOG_SCRIPT_ALIASES).map(([file, alias]) => ({
        source: `${POSTHOG_SCRIPT_ALIAS_PATH}/${alias}`,
        destination: `${POSTHOG_UPSTREAM_ASSET_HOST}/static/${file}`,
      })),
      {
        source: `${POSTHOG_INGEST_PATH}/static/:path*`,
        destination: `${POSTHOG_UPSTREAM_ASSET_HOST}/static/:path*`,
      },
      {
        source: `${POSTHOG_INGEST_PATH}/array/:path*`,
        destination: `${POSTHOG_UPSTREAM_ASSET_HOST}/array/:path*`,
      },
      {
        source: `${POSTHOG_INGEST_PATH}/:path*`,
        destination: `${POSTHOG_UPSTREAM_HOST}/:path*`,
      },
    ];
  },
};

export default nextConfig;
