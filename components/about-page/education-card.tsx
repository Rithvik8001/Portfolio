import Image from "next/image";
import type { Education } from "@/constants/education";

const EducationCard = ({ duration, degree, school, img }: Education) => {
  return (
    <article className="flex flex-col md:items-center gap-4 md:grid grid-cols-2 px-3 md:px-[30px] py-3 md:py-8 border-t border-border">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] text-muted-foreground uppercase">
          {duration}
        </p>
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="bg-secondary rounded-md size-10 aspect-square overflow-hidden">
          <Image
            src={img}
            alt={school}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-sm">{degree}</p>
          <p className="text-muted-foreground text-sm">{school}</p>
        </div>
      </div>
    </article>
  );
};

export default EducationCard;
