import { Project } from "@/constants/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({ title, description, url }: Project) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <article className="group rounded-lg px-4 py-2 transition-all md:hover:scale-[1.05] md:hover:bg-primary-foreground">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium transition-colors md:group-hover:text-primary">
            {title}
          </h2>
          <ArrowUpRight className="size-[14px] text-primary opacity-0 transition-opacity md:group-hover:opacity-100" />
        </div>
        <p>{description}</p>
      </article>
    </Link>
  );
};

export default ProjectCard;
