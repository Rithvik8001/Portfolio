import { Laptop } from "lucide-react";
import Image from "next/image";
import { skills } from "@/constants/skills";
import Dot from "../ui/dot";

const Skills = () => {
  return (
    <section className="relative flex flex-col gap-20 mx-auto px-6 py-20 max-w-[1080px]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-6 md:gap-12 px-3 lg:px-6">
          <div className="flex justify-center items-center bg-card rounded-full size-12">
            <Laptop className="size-4" />
          </div>
          <div className="lg:grid grid-cols-3">
            <h2 className="font-heading text-[30px] text-muted-foreground-secondary lg:text-[48px] leading-[110%]">
              <span className="text-primary">Skills.</span>
            </h2>
          </div>
        </div>
        <div className="relative col-span-2 bg-secondary/70 mt-4 p-4 border border-border rounded-sm">
          <div className="top-4 left-0 absolute bg-border w-full h-[1px]" />
          <div className="bottom-4 left-0 absolute bg-border w-full h-[1px]" />
          <div className="top-0 left-4 absolute bg-border w-[1px] h-full" />
          <div className="top-0 right-4 absolute bg-border w-[1px] h-full" />
          <Dot className="top-4 left-4 z-10 absolute -translate-x-1/2 -translate-y-1/2" />
          <Dot className="top-4 right-4 z-10 absolute -translate-y-1/2 translate-x-1/2" />
          <Dot className="right-4 bottom-4 z-10 absolute translate-x-1/2 translate-y-1/2" />
          <Dot className="bottom-4 left-4 z-10 absolute -translate-x-1/2 translate-y-1/2" />
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 p-4">
            {skills.map((skill) => (
              <article
                key={skill.name}
                className="flex items-center gap-4 bg-background p-6 border border-border rounded-md"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  className="bg-white p-1 rounded-sm size-10"
                  priority
                  loading="eager"
                />
                <p>{skill.name}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
