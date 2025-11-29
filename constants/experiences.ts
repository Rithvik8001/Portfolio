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
        description: `- Developed Restful API endpoints for user analytics dashboard using Node.js and Express, implementing pagination, filtering, and data aggregation logic that enabled real-time reporting and improved data retrieval performance.
- Contributed to state management migration by implementing Redux Toolkit slices for critical features, optimizing data fetching with RTK Query, and reducing unnecessary re-renders by 15% in dashboard components.
- Optimized MongoDB performance by writing aggregation pipelines for complex reporting queries and implementing compound indexes, reducing query execution time from 1.2s to 300ms for analytics endpoints.
- Developed API integration layer with axios interceptors handling token refresh, request retries, and error recovery, improving reliability and user experience across frontend applications.`,
        skills: ["Node.js", "Express", "Redux Toolkit", "MongoDB", "REST APIs"],
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
        description: `- Developed responsive React components using hooks and functional patterns, building reusable dashboard widgets and form components that improved development velocity by 30%.
- Optimized React application performance by identifying and refactoring expensive rendering operations, implementing code splitting for route-based lazy loading, and reducing initial bundle size by 35%.
- Built robust form validation system with real-time error handling and custom validation rules, improving data quality for critical user registration and data entry workflows.
- Developed reusable UI component library including buttons, modals, and form inputs that were standardized across multiple projects, ensuring consistent user experience and faster feature development.`,
        skills: [
          "React",
          "Hooks",
          "Performance Optimization",
          "Form Validation",
          "UI Components",
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
