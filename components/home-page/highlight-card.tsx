import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import MotionWrapper from "../wrappers/motion-wrapper";

gsap.registerPlugin(CustomEase);

CustomEase.create("custom-ease-bounce", "0.34, 1.56, 0.64, 1");

type HighlightCardProps = {
  className?: string;
  cardClassName?: string;
  src: StaticImageData;
  scrollAnimated?: boolean;
};

const HighlightCard = ({
  className,
  cardClassName,
  src,
  scrollAnimated = false,
}: HighlightCardProps) => {
  const constraintRef = useRef<HTMLDivElement>(null);
  const animatedCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animatedCardRef.current || !scrollAnimated) return null;

      const scroller = document.querySelector(".scroller");

      gsap.fromTo(
        animatedCardRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: "custom-ease-bounce",
          scrollTrigger: {
            trigger: animatedCardRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: scroller,
          },
        }
      );
    },
    { dependencies: [scrollAnimated] }
  );

  return (
    <div
      ref={constraintRef}
      className={cn(
        "relative bg-secondary rounded-md w-40 lg:w-[20%] h-56 lg:h-[unset] lg:aspect-[9/12] cursor-grab shrink-0",
        className
      )}
    >
      <MotionWrapper
        ref={animatedCardRef}
        drag
        dragConstraints={constraintRef}
        dragElastic={1}
        dragTransition={{
          bounceStiffness: 200,
          bounceDamping: 15,
        }}
        whileTap={{
          cursor: "grabbing",
          zIndex: 60,
          boxShadow: "0 40px 50px rgba(0, 0, 0, 0.2)",
        }}
        whileHover={{
          rotate: -4,
        }}
        style={{
          boxShadow: "0 40px 0px rgba(0, 0, 0, 0.0)",
        }}
        className={cn(
          "group bg-primary rounded-md w-full h-full overflow-hidden cursor-grab",
          cardClassName
        )}
      >
        <img
          src={src.src}
          alt={src.src}
          className="w-full h-full object-cover pointer-events-none"
        />
      </MotionWrapper>
    </div>
  );
};

export default HighlightCard;
