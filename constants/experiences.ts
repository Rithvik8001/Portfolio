import type { Experience } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: "tcs-ky",
    companyName: "Tata Consultancy Services",
    companyLogo: "/images/tcs.png",
    positions: [
      {
        id: "tcs-associate-web-dev",
        title: "Associate Web Developer",
        employmentPeriod: {
          start: "07.2024",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Built and maintained REST APIs for reporting/analytics workflows, implementing pagination, filtering, sorting, and aggregation to support dashboard use cases.
- Optimized data access in MongoDB by refining aggregation pipelines (match early, projection trimming, stage ordering) and adding compound indexes aligned to query patterns to reduce slow queries and improve consistency under large datasets.
- Implemented frontend data/state management using Redux Toolkit and RTK Query patterns (cache + invalidation + predictable loading/error handling) to keep UI data consistent and reduce repeated fetching across screens.
- Built an API client layer with Axios interceptors to handle token refresh flow, normalize errors, and prevent repeated failure loops—improving session stability and reducing auth-related UI breakages.`,
        skills: ["Node.js", "Express", "Redux Toolkit", "RTK Query", "MongoDB", "Axios", "REST APIs"],
      },
    ],
    isCurrentEmployer: true,
  },
];
