import { Dispatch, SetStateAction } from "react";

type PremadePromptsProps = {
  setInput: Dispatch<SetStateAction<string>>;
};

const PremadePrompts = ({ setInput }: PremadePromptsProps) => {
  return (
    <div className="flex w-full justify-between gap-2 pt-4 !text-xs font-light">
      <button
        onClick={() => setInput("What is your design philosophy?")}
        className="rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900"
      >
        What are your skills?
      </button>
      <button
        onClick={() => setInput("Are you available for hire?")}
        className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900"
      >
        Are you available for hire?
      </button>
      <button
        onClick={() =>
          setInput(
            "How much time does it take for you to design and code a website?"
          )
        }
        className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
      >
        How much time does it take for you to design and code a website?
      </button>
    </div>
  );
};

export default PremadePrompts;
