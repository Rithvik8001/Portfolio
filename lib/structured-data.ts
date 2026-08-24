import { EXPERIENCES } from "@/constants/experiences";
import { JOBS } from "@/constants/jobs";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { USER } from "@/constants/user";

const EDUCATION_ID = "education";

function educationOrganizations() {
  const education = EXPERIENCES.find((item) => item.id === EDUCATION_ID);

  return (education?.positions ?? []).map((position) => ({
    "@type": "CollegeOrUniversity",
    name: position.title,
  }));
}

export function personSchema() {
  const [job] = JOBS;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${USER.website}/#person`,
    name: USER.fullName,
    givenName: USER.firstName,
    familyName: USER.lastName,
    url: USER.website,
    image: `${USER.website}${USER.avatar}`,
    email: `mailto:${USER.email}`,
    jobTitle: job?.title,
    description: USER.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Louisville",
      addressRegion: "KY",
      addressCountry: "US",
    },
    worksFor: job
      ? { "@type": "Organization", name: job.company, url: job.website }
      : undefined,
    alumniOf: educationOrganizations(),
    knowsAbout: [
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
    ],
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${USER.website}/#website`,
    url: USER.website,
    name: `${USER.fullName} — Portfolio`,
    inLanguage: "en",
    publisher: { "@id": `${USER.website}/#person` },
  };
}
