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
          start: "03.2024",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Reduced p95 latency on core reporting endpoints by analyzing PostgreSQL query plans, replacing sequential scans with composite and covering indexes matched to filter and sort columns, and pre-aggregating large tables before joins.
- Built and maintained Node.js/Express REST APIs behind six analytics dashboards, using keyset pagination with server-side filtering, sorting and SQL aggregation over PostgreSQL.
- Implemented server-side CSV and Excel exports for large reports using PostgreSQL cursors and Node.js streams, enabling downloads of 100K+ rows without request timeouts or memory spikes.
- Resolved a token-refresh race condition causing unexpected logouts under concurrent 401s by implementing a single-flight refresh in the Axios interceptor, replaying queued requests once with the new token.
- Migrated dashboard data fetching to RTK Query with tag-based cache invalidation, eliminating redundant network requests during view navigation.`,
        skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "RTK Query", "Axios"],
      },
    ],
    isCurrentEmployer: true,
  },
];
