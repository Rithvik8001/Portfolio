export const easeOut = [0.16, 1, 0.3, 1] as any;
export const easeInOut = [0.87, 0, 0.13, 1] as any;
export const easeBounce = [0.34, 1.56, 0.64, 1] as any;
export const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";
export const EASE_BOUNCE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export const messageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9, filter: "blur(20px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { stiffness: 30, damping: 17, mass: 8, duration: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(20px)",
    transition: { duration: 0.2 },
  },
};

export const accordionVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { stiffness: 30, damping: 17, mass: 8 },
  },
  exit: { height: 0, opacity: 0 },
};
