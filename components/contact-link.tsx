"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Copy } from "@phosphor-icons/react/dist/ssr/index";

//@ts-ignore
import useSound from "use-sound";
import Link from "next/link";

export const ContactCopyItem = ({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) => {
  const [play] = useSound("/sounds/copy.mp3");
  const [copied, setCopied] = React.useState(false);
  const handleCopy = (text: string) => {
    play();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  return (
    <button onClick={() => handleCopy(copy)}>
      {copied ? "Copied!" : title}
    </button>
  );
};

export const ContactItem = ({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("group relative text-gray-11 hover:text-gray-1", className)}
    >
      <Slot>{children}</Slot>
      <div
        className="group-hover:opacity-100 opacity-0 absolute -right-4 bottom-[5px] rounded-sm bg-accent shrink-0 block w-3 h-3 text-[black]"
        aria-hidden={true}
      >
        {icon}
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <Section>
      <div className="flex flex-wrap mt-12 md:flex-col md:gap-y-0 gap-y-2 gap-x-6 md:items-end md:mt-0">
        <ContactItem icon={<Copy />} className="">
          <ContactCopyItem title="Email" copy="rithvik.pallamreddy@gmail.com" />
        </ContactItem>
        <ContactItem icon={<ArrowUpRight />}>
          <Link href="/contact">Contact me</Link>
        </ContactItem>

        <ContactItem icon={<ArrowUpRight />}>
          <a
            href="https://www.linkedin.com/in/rithvik-pallamreddy/"
            target="_blank"
          >
            Linkedin
          </a>
        </ContactItem>
        <ContactItem icon={<ArrowUpRight />}>
          <a href="https://github.com/Rithvik8001" target="_blank">
            GitHub
          </a>
        </ContactItem>
        <ContactItem icon={<Copy />}>
          <ContactCopyItem title="Discord" copy="rithvik1188" />
        </ContactItem>
      </div>
    </Section>
  );
};

export default Contact;
