import Footer from "@/components/shared/footer";

const Colophon = () => {
  return (
    <main className="px-4">
      <h1 className="font-serif text-[40px] leading-12 font-light text-primary">
        Colophon
      </h1>
      <h2 className="text-title mt-2 text-base font-semibold">
        /ˈkɒləfən/ — a brief statement at a book's end detailing its production.
      </h2>
      <p className="mt-4 text-muted-foreground">
        Basically, it's a fancy word that I'm using to describe this website.
        This site is crafted with <span className="text-muted">Next.js</span>{" "}
        and <span className="text-muted">React,</span> hosted on{" "}
        <span className="text-muted">Vercel.</span>
      </p>
      <h2 className="mt-8 font-semibold">Personal Stack</h2>
      <ul className="text-body list-disc px-4 pt-4 text-sm">
        {" "}
        <li>
          {" "}
          <span className="text-black">Comet</span> — Clean, fast, and exactly
          how I like browsing to feel.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Alfred</span> — My daily command center.
          Everything's just a few keystrokes away.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Apple Music</span> — My Favorite music
          app of all time.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Notion</span> — The vault for all my
          ideas and half-finished thoughts.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">VSCode</span> — Where most of my ideas
          start, break, and eventually work.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Warp</span> — My favorite terminal for
          MacOS.
        </li>{" "}
        <p>And many more...</p>{" "}
      </ul>
      <Footer />
    </main>
  );
};

export default Colophon;
