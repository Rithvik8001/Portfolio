"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/constants/projects";
import { useBlockSlideReveal } from "@/hooks/use-block-slide-reveal";
import { useImgSlideReveal } from "@/hooks/use-img-slide-reveal";
import Badge from "../ui/badge";

const ProjectCard = ({ title, description, liveUrl, img, stack }: Project) => {
  useImgSlideReveal();
  useBlockSlideReveal();

  return (
    <Link
      href={liveUrl}
      target="_blank"
      className="flex flex-col gap-6 cursor-pointer"
    >
      <div className="flex flex-col lg:items-center gap-6 lg:grid grid-cols-3 lg:px-3">
        <div className="flex flex-col gap-6 px-3 lg:px-0">
          <div className="flex flex-col gap-4">
            <h2
              className="font-heading text-[28px] leading-[110%] slide-reveal"
              data-delay={0.5}
            >
              {title}
            </h2>
            <p className="text-muted-foreground slide-reveal" data-delay={0.6}>
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {stack.map((item) => (
              <Badge
                key={item.name}
                style={{ backgroundColor: item.color }}
                className="block-slide-reveal"
                data-delay={0.9}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
        <div
          className="lg:col-span-2 bg-secondary w-full aspect-video img-slide-reveal"
          data-delay={1}
        >
          <Image
            src={img}
            alt={title}
            priority
            loading="eager"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="mt-1.5 bg-border w-full h-[1px]" />
    </Link>
  );
};

export default ProjectCard;
