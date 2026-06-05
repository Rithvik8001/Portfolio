import type { MetadataRoute } from "next";
import { USER } from "@/constants/user";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${USER.website}/sitemap.xml`,
  };
}
