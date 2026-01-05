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
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "tcs-in",
    companyName: "Tata Consultancy Services",
    companyLogo: "/images/tcs.png",
    positions: [
      {
        id: "tcs-junior-frontend-dev",
        title: "Junior Frontend Developer",
        employmentPeriod: {
          start: "06.2021",
          end: "07.2022",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Built and maintained complex React dashboard pages with reusable component contracts (tables, filters, modals), emphasizing predictable props/state boundaries and maintainable composition patterns.
- Improved perceived performance on data-heavy screens by profiling renders, minimizing unnecessary updates (memoization, stable props/selectors), and optimizing expensive UI computations during filtering/search.
- Refactored legacy components to reduce state complexity and side effects, making behavior more predictable and lowering regression risk during feature changes.
- Integrated analytics APIs into React dashboards with debounced filtering, request cancellation, and consistent loading/error/empty states to keep UI behavior predictable during rapid user interactions.`,
        skills: [
          "React",
          "Performance Optimization",
          "Memoization",
          "API Integration",
          "Component Architecture",
        ],
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "wichita-state-university",
        title: "Wichita State University",
        employmentPeriod: {
          start: "08.2022",
          end: "12.2023",
        },
        icon: "education",
        description: `- Masters in Computer Science
- Specialized in Software Engineering and Algorithms
- Worked as a teaching assistant for web programming
- Completed capstone project on Distributed Systems`,
        cgpa: "3.9 / 4.0",
      },
    ],
  },
];
