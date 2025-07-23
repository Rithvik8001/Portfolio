import { beliefs } from "@/constants/beliefs";

const Beliefs = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 px-1.5 md:px-6 md:pt-16">
      <h2 className="px-1.5 md:px-3 font-heading text-[30px]">Beliefs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-2 mt-8 md:mt-0 border-t border-border">
        <div className="flex flex-col gap-2 md:mt-0 px-3 md:px-[30px] py-3 md:py-8">
          <ul className="text-sm list-disc list-inside">
            {beliefs.map((belief) => (
              <li key={belief} className="text-muted-foreground">
                <span className="text-foreground">{belief}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Beliefs;
