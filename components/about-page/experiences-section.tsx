"use client";

import { Experience, experiences } from "@/constants/experiences";
import ExperienceCard from "./experience-card";
import { useState } from "react";

const ExperiencesSection = () => {
  const [toggledExperience, setToggledExperience] = useState<Experience | null>(
    null
  );

  return (
    <section className="-mx-4 mt-8">
      <h2 className="ml-4 font-semibold">Experiences</h2>
      <div className="mt-4 flex flex-col gap-4">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            setToggledExperience={setToggledExperience}
            experience={experience}
            isToggled={toggledExperience === experience}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperiencesSection;
