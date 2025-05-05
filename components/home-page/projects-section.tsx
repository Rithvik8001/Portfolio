import { projects } from "@/constants/projects";
import ProjectCard from "./project-card";

const ProjectsSection = () => {
  return (
    <section className="-mx-4 mt-8">
      <h2 className="ml-4 text-base font-semibold">Projects</h2>
      <div className="mt-4 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
