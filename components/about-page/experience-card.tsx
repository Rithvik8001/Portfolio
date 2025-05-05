"use client";

import { Experience } from "@/constants/experiences";
import { ChevronDown } from "lucide-react";
import MotionWrapper from "../shared/motion-wrapper";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence } from "motion/react";
import { accordionVariants } from "@/constants/animations";

type ExperienceCardProps = {
  setToggledExperience: Dispatch<SetStateAction<Experience | null>>;
  isToggled: boolean;
  experience: Experience;
};

const ExperienceCard = ({
  experience,
  setToggledExperience,
  isToggled,
}: ExperienceCardProps) => {
  return (
    <article
      onClick={() => setToggledExperience(isToggled ? null : experience)}
      className="group cursor-pointer rounded-lg px-4 py-2 transition-all md:hover:scale-[1.05] md:hover:bg-primary-foreground"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium transition-colors md:group-hover:text-primary">
          {experience.company}
        </h2>
        <MotionWrapper animate={{ rotate: isToggled ? 180 : 0 }}>
          <ChevronDown className="size-[14px] text-primary opacity-0 transition-opacity md:group-hover:opacity-100" />
        </MotionWrapper>
      </div>
      <div className="flex items-center gap-1.5">
        <p>{experience.role}</p>
        <div className="size-1 rounded-full bg-foreground" />
        <p>{experience.duration}</p>
      </div>
      <AnimatePresence>
        {isToggled && (
          <MotionWrapper
            variants={accordionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ul className="text-body list-disc px-4 pt-4 text-sm">
              {" "}
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {responsibility}
                </li>
              ))}{" "}
            </ul>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ExperienceCard;
