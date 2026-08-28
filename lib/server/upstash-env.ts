import "server-only";

import { z } from "zod";

const upstashRedisEnvSchema = z.object({
  url: z.url(),
  token: z.string().min(1),
});

export type UpstashRedisEnv = z.infer<typeof upstashRedisEnvSchema>;

export function getUpstashRedisEnv(): UpstashRedisEnv | null {
  const parsed = upstashRedisEnvSchema.safeParse({
    url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL,
    token:
      process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN,
  });

  return parsed.success ? parsed.data : null;
}
