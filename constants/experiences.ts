export type Experience = {
  company: string;
  duration: string;
  responsibilities: string[];
  role: string;
};

export const experiences: Experience[] = [
  {
    company: "Tata Consultancy Services",
    duration: "July 2024 - Present",
    responsibilities: [
      "Designed and developed modular and scalable RESTful APIs using Node.js and Express, incorporating route-level middleware, input validation using Joi, and centralized error handling for reliability and security. The APIs were integrated into multiple core features on the frontend, enabling smooth data flow, reducing client-side complexity.",
      "Optimized data fetching and state management in ReactJs by utilizing Redux Tool Kit to manage complex app states efficiently. As a result, we reduced page load times by 20% and ensured seamless interaction, improving the overall performance of data-heavy components like search filters and dynamic content rendering.",
      "Worked on MongoDB data modeling and optimization by rewriting query logic, applying compound indexes, and reducing nested document calls. These improvements led to an average 20% decrease in backend response times,significantly boosting the efficiency of client-facing dashboards.",
    ],
    role: "Associate Web Developer",
  },
  {
    company: "Tata Consultancy Services",
    duration: "June 2021 - July 2022",
    responsibilities: [
      "Built and maintained web applications using React.js, focusing on developing interactive components, managing state, and ensuring responsiveness to enhance user experience across all devices.",
      "Optimized page performance by 20% through asset optimization, lazy loading, and code splitting, enhancing user retention and SEO.",
      "Implemented advanced form validation techniques, reducing user errors by 15% and ensuring seamless user interactions.",
      "Collaborated with design and development teams to ensure pixel-perfect UI designs and accessibility compliance across devices.",
    ],
    role: "Junior Frontend Developer",
  },
];
