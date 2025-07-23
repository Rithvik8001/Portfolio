import { education } from "@/constants/education";
import EducationCard from "./education-card";

const Education = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 px-1.5 md:px-6 md:pt-16">
      <h2 className="px-1.5 md:px-3 font-heading text-[30px]">Education</h2>
      <div className="col-span-2 mt-8 md:mt-0">
        {education.map((education) => (
          <EducationCard key={education.id} {...education} />
        ))}
      </div>
    </section>
  );
};

export default Education;
