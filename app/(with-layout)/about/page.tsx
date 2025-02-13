import Photo from "@/components/photo";
import { beliefs, Status } from "@/content";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { Metadata } from "next/types";
import Section from "@/components/section";
import Gallery from "@/components/gallery";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "https://mitul.ca/about",
  },
};

const bucketItem = cva(["self-start"], {
  variants: {
    status: {
      none: "",
      completed: ["line-through", "text-gray-11"],
      progress: [
        "before:content-['']",
        "before:w-1",
        "before:h-1",
        "before:bg-accent",
        "before:inline-flex",
        "before:-mt-px",
        "before:rounded-full",
        "before:animate-pulse",
        "before:mr-1",
        "flex",
        "items-center",
      ],
    },
  },
});

const BucketItem = ({
  item,
  status,
}: {
  item: string;
  status: keyof typeof Status;
}) => {
  return <li className={bucketItem({ status: Status[status] })}>{item}</li>;
};

const About = () => {
  return (
    <div className="justify-between md:flex animate-in fade-in duration-500 min-h-[calc(100vh-6rem)] ">
      <div className="md:max-w-[450px] flex flex-col md:gap-y-0 gap-y-6">
        <Link
          href="/"
          className="flex gap-x-1 bg-accent text-gray-12 w-fit rounded-sm pl-0.5 pr-1 py-0.5 leading-none items-center hover:bg-accent/50 transition duration-100 mx-1 md:mx-4"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="my-1 md:my-4 lg:hidden">
          <Gallery
            photos={[
              {
                src: "/images/me.jpg",
                alt: "Photo of myself standing",
              },
              {
                src: "/images/manU.png",
                alt: "My favorite football club, Manchester United",
              },
            ]}
          />
        </div>
        <Section heading="Hi there, this is Rithvik">
          <div className="space-y-4">
            <p>
              A self taught web developer following his dream of delivering
              smiles with delightful experiences ☻
            </p>
            <p>
              Learning to code has felt like a superpower for me, it allows me
              to bring any idea I can imagine to life. I love creating and
              focusing on the little things that enhance our experiences as we
              dive into the abyss of the web.
            </p>
            <p>
              When I'm not coding, I love to watch football ⚽️. You could call
              me a football fanatic. I started watching this beautiful sport
              when I was 16 years old, and my favorite club is the biggest in
              England, Manchester United, GGMU❤️.
            </p>
            <p>
              My goal is to leverage my skills and knowledge to create impactful
              web applications that solve real-world problems. I am excited
              about opportunities in frontend development and look forward to
              collaborating with like-minded professionals to build innovative
              solutions.
            </p>
          </div>
        </Section>

        <Section heading="Education">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Masters in Computer Science</h3>
              <p className="text-gray-11">Wichita State University</p>
              <div className="flex justify-between text-sm text-gray-10">
                <span>Aug 2022 - Dec 2023</span>
                <span>CGPA: 3.9 / 4.0</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium">B.Tech Computer Science</h3>
              <p className="text-gray-11">Sastra Deemed to be University</p>
              <div className="flex justify-between text-sm text-gray-10">
                <span>June 2017 - May 2021</span>
                <span>CGPA: 7.0</span>
              </div>
            </div>
          </div>
        </Section>

        <Section heading="Beliefs">
          <ul className="flex flex-col gap-y-1">
            {beliefs.map((belief) => {
              return <li key={belief}>{belief}</li>;
            })}
          </ul>
        </Section>

        <Section heading="Bucket List">
          <ul className="flex flex-col gap-y-1">
            {[
              {
                item: "Watch Man Utd lift the premier league live",
                status: "",
              },
              { item: "Travel the world", status: "progress" },
              { item: "Help my parents retire", status: "progress" },
              {
                item: "Visit Apple Park in Cupertino, and meet Tim Cook",
                status: "completed",
              },
            ].map((item) => (
              <BucketItem
                key={item.item}
                item={item.item}
                status={item.status as keyof typeof Status}
              />
            ))}
          </ul>
        </Section>
      </div>
      <div className="hidden px-1 my-4 mt-10 lg:flex gap-x-2 md:px-4">
        <Photo
          src={"/images/me.jpg"}
          alt="A photo of myself standing"
          priority
        />
        <Photo
          src={"/images/manU.png"}
          alt="My favorite football club, Manchester United"
          priority
        />
      </div>
    </div>
  );
};

export default About;
