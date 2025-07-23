import { easeOut } from "@/constants/animations";
import MotionWrapper from "../wrappers/motion-wrapper";

const Indicator = () => {
  return (
    <MotionWrapper
      className="-bottom-1.5 left-1/2 absolute bg-primary rounded-full size-1 -translate-x-1/2"
      initial={{ y: "200%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "200%", opacity: 0 }}
      transition={{ ease: easeOut, duration: 0.5 }}
    />
  );
};

export default Indicator;
