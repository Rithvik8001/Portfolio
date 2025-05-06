import ExperiencesSection from "@/components/about-page/experiences-section";
import Footer from "@/components/shared/footer";

const AboutPage = () => {
  return (
    <main className="px-4">
      <h1 className="font-serif text-[40px] leading-12 font-light text-primary">
        About
      </h1>
      <h2 className="mt-2 text-base font-semibold">
        A journey of building, believing, and becoming.
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        <p>
          Hey, my name is Rithvik and welcome to my space on the internet. I'm a
          self-taught Full Stack Web developer.
        </p>
        <p>
          Learning to code has felt like a superpower for me, it allows me to
          bring any idea I can imagine to life. I love creating and focusing on
          the little things that enhance our experiences as we dive into the
          abyss of the web.
        </p>
        <p>
          When I'm not coding, I love to watch football. You can call me a
          football fanatic. I started watching this beautiful sport when I was
          16 years old, and my favorite club is the biggest in England,
          Manchester United, GGMU❤️.
        </p>
      </div>
      <ExperiencesSection />
      <h2 className="mt-8 text-base font-semibold">Education</h2>
      <div className="mt-6">
        <h3 className="text-sm font-medium">Masters in Computer Science</h3>
        <div className="flex items-center gap-1.5">
          <p>Wichita State University</p>
          <div className="size-1 rounded-full bg-foreground" />
          <p>Aug 2022 - Dec 2023</p>
        </div>
        <p>CGPA: 3.9 / 4.0</p>
      </div>
      <h2 className="mt-8 text-base font-semibold">Beliefs</h2>
      <ul className="text-body list-disc px-4 pt-4 text-sm">
        {" "}
        <li> Seek discomfort</li>{" "}
        <li> Do difficult things as they are the most rewarding</li>{" "}
        <li> Anything is possible with discipline</li>{" "}
      </ul>
      <h2 className="mt-8 text-base font-semibold">Bucket List</h2>
      <ul className="text-body list-disc px-4 pt-4 text-sm">
        {" "}
        <li> Watch Man Utd lift the premier league title</li>{" "}
        <li>
          {" "}
          <span className="animate-gradient marker:animate-gradient bg-gradient-to-r from-primary via-emerald-400 to-emerald-800 bg-clip-text text-transparent">
            Travel the world
          </span>
        </li>{" "}
        <li>
          {" "}
          <span className="animate-gradient marker:animate-gradient bg-gradient-to-r from-primary via-emerald-400 to-emerald-800 bg-clip-text text-transparent">
            Help my parents retire
          </span>
        </li>{" "}
        <li className="text-muted-foreground line-through opacity-75">
          {" "}
          Visit Apple Park in Cupertino, and meet Tim Cook
        </li>{" "}
      </ul>
      <Footer />
    </main>
  );
};

export default AboutPage;
