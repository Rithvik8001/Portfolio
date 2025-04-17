/* 
- Tata Consultancy Services
Role: Associate App Developer
Duration: July 2024 - Present
Responsibilities: • Developed and shipped feature-rich iOS applications using Swift and SwiftUI, following MVVM architecture to improve
code maintainability.
• Optimized app performance by reducing unnecessary SwiftUI view re-renders, implementing lazy loading, and refining
state management, leading to a 20% decrease in load times and a noticeably smoother user experience.
• Implemented Core Data to efficiently manage local storage, enabling offline access to critical app features, reducing data
loss risks, and ensuring seamless data persistence across sessions, enhancing user retention and engagement.
• Designed and developed reusable SwiftUI components and interactive animations, improving UI consistency, reducing
development time for new features, and significantly boosting user engagement with a more polished in-app experience.

- Tata Consultancy Services
Role: Junior Frontend Developer
Duration: June 2021 - July 2022
Responsibilities: • Built and maintained web applications using React.js, focusing on developing interactive components, managing state,
and ensuring responsiveness to enhance user experience across all devices.
• Optimized page performance by 20% through asset optimization, lazy loading, and code splitting, enhancing user
retention and SEO.
• Implemented advanced form validation techniques, reducing user errors by 15% and ensuring seamless user interactions.
• Collaborated with design and development teams to ensure pixel-perfect UI designs and accessibility compliance across
devices.

- Elorce
Role: Frontend Intern
Duration: Jan 2021 - April 2021
Responsibilities: • Developed interactive React components such as custom modals, tooltips, and user input validations, improving usability
and providing a smoother, more engaging experience for users.
• Optimized React components for performance, including reducing unnecessary re-renders and improving page load times
by refactoring large, monolithic components into smaller, reusable ones.
• Developed and maintained interactive dashboards by integrating data visualization libraries i.e D3.js, providing users
with insightful visual feedback and improving decision-making through clear, real-time data representation.
*/

export type Experience = {
    company: string;
    duration: string;
    responsibilities: string[];
    role: string;
}

export const experiences: Experience[] = [
    /*{
        company: "Tata Consultancy Services",
        duration: "July 2024 - Present",
        responsibilities: [
            "Developed and shipped feature-rich iOS applications using Swift and SwiftUI, following MVVM architecture to improve code maintainability.",
            "Optimized app performance by reducing unnecessary SwiftUI view re-renders, implementing lazy loading, and refining state management, leading to a 20% decrease in load times and a noticeably smoother user experience.",
            "Implemented Core Data to efficiently manage local storage, enabling offline access to critical app features, reducing data loss risks, and ensuring seamless data persistence across sessions, enhancing user retention and engagement.",
            "Designed and developed reusable SwiftUI components and interactive animations, improving UI consistency, reducing development time for new features, and significantly boosting user engagement with a more polished in-app experience.",
        ],
        role: "Associate App Developer",
    }, */
    {
        company: "Tata Consultancy Services",
        duration:   "June 2021 - July 2022",
        responsibilities: [
            "Contributed to the development of key React.js components and features, including dynamic dashboards and interactive forms, which improved user engagement metrics and received positive client feedback.",
            "Optimized application performance by 20% through implementing lazy loading, code splitting, and asset management, resulting in faster load times, better SEO rankings, and increased user retention.",
            "Designed and implemented advanced form validation techniques that reduced user errors by 15%, leading to smoother data entry processes and fewer support tickets.",
            "Developed reusable UI components like buttons, modals, and form elements that were adopted across various projects. This approach cut down development time for new features by 30%, enhanced design consistency and user experience,and sped up onboarding for new team members.",
        ],
        role: "Junior Frontend Developer",
    },
    /*
    {
        company: "Elorce",
        duration: "Jan 2021 - April 2021",
        responsibilities: [
            "Developed interactive React components such as custom modals, tooltips, and user input validations, improving usability and providing a smoother, more engaging experience for users.",
            "Optimized React components for performance, including reducing unnecessary re-renders and improving page load times by refactoring large, monolithic components into smaller, reusable ones.",
            "Developed and maintained interactive dashboards by integrating data visualization libraries i.e D3.js, providing users with insightful visual feedback and improving decision-making through clear, real-time data representation.",
        ],
        role: "Frontend Intern",
    } */
    
]
