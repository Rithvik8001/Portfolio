/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <> */
"use client";

import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { easeOut } from "@/constants/animations";
import { cn } from "@/lib/utils";
import MotionWrapper from "../wrappers/motion-wrapper";
import Indicator from "./indicator";

const Nav = () => {
  const pathname = usePathname();
  const [contactToggled, setContactToggled] = useState(false);
  const [mobileRef, { height: mobileHeight }] = useMeasure();
  const [desktopRef, { height: desktopHeight }] = useMeasure();

  useEffect(() => {
    setContactToggled(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {/* Each direct child of AnimatePresence must have a unique key */}
      <MotionWrapper
        key="mobile-nav"
        initial={{ y: "100%", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: easeOut,
          duration: 1,
        }}
        className="md:hidden bottom-0 md:bottom-[unset] left-0 z-90 fixed md:absolute bg-secondary md:bg-transparent p-1.5 w-full md:-translate-y-1/2"
      >
        <nav className="md:top-8 md:left-1/2 z-90 md:fixed flex flex-col md:shadow-lg/5 mx-auto border border-border rounded-sm md:w-min overflow-hidden md:-translate-x-1/2">
          <div className="z-10 relative flex justify-between items-center md:gap-4 bg-background px-8 py-2.5">
            <Link
              href="/"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Home
              <AnimatePresence initial={false}>
                {pathname === "/" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/work"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Work
              <AnimatePresence initial={false}>
                {pathname === "/work" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              About
              <AnimatePresence initial={false}>
                {pathname === "/about" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/ai"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Rithix
              <AnimatePresence initial={false}>
                {pathname === "/ai" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <button
              type="button"
              onClick={() => {
                setContactToggled(!contactToggled);
              }}
              className="relative font-geist font-medium text-[11px] cursor-pointer"
            >
              Contact
              <AnimatePresence initial={false}>
                {contactToggled && <Indicator />}
              </AnimatePresence>
            </button>
            <Link
              href="https://drive.google.com/file/d/1-OP-OnCP7Ocjm3THzsFkE0_3mMQrpvSL/view?pli=1"
              target="_blank"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Resume
            </Link>
          </div>
          <div className="bg-border w-full h-[1px]" />
          <MotionWrapper
            animate={{ height: mobileHeight }}
            transition={{ ease: easeOut, duration: 1 }}
            className="z-0 relative bg-nav-card overflow-hidden"
          >
            <div ref={mobileRef} className="p-2 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {contactToggled ? (
                  <MotionWrapper
                    key="nav-contact"
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: "25%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: "25%",
                    }}
                    transition={{ ease: easeOut, duration: 1 }}
                  >
                    <Link
                      href="https://www.linkedin.com/in/rithvik-pallamreddy/"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="https://github.com/Rithvik8001"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      GitHub
                    </Link>
                    <Link
                      href="https://x.com/Rithvik_1017"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      X / Twitter
                    </Link>
                  </MotionWrapper>
                ) : (
                  <MotionWrapper
                    key="nav-description"
                    type="p"
                    initial={{ opacity: 0, y: "-50%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: "-50%",
                    }}
                    transition={{ stiffness: 30, damping: 17, mass: 8 }}
                    className="block font-geist text-[11px] text-primary text-center"
                  >
                    {pathname === "/"
                      ? "Available for work"
                      : pathname === "/work"
                      ? "A selection of recent projects"
                      : pathname === "/about"
                      ? "Fun fact: I think I am funny ⚡"
                      : pathname === "/ai"
                      ? "Have a chat!"
                      : "Available for work"}
                  </MotionWrapper>
                )}
              </AnimatePresence>
            </div>
          </MotionWrapper>
        </nav>
      </MotionWrapper>
      <div className="left-1/2 absolute w-full" key="desktop-nav">
        <MotionWrapper
          type="nav"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: easeOut, duration: 1, delay: 0.5 }}
          className="hidden top-[2.85rem] z-90 fixed md:flex flex-col bg-background/75 backdrop-blur-lg mx-auto border border-border rounded-sm w-max overflow-hidden -translate-x-1/2"
        >
          <div className="z-10 relative flex justify-between items-center md:gap-5 px-5 py-2.5 overflow-hidden">
            <Link
              href="/"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Home
              <AnimatePresence initial={false}>
                {pathname === "/" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/work"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Work
              <AnimatePresence initial={false}>
                {pathname === "/work" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              About
              <AnimatePresence initial={false}>
                {pathname === "/about" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <Link
              href="/ai"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Rithix
              <AnimatePresence initial={false}>
                {pathname === "/ai" && !contactToggled && <Indicator />}
              </AnimatePresence>
            </Link>
            <button
              type="button"
              onClick={() => {
                setContactToggled(!contactToggled);
              }}
              className="relative font-geist font-medium text-[11px] cursor-pointer"
            >
              Contact
              <AnimatePresence initial={false}>
                {contactToggled && <Indicator />}
              </AnimatePresence>
            </button>
            <Link
              href="https://drive.google.com/file/d/1-OP-OnCP7Ocjm3THzsFkE0_3mMQrpvSL/view?pli=1"
              target="_blank"
              className={cn(
                "relative font-geist font-medium text-[11px] transition-colors",
                contactToggled && "text-muted-foreground"
              )}
              onClick={() => {
                setContactToggled(false);
              }}
            >
              Resume
            </Link>
          </div>
          <div className="bg-border w-full h-[1px]" />
          <MotionWrapper
            animate={{ height: desktopHeight }}
            transition={{ ease: easeOut, duration: 1 }}
            className="z-0 relative bg-nav-card/50 overflow-hidden"
          >
            <div ref={desktopRef} className="p-2 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {contactToggled ? (
                  <MotionWrapper
                    key="nav-contact"
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: "25%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: "25%",
                    }}
                    transition={{ ease: easeOut, duration: 1 }}
                  >
                    <Link
                      href="https://www.linkedin.com/in/rithvik-pallamreddy/"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="https://github.com/Rithvik8001"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      GitHub
                    </Link>
                    <Link
                      href="https://x.com/Rithvik_1017"
                      target="_blank"
                      className="font-geist font-medium text-xs"
                    >
                      X / Twitter
                    </Link>
                  </MotionWrapper>
                ) : (
                  <MotionWrapper
                    key="nav-description"
                    type="p"
                    initial={{ opacity: 0, y: "-50%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: "-50%",
                    }}
                    transition={{ stiffness: 30, damping: 17, mass: 8 }}
                    className="block font-geist text-[11px] text-primary text-center"
                  >
                    {pathname === "/"
                      ? "Available for work"
                      : pathname === "/work"
                      ? "A selection of recent projects"
                      : pathname === "/about"
                      ? "Fun fact: I think I am funny ⚡"
                      : pathname === "/ai"
                      ? "Have a chat!"
                      : "Available for work"}
                  </MotionWrapper>
                )}
              </AnimatePresence>
            </div>
          </MotionWrapper>
        </MotionWrapper>
      </div>
    </AnimatePresence>
  );
};

export default Nav;
