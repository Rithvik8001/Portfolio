import type { MetadataRoute } from "next";
import { USER } from "@/constants/user";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: USER.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${USER.website}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${USER.website}/rithix`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
