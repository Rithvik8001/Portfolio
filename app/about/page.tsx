import type { Metadata } from "next";
import AboutMe from "@/components/about-page/about-me";
import Beliefs from "@/components/about-page/beliefs";
import BucketList from "@/components/about-page/bucket-list";
import Education from "@/components/about-page/education";
import PersonalStack from "@/components/about-page/personal-stack";
import WorkExperience from "@/components/about-page/work-experience";
import Dot from "@/components/ui/dot";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "About me 🙂",
};

const AboutPage = () => {
  return (
    <div className="relative">
      <div className="top-0 left-0 absolute py-1.5 md:py-[60px] w-full h-full">
        <div className="bg-border w-full h-[1px]" />
        <div className="flex justify-between items-center mx-auto px-1.5 md:px-6 w-full max-w-[1080px] pointer-events-none">
          <Dot className="z-10 relative -translate-x-1/2 -translate-y-1/2" />
          <Dot className="z-10 relative -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
      <div className="top-0 left-1/2 absolute flex justify-between px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2">
        <div className="bg-border w-[1px] h-full" />
        <div className="border-border border-l border-dashed w-[1px] h-full" />
        <div className="md:bg-transparent bg-border md:border-border md:border-l md:border-dashed w-[1px] h-full" />
        <div className="hidden md:block bg-border w-[1px] h-full" />
      </div>
      <div className="flex flex-col gap-16 md:gap-0 mx-auto pt-36 lg:pt-52 max-w-[1080px]">
        <AboutMe />
        <WorkExperience />
        <Education />
        <PersonalStack />
        <Beliefs />
        <BucketList />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
