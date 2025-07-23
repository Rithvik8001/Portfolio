"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

CustomEase.create("custom-ease-out", "0.16, 1, 0.3, 1");

export const useImgSlideReveal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted) return;

      const els = document.querySelectorAll(
        ".img-slide-reveal"
      ) as NodeListOf<HTMLElement>;

      els.forEach((el) => {
        el.style.visibility = "visible";

        gsap.set(el, { y: "50%", autoAlpha: 0 });

        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;

        gsap.to(el, {
          y: "0%",
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: "custom-ease-out",
          delay: delay || 0,
        });
      });
    },
    { dependencies: [isMounted, pathname] }
  );
};
