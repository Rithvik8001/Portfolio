import type { Metadata } from "next";
import Footer from "@/components/ui/footer";
import Projects from "@/components/work-page/projects";

export const metadata: Metadata = {
  title: "Featured Projects 📂",
};

const WorkPage = () => {
  return (
    <div className="relative">
      <div className="top-0 left-0 absolute py-1.5 md:py-[60px] w-full h-full">
        <div className="bg-border w-full h-[1px]" />
      </div>
      <div className="top-0 left-1/2 absolute flex justify-between px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2">
        <div className="bg-border w-[1px] h-full" />
        <div className="border-border border-l border-dashed w-[1px] h-full" />
        <div className="md:bg-transparent bg-border md:border-border md:border-l md:border-dashed w-[1px] h-full" />
        <div className="hidden md:block bg-border w-[1px] h-full" />
      </div>
      <Projects />
      <Footer />
    </div>
  );
};

export default WorkPage;
