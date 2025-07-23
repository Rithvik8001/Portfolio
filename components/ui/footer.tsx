import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Dot from "./dot";

const Footer = () => {
  return (
    <footer className="relative mx-auto px-1.5 md:px-6 max-w-[1080px]">
      <div className="relative grid grid-cols-1 lg:grid-cols-3">
        <div className="top-0 left-0 absolute flex justify-between w-full h-full pointer-events-none">
          <Dot className="relative -translate-x-1/2 -translate-y-1/2" />
          <Dot className="relative -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="flex items-center lg:col-span-2 p-4 border-t border-border">
          <p className="font-geist text-muted-foreground text-sm">
            Crafted with love & care ♥️
          </p>
        </div>
        <div className="gap-4 grid grid-cols-3 lg:col-span-1 p-4 border-t border-border">
          <Link
            href="https://www.linkedin.com/in/rithvik-pallamreddy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 px-3 py-2 border border-border rounded-sm text-xs text-center cursor-pointer"
          >
            <Linkedin className="size-3" /> LinkedIn
          </Link>
          <Link
            href="https://x.com/Rithvik_1017"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 px-3 py-2 border border-border rounded-sm text-xs text-center cursor-pointer"
          >
            <Twitter className="size-3" /> X
          </Link>
          <Link
            href="https://github.com/Rithvik8001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 px-3 py-2 border border-border rounded-sm text-xs text-center cursor-pointer"
          >
            <Github className="size-3" /> GitHub
          </Link>
        </div>
        <div className="lg:col-span-6 pt-2 lg:pt-[120px] pb-2 border-t border-border">
          <h2 className="font-heading text-[32px] lg:text-[58px] text-center uppercase">
            Crafting Code, Creating Magic.
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
