"use client";

import React, { Suspense } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ScribbleLoop,
} from "@phosphor-icons/react/dist/ssr/index";
import { Accordion, AccordionItem } from "@/components/collapsible";
import Contact from "@/components/contact-link";
import { experiences } from "@/content";
import LinkPrimitive from "@/components/link-primitive";
import Section from "@/components/section";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Items = () => {
  return (
    <motion.div {...fadeInUp(0)}>
      <Section>
        <h1 className="font-medium flex items-center gap-x-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          Rithvik Pallamreddy
        </h1>
        <p className="mt-1 text-gray-9">
          Frontend Engineer, Football Aficionado and a bit more
        </p>
        <div className="flex flex-col mt-4 gap-y-2">
          <p>
            Crafting memorable interfaces with a deep attention to detail. I
            dedicate most my time to continuous learning and refining my
            skillset.
          </p>
          <p>
            I'm a creative at{" "}
            <LinkPrimitive href="" external>
              doing what I can't
            </LinkPrimitive>
            .
          </p>
          <div className="flex gap-x-6 mt-2 items-center">
            <LinkPrimitive href="/about" variant="route">
              Learn a bit more
              <ArrowRight size={12} aria-hidden={true} />
            </LinkPrimitive>

            <LinkPrimitive href="/contact" variant="route">
              Contact me
              <ScribbleLoop size={12} aria-hidden={true} />
            </LinkPrimitive>
            <LinkPrimitive
              external
              href="https://drive.google.com/file/d/1VUS1zpJQRRKtLk3kaW7dfehsskowKXbj/view?usp=sharing"
              variant="route"
            >
              Resume
              <ScribbleLoop size={12} aria-hidden={true} />
            </LinkPrimitive>
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <motion.div {...fadeInUp}>
      <Section className="mt-3" heading="Skills">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-wrap gap-x-4 gap-y-6 mt-3"
        >
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
          ].map((skill) => (
            <motion.div
              key={skill}
              variants={fadeInUp(0.1)}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col items-center w-fit">
                <span className="hover:bg-accent hover:text-gray-12 after:content-[''] after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-accent relative inline-flex">
                  {skill}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <motion.div {...fadeInUp(0.2)}>
      <Section heading="Experience">
        <Accordion className="flex flex-col w-[calc(100%+16px)] -mx-2">
          {experiences.map((role) => (
            <React.Fragment key={role.company}>
              <AccordionItem
                role={role.role}
                company={role.company}
                range={role.range}
                description={role.description}
                skills={role.skills}
                link={role.link}
              />
              <div className="h-px bg-gray-12 w-[calc(100%-16px)] mx-auto" />
            </React.Fragment>
          ))}
        </Accordion>
      </Section>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <motion.div {...fadeInUp(0.3)}>
      <Section heading="Projects">
        <motion.ul
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-y-6"
        >
          <motion.li variants={fadeInUp(0.3)}>
            <p>
              <LinkPrimitive
                href="https://www.npmjs.com/package/lume-ui"
                external
              >
                LumeUI
              </LinkPrimitive>{" "}
              is a React component library with 84+ variants across 6 core
              components, accelerating UI development with pre-built,
              customizable solutions.
            </p>
            <p className="text-gray-10 mt-2">
              React.js, Next.js, TypeScript, Tailwind CSS, Radix UI, npm
            </p>
            <div className="flex items-center mt-2 gap-x-4">
              <a
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                href="https://www.npmjs.com/package/lume-ui"
                target="_blank"
                rel="noreferrer"
              >
                Live{" "}
                <span
                  className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                  aria-hidden={true}
                >
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
              <a
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                href="https://github.com/Rithvik8001/LumeUI"
                target="_blank"
                rel="noreferrer"
              >
                Code{" "}
                <span
                  className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                  aria-hidden={true}
                >
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
            </div>
          </motion.li>

          <motion.li variants={fadeInUp(0.3)}>
            <p>
              <LinkPrimitive
                href="https://snippet-vault-beta.vercel.app/"
                external
              >
                SnippetVault
              </LinkPrimitive>{" "}
              is a full-stack snippet management app built with Next.js, allows
              users to securely create, organize, and share code snippets.
            </p>
            <p className="text-gray-10 mt-2">
              Next.js, React.js, Supabase, TypeScript, Shadcn
            </p>
            <div className="flex items-center mt-2 gap-x-4">
              <a
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                href="https://snippet-vault-beta.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Live{" "}
                <span
                  className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                  aria-hidden={true}
                >
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
              <a
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                href="https://github.com/Rithvik8001/SnippetVault"
                target="_blank"
                rel="noreferrer"
              >
                Code{" "}
                <span
                  className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                  aria-hidden={true}
                >
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
            </div>
          </motion.li>

          <motion.li variants={fadeInUp(0.4)}>
            <p>
              <LinkPrimitive href="https://notesey.vercel.app/" external>
                Notesey
              </LinkPrimitive>{" "}
              is a full stack Next.js-powered study platform with an AI QA
              system, smart note-taking editor, and a focus timer.
            </p>
            <p className="text-gray-10 mt-2">
              Next.js, React.js, Firebase, Tailwind CSS, OpenAI, TypeScript
            </p>
            <div className="flex items-center mt-3 gap-x-4">
              <a
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                href="https://notesey.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Live{" "}
                <span className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm">
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
              <a
                href="https://github.com/Rithvik8001/notesey"
                className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm"
                target="_blank"
                rel="noreferrer"
              >
                Code{" "}
                <span
                  className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                  aria-hidden={true}
                >
                  <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
                </span>
              </a>
            </div>
          </motion.li>
        </motion.ul>
      </Section>
    </motion.div>
  );
};

const Currently = () => {
  return (
    <motion.div {...fadeInUp(0.2)}>
      <Section heading="Currently">
        <p>
          Diving deep into{" "}
          <span className="items-center gap-x-0.5 w-fit hover:bg-accent hover:text-gray-12 after:content-[''] after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-accent relative inline-flex bg-accent/20 mt-0.5">
            Next.js
          </span>{" "}
          and exploring the{" "}
          <span className="items-center gap-x-0.5 w-fit hover:bg-accent hover:text-gray-12 after:content-[''] after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-accent relative inline-flex bg-accent/20 mt-0.5">
            world of design.
          </span>
        </p>
      </Section>
    </motion.div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="justify-between md:flex min-h-[100svh] animate-in fade-in duration-500 select"
      >
        <div className="md:max-w-[450px] flex flex-col md:gap-y-0 gap-y-6">
          <Items />
          <Currently />
          <Experience />
          <Projects />
          <Skills />
        </div>
        <Contact />
      </motion.div>
    </>
  );
}
