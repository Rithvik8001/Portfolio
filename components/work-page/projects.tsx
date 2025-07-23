"use client";

import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import { projects } from "@/constants/projects";
import { useSlideReveal } from "@/hooks/use-slide-reveal";
import ProjectCard from "../home-page/project-card";
import Button from "../ui/button";

const Projects = () => {
  useSlideReveal();

  return (
    <section className="relative flex flex-col gap-20 mx-auto px-6 py-24 max-w-[1080px]">
      <div>
        <div className="flex flex-col gap-6 md:gap-12 px-3 lg:px-6">
          <div className="flex justify-center items-center bg-card rounded-full size-12">
            <Code className="size-4" />
          </div>
          <div className="lg:grid grid-cols-3">
            <h2
              className="font-heading text-[30px] text-foreground lg:text-[48px] leading-[110%] slide-reveal"
              data-delay={0.3}
            >
              All projects
            </h2>
          </div>
          <div className="mt-8 bg-border w-full h-[1px]" />
        </div>
        <div className="flex flex-col gap-4 mt-4 lg:px-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
          <Link
            href="https://github.com/Rithvik8001"
            target="_blank"
            className="flex justify-center mt-8"
          >
            <Button
              className="mx-auto w-max"
              variant="primary"
              icon={<ArrowRight className="size-2" />}
            >
              See more
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
