"use client";

import { Smile } from "lucide-react";
import { useSlideReveal } from "@/hooks/use-slide-reveal";
import AboutCards from "./about-cards";

const AboutMe = () => {
  useSlideReveal();

  return (
    <section className="relative flex flex-col gap-8">
      <div className="hidden top-0 right-0 absolute md:grid grid-cols-3 px-3 md:px-[30px] lg:px-10 w-full">
        <div className="items-center gap-2 grid grid-cols-2 col-start-3 pl-6">
          <div className="flex-1 bg-border w-full h-[1px]" />
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            Full-stack <br /> developer ✌️
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center bg-card ml-3 md:ml-[30px] lg:ml-10 rounded-full size-12">
        <Smile className="size-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-[30px] lg:px-10">
        <h1
          className="md:col-span-2 font-heading text-[28px] lg:text-[48px] leading-[110%] slide-reveal"
          data-delay={0.3}
        >
          <span className="text-muted-foreground-secondary">About me.</span>
          <br />I turn <span className="text-primary">ideas</span> into sleek,
          unforgettable digital moments that people actually love to use.
        </h1>
      </div>
      <div className="md:hidden grid grid-cols-2 px-3 md:px-[30px] lg:px-10">
        <div className="items-center gap-2 grid grid-cols-2">
          <div className="flex-1 bg-border w-full h-[1px]" />
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            Full-stack developer ✌️
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-8 md:col-span-2 px-3 md:px-[30px] lg:px-10">
          <p
            className="text-muted-foreground text-lg slide-reveal"
            data-delay={0.7}
          >
            Hey, I'm Rithvik — welcome to my space on the internet! I'm a
            self-taught Full Stack Web Developer who discovered the power of
            coding and hasn't looked back since. For me, coding is more than
            just writing lines — it's a creative superpower that lets me bring
            any idea to life, shaping digital experiences that are not only
            functional but also meaningful and intuitive. I'm passionate about
            digging into the little details that make a big difference — the
            subtle touches that make users feel connected and engaged as they
            navigate the vast and ever-evolving world of the web.
            <br />
            <span className="block h-8" />
            Outside of coding, I'm a dedicated football fanatic. I've been
            watching the beautiful game since I was 16, and my heart beats for
            Manchester United — the biggest club in England. Their resilience,
            teamwork, and legacy inspire me every day, on and off the field.
            GGMU! ❤️
            <br />
            <span className="block h-8" />
            I'm also a huge Apple fan — their innovation, design philosophy, and
            dedication to crafting seamless, human-centered experiences have
            deeply inspired me. It's not just about loving their products, but
            embracing the way Apple approaches technology: with simplicity,
            elegance, and relentless attention to detail. This mindset drives
            how I build software — aiming to create experiences that feel
            natural, intuitive, and thoughtfully crafted, just like the products
            I admire.
            <br />
            <span className="block h-8" />
            This journey of learning, creating, and growing keeps me motivated
            every day. Whether it's solving complex problems, refining user
            experiences, or cheering for a Man U goal, I bring passion and
            dedication to everything I do.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <AboutCards />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
