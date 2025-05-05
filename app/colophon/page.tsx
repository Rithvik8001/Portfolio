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
          <span className="text-black">Brave</span> — A better way to browse the
          web.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Raycast</span> — Mac's spotlight on
          steroids.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Apple Music</span> — Music for every
          moment.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Notion</span> — My personal note taking
          app.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">VSCode</span> — Developer's best friend.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">Warp</span> — Better terminal for MacOS.
        </li>{" "}
        <li>
          {" "}
          <span className="text-black">XCode</span>
          {` - What options do i
          really have :)`}
        </li>{" "}
        <p>And many more...</p>{" "}
      </ul>
      <Footer />
    </main>
  );
};

export default Colophon;
