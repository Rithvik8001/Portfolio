import Image from "next/image";
import { personalStack } from "@/constants/personal-stack";
import Dot from "../ui/dot";

const PersonalStack = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 px-1.5 md:px-6 md:pt-16">
      <h2 className="px-1.5 md:px-3 font-heading text-[30px]">
        Personal <span className="text-primary">Stack</span>
      </h2>
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
          {personalStack.map((stack) => (
            <article
              key={stack.stack}
              className="flex items-center gap-4 bg-background p-6 border border-border rounded-md"
            >
              <Image
                src={stack.icon}
                alt={stack.stack}
                className="bg-white p-1 rounded-sm size-10"
                priority
                loading="eager"
              />
              <p>{stack.stack}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalStack;
