import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import { projects } from "@/constants/projects";
import Button from "../ui/button";
import ProjectCard from "./project-card";

const Work = () => {
  return (
    <section className="relative flex flex-col gap-20 mx-auto px-6 py-24 max-w-[1080px]">
      <div>
        <div className="flex flex-col gap-6 md:gap-12 px-3 lg:px-6">
          <div className="flex justify-center items-center bg-card rounded-full size-12">
            <Code className="size-4" />
          </div>
          <div className="lg:grid grid-cols-3">
            <h2 className="font-heading text-[30px] text-muted-foreground-secondary lg:text-[48px] leading-[110%]">
              <span className="text-primary">Work.</span> <br /> A selection of
              recent projects
            </h2>
          </div>
          <div className="mt-8 bg-border w-full h-[1px]" />
        </div>
        <div className="flex flex-col gap-4 mt-4 lg:px-4">
          {projects
            .filter((project) => project.isFeatured)
            .map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      </div>
      <Link href="/work" className="flex justify-center">
        <Button
          className="mx-auto w-max"
          variant="primary"
          icon={<ArrowRight className="size-2" />}
        >
          View all
        </Button>
      </Link>
    </section>
  );
};

export default Work;
