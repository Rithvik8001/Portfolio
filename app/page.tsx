import Link from "next/link";
import { FileUser, Github, Lightbulb, Linkedin, Mail } from "lucide-react";
import ProjectsSection from "@/components/home-page/projects-section";
import Image from "next/image";
import signature from "@/assets/signature.png";
import Footer from "@/components/shared/footer";
import Tags from "@/components/home-page/tags";

const HomePage = () => {
  return (
    <main className="px-4">
      <h1 className="font-serif text-[40px] leading-12 font-light text-primary">
        Rithvik Pallamreddy
      </h1>
      <Tags />
      <p className="mt-4 text-muted-foreground">
        A self taught Full Stack Web Developer following his dream of delivering
        smiles with delightful experiences ☻
      </p>
      <section className="grid w-fit grid-cols-3 gap-x-6 gap-y-2 pt-4 tracking-tight md:flex md:flex-row md:items-start">
        <Link
          target="_blank"
          href="https://drive.google.com/file/d/1-OP-OnCP7Ocjm3THzsFkE0_3mMQrpvSL/view?usp=sharing"
          className="flex items-center gap-1.5 underline-offset-2 transition-colors hover:text-primary hover:underline"
        >
          <FileUser className="size-[14px]" /> <p>resume</p>
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/rithvik-pallamreddy/"
          className="flex items-center gap-1.5 underline-offset-2 transition-colors hover:text-primary hover:underline"
        >
          <Linkedin className="size-[14px]" /> <p>linkedin</p>
        </Link>
        <Link
          target="_blank"
          href="https://github.com/Rithvik8001"
          className="flex items-center gap-1.5 underline-offset-2 transition-colors hover:text-primary hover:underline"
        >
          <Github className="size-[14px]" /> <p>github</p>
        </Link>
        <Link
          target="_blank"
          href="mailto:1017rithvik@gmail.com"
          className="flex items-center gap-1.5 underline-offset-2 transition-colors hover:text-primary hover:underline"
        >
          <Mail className="size-[14px]" /> <p>email</p>
        </Link>
      </section>
      <ProjectsSection />
      <div className="mt-4 w-fit rounded-md border border-muted-foreground/20 bg-primary-foreground px-2 py-1">
        <p className="[font-size:_12px_!important]">
          <span>
            <Lightbulb className="mr-1 mb-1 inline-block size-[12px]" />
          </span>
          Feel free to explore my{" "}
          <Link
            className="[font-size:_12px_!important] text-muted underline underline-offset-2"
            href="https://github.com/Rithvik8001"
            target="_blank"
          >
            GitHub
          </Link>{" "}
          for more projects.
        </p>
      </div>
      <div className="flex w-full items-center justify-center pt-8">
        <Image src={signature} alt="Signature" className="w-64" />
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
