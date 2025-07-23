"use client";

import { motion } from "motion/react";
import {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
} from "react";

type MotionWrapperProps = {
  type?: keyof typeof motion;
  children?: ReactNode;
} & ComponentProps<typeof motion.div>;

const MotionWrapper = forwardRef(
  (
    { type, children, ...props }: MotionWrapperProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const Component: any = type ? motion[type] : motion.div;

    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);

MotionWrapper.displayName = "MotionWrapper";

export default MotionWrapper;
