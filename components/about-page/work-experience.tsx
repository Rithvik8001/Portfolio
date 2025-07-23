import { experiences } from "@/constants/experiences";
import ExperienceCard from "./experience-card";

const WorkExperience = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 px-1.5 md:px-6 md:pt-16">
      <h2 className="px-1.5 md:px-3 font-heading text-[30px]">
        Work <br className="hidden lg:hidden md:block" />{" "}
        <span className="text-primary">Experience</span>
      </h2>
      <div className="col-span-2 mt-8 md:mt-0">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} />
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
