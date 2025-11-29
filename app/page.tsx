import { GitHubContributions } from "@/components/home-page/github-contributions";
import { AboutSection } from "@/components/home-page/about-section";
import { Overview } from "@/components/home-page/overview/overview";
import { ProfileHeader } from "@/components/home-page/header-cover/profile-header";
import { Skills } from "@/components/home-page/skills";
import { SocialLinks } from "@/components/home-page/social-links/social-links";
import SectionSeparator from "@/components/ui/section-separator";
import { Experiences } from "@/components/home-page/experiences";
import { ProfileCover } from "@/components/home-page/header-cover/profile-cover";
import { Projects } from "@/components/home-page/projects/projects";
import { Brand } from "@/components/home-page/brand";

const HomePage = () => {
  return (
    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
      <ProfileCover />
      <ProfileHeader />
      <SectionSeparator />

      <Overview />
      <SectionSeparator />

      <SocialLinks />
      <SectionSeparator />

      <AboutSection />
      <SectionSeparator />

      <Skills />
      <SectionSeparator />

      <GitHubContributions />
      <SectionSeparator />

      <Experiences />
      <SectionSeparator />

      <Projects />
      <SectionSeparator />

      {/*
        <Certifications />
        <Separator /> 
        */}

      <Brand />
      <SectionSeparator />
    </div>
  );
};

export default HomePage;
