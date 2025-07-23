import type { Metadata } from "next";
import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import Highlights from "@/components/home-page/highlights";
import Skills from "@/components/home-page/skills";
import Work from "@/components/home-page/work";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Welcome to my space ♥️",
};

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Highlights />
      <div className="relative">
        <div className="top-0 left-0 bg-border w-full h-[1px]" />
        <div className="top-0 left-1/2 absolute flex justify-between px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2">
          <div className="bg-border w-[1px] h-full" />
          <div className="border-border border-l border-dashed w-[1px] h-full" />
          <div className="md:bg-transparent bg-border md:border-border md:border-l md:border-dashed w-[1px] h-full" />
          <div className="hidden md:block bg-border w-[1px] h-full" />
        </div>
        <About />
        <Work />
        <Skills />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
