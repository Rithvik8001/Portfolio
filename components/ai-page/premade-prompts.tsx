import type { Dispatch, SetStateAction } from "react";

type PremadePromptsProps = {
  setInput: Dispatch<SetStateAction<string>>;
};

const PremadePrompts = ({ setInput }: PremadePromptsProps) => {
  return (
    <div className="flex justify-between gap-2 pt-4 w-full font-light !text-xs">
      <button
        type="button"
        onClick={() => setInput("What is your design philosophy?")}
        className="bg-secondary px-2.5 py-1.5 border border-border rounded-lg w-full text-foreground text-center md:hover:scale-95 transition duration-300 ease-in-out cursor-pointer"
      >
        What is your design philosophy?
      </button>
      <button
        type="button"
        onClick={() => setInput("Are you available for hire?")}
        className="bg-secondary px-2.5 py-1.5 border border-border rounded-lg w-full text-foreground text-center md:hover:scale-95 transition duration-300 ease-in-out cursor-pointer"
      >
        Are you available for hire?
      </button>
      <button
        type="button"
        onClick={() =>
          setInput(
            "How much time does it take for you to design and code a website or app?"
          )
        }
        className="bg-secondary px-2.5 py-1.5 border border-border rounded-lg w-full text-foreground text-center md:hover:scale-95 transition duration-300 ease-in-out cursor-pointer"
      >
        How much time does it take for you to design and code a website or app?
      </button>
    </div>
  );
};

export default PremadePrompts;
